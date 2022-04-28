const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction.js');
const formatTime = require('./../utils/helper')

// creating the thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatTime

        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// creating a virtual to count the number of reactions each though gets
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

// initializing the thought model
const Thought = model('Thought', thoughtSchema);

// alowing the getter to work as intended
thoughtSchema.set('toObject', { getters: true })
thoughtSchema.set('toJSON', { getters: true })

// exporting the thought model
module.exports = Thought;