const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAt => moment(createdAt).format("MMM DD, YYYY [at] hh:mm a"),
    },

    username: {
        type: String,
        required: true,
    },

    reactions: [reactionSchema],
},

{
    toJSON: {
        getters: true,
    },
    id: false,
});

thoughSchema.virtual('reactionCount').get(function (){
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;

//Reaction (Schema only)

const reactionSchema = new Schema({
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
        get: createdAt => moment(createdAt).format("MMM DD, YYYY [at] hh:mm a"),
    },
},
{
    toJSON: {
        virtual: true,
        getters: true,
    },
    id: false,
});
