const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction.js');
const moment = require('moment')

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
            default: moment().format('dddd'),
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

thoughtSchema
    .virtual('createdAt')
    // Getter
    .get(function () {
        return `createdAt: ${this.createdAt}`;
    });

// initializing the thought model
const Thought = model('Thought', thoughtSchema);

// exporting the thought model
module.exports = Thought;