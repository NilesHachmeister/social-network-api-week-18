const { Reaction, User, Thought } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        console.log("here");
        User.find({})
            .then((allUsers) => res.json(allUsers))
            .catch((err) =>
                console.log(err))
        // res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .then((user) => !user
                ? res.status(404).json({ message: 'There was no user with that id, please try again.' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    postNewUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'There was no user with that id, please try again.' })
                    : res.json(user)
            )
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'There was no user with that id, please try again.' })
                    : res.json(user)
            )
            .catch((err) => {
                res.status(500).json(err);
            },
            )
    },
};



