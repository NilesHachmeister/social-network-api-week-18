const { Schema, Types } = require('mongoose');
const formatTime = require('./../utils/helper')

// creating the reaction subdocument
const reactionSchema = new Schema(
    {
        reactionId: {
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
            get: formatTime
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// alowing the getter to work as intended
reactionSchema.set('toObject', { getters: true })
reactionSchema.set('toJSON', { getters: true })

// exporting the reaction schema to be used as a subcomucment in thoughts
module.exports = reactionSchema;