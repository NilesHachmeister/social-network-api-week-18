const { Schema, Types } = require('mongoose');

// creating the reaction subdocument
const reactionSchema = new Schema(
    {
        reationId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // getter method?
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// exporting the reaction schema to be used as a subcomucment in thoughts
module.exports = reactionSchema;