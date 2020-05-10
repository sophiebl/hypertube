const passport = require("passport");
const dotenv = require("dotenv");

const userModel = require("../../models/user");
const Comment = require("../../models/comment");

const createComment = (userId, movieId, comment) => {
  Comment.findOne({ where: { movie: movieId } }).then((obj) => {
      Comment.create({
        author: userId,
        content: comment,
        movie: movieId,
      });

  });
};


const getComments = async (req, res) => {
    const idIMDB = req.params.id;
    console.log('comments')

    try {
        const comments = await Comment.find({ where: idIMDB });
        console.log(' |||||| comments ||||| ');
        console.log(comments);
        res.status(200).json({ comments });
    } catch(err) { console.log(err) }
};

module.exports = (app) => {
    app.get(
      "/:id/comments",
      passport.authenticate("jwt", { session: false }),
      getComments,
      createComment
    );  
  };