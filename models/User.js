const { Schema, model } = require('mongoose');

// creating the user schema
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (v) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
                },
                message: "invalid email, please try again"
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// creating a virtual atribute that counts the number of friends the user has
userSchema.virtual('friendConut').get(function () {
    return this.friends.length;
})

// initializing the user model
const User = model('User', userSchema);

// exporting the user model
module.exports = User;