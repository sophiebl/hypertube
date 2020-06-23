const passport = require("passport");
const { sequelize } = require("../../models/index");
const Comment = sequelize.import("../../models/comment");
const User = sequelize.import("../../models/user");

const getComments = async (req, res) => {
    const idIMDB = req.params.id;
    try {
        const comments = await Comment.findAll(
          { where: {movie: idIMDB} }, 
          { include: [{model: User, where: {state: sequelize.col('comment.author')}}] }
        );
        res.status(200).json(comments);
    } catch(err) { console.log(err) }
};

module.exports = (app) => {
    app.get(
      "/:id/comments",
      passport.authenticate("jwt", { session: false }),
      getComments
    );  
  };