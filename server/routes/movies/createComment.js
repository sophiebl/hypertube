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

module.exports = (app) => {
    app.post(
      "/:id/comments",
      passport.authenticate("jwt", { session: false }),
      createComment
    );  
  };