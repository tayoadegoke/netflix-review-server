import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import commentsRoutes from "./routes/comments.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/comments", commentsRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8j43x.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => console.log(`app running on port ${PORT}`));
  })
  .catch((err) => {
    console.log("error" + "" + err.message);
  });

mongoose.set("useFindAndModify", false);
