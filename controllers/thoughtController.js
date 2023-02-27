const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThought(req, res) {
        Thought.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

   // Get single thoughts
   getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
    .select('-__v')
    .then((thought) =>
    !thought
    ? res.status(404).json({ message: 'No thoughts find with this ID'})
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
   },

   // create thought
  createThought(req, res) {
    Thought.create(req.body)
.then(({ _id }) => {
    return User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: _id }},
        {new: true}
    );
})
    .then((thought) => res.json(thought))
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
   },

// Update thought
updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId},
        { $set: req.body },
        { runValidators: true, new: true}
    )
    .then((user) => 
    !user
    ? res.status(404).json({ message: 'No user with this id!'})
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},

//delete thought
deleteThought(req, res) {
Thought.findOneAndDelete({ _id: req.params.thoughtId })
.then((thought) =>
!thought
? res.status(404).json({ message: 'No thought with this id!'})
: res.json(thought))
.catch((err) => res.status(500).json(err));
},

//create reaction 
createReaction(req,res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        {$set: { reactions: req.body } },
        { runValidators: true, new: true}
    )
    .then((thought) =>
    !thought
    ? res.status(404).json({ message: 'No thought with this id' })
    : res.json(thought))
.catch((err) => res.status(500).json(err));
},

//delete reaction 
deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId }}},
        { runValidators: true, new: true}
    )
    .then((thought) =>
    !thought
    ? res.status(404).json({ message: 'No thought with this id!'})
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
};