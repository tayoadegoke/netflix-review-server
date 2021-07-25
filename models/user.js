import mongoose from 'mongoose'; 

const usersSchema = mongoose.Schema({
    username: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    id:{type:String},
    createdAt: {
      type: Date,
      default: new Date()
    }
})

const User = mongoose.model('User',usersSchema)

export default User;