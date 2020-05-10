const passport = require("passport");
const { sequelize } = require("../../models/index");
const Comment = sequelize.import("../../models/comment");

const getComments = async (req, res) => {
    const idIMDB = req.params.id;
    try {
        const comments = await Comment.findAll({ where: {movie: idIMDB} });
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