import express from 'express';
//import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import commentsRoutes from './routes/comments.js'
import userRoutes from './routes/users.js'

const app = express();
app.use(express.json());
app.use(cors());

app.use('/comments',commentsRoutes)
app.use('/users',userRoutes)

const CONNECTION_URL = 'mongodb+srv://omotayo:OpPgepfZhD4lSR42@cluster0.8j43x.mongodb.net/netflix-review?retryWrites=true&w=majority'

const PORT = process.env.PORT || 5000 ;

mongoose.connect(CONNECTION_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true,

}).then(()=>{
  app.listen(PORT, ()=> console.log(`app running on port ${PORT}`));
}).catch((err)=>{
   console.log('error' + '' + err.message)
})

mongoose.set('useFindAndModify', false);
