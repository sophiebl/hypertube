const passport = require("passport");
const { sequelize } = require("../../models/index");
const Comment = sequelize.import("../../models/comment");


const createComment = async (req, res) => {
  
    const movieId = req.params.id;
    const userId = req.user.id;
    const comment = req.body.comment;
    try {
      Comment.create({
        author: userId,
        content: comment,
        movie: movieId,
      });
      res.send({
        created: true,
        message: "Your comment as been saved"
      })
    } catch(err) {
      res.send({
        created: false, 
        message: "Sorry the comment can't be saved",
      })
    }
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
    app.post(
      "/:id/comments",
      passport.authenticate("jwt", { session: false }),
      createComment
    );  
  };