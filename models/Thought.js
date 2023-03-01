const { Schema, model, Types } = require('mongoose');

//Reaction (Schema only)

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        max_length: 280,
    },

    username: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
},
{
    toJSON: {
        virtual: true,
        getters: true,
    },
    id: false,
});


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
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
        getters: true,
    },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

