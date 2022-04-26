const { Reaction, User, Thought } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then((allThoughts) => res.json(allThoughts))
            .catch((err) =>
                res.status(500).json(err));
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) => !thought
                ? res.status(404).json({ message: 'There was no thought with that id, please try again.' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
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

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'There was no thought with that id, please try again.' })
                    : res.json(thought)
            )
            .catch((err) => {
                res.status(500).json(err);
            },
            )
    },

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


    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.body.reactionId  } } },
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
};