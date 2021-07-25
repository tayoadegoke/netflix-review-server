import mongoose from 'mongoose'; 

const commentsSchema = mongoose.Schema({
    message: String,
    userId: String,
    postId: Number,
    likeCount: {
        type: Number,
        default: 0,
    },
    createdAt: {
      type: Date,
      default: new Date()
    }
})

const Comments = mongoose.model('Comments',commentsSchema)

export default Comments;