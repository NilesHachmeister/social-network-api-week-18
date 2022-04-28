const { User } = require('../models');

// exporting all of the functions
module.exports = {

    // this gets all of the users and returns it as json
    getAllUsers(req, res) {
        User.find({})
            .then((allUsers) => res.json(allUsers))
            .catch((err) =>
                res.status(500).json(err));
    },

    // this gets a single user by the id and returns it as json
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .then((user) => !user
                ? res.status(404).json({ message: 'There was no user with that id, please try again.' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // this creates a new user
    postNewUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },

    // this updates a user by id
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

    // this deletes a user by id
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

    // this adds a new friend to a user
    addNewFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'No user with that id, please try again' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));

    },

    // this removes a friend from a user
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
            .then((friend) =>
                !friend
                    ? res
                        .status(404)
                        .json({ message: 'No user with that id, please try again' })
                    : res.json(friend)
            )
            .catch((err) => res.status(500).json(err));
    },
};