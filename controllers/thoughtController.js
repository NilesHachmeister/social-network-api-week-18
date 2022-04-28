const { User, Thought, Reaction } = require('../models');

// exporting all of the functions
module.exports = {

    // this gets all of the thoughts and returns them to the user
    getAllThoughts(req, res) {
        Thought.find({})
            .then((allThoughts) => res.json(allThoughts))
            .catch((err) =>
                res.status(500).json(err)
            );
    },

    // this gets a single thought and returns it to the user
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate('reactions')
            .then((thought) => !thought
                ? res.status(404).json({ message: 'There was no thought with that id, please try again.' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // this allows the user to post a new thought
    postNewThought(req, res) {
        Thought.create(req.body).then((thought) =>
            User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            )
        )

            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // this updates a thought based on what is in the body of the request
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'There was no thought with that id, please try again.' })
                    : res.json(thought)
            )
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // this deletes a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'There was no thought with that id, please try again.' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            ).then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'There was no thought with that id, please try again.' })
                    : res.json(thought)
            )
            .catch((err) => {
                res.status(500).json(err);
            },
            )
    },

    // this creates a new reaction as a subconstruct of thought
    createNewReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'There was no thought with that id, please try again.' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // this removes a reaction from a thought
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.body.reactionId } } },
            { new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404)
                        .json({ message: 'There was no thought with that id, please try again.' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },


};