import Comments from "../models/comments.js";
import User from "../models/user.js";

export const getComments = (req, res) => {
  let final = [];
  Comments.find({ postId: req.params.postId })
    .then((resp) => {
      const loopThrough = async () => {
        for (let re of resp) {
          await User.findById(re.userId).then((respo) => {
            re = { ...re.toObject(), user: respo.username };
            final.push(re);
          });
        }
      };
      loopThrough().then(() => {
        res.send(final.reverse());
      });
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
};

export const createComment = (req, res) => {
  Comments.create({
    message: req.body.message,
    userId: req.body.userId,
    postId: req.body.postId,
  })
    .then((resp) => {
      console.log(resp);
      res.send(resp);
    })
    .catch((err) => {
      console.log(err);
      res.send(err.message);
    });
};
