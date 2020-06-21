const passport = require("passport");
const { sequelize } = require("../../models/index");
const Comment = sequelize.import("../../models/comment");
const User = sequelize.import("../../models/user");

// const getAuthorComments = async (req, res) => {
//   try {
//     // const users = await User.findAll({ include: Comment });
//     const users = await User.findAll({
//       // include: { model: Comment, as: 'author' }
//       // include: 'id'
//        include: { association: 'id' } 
//     });
//     // User.findAll({ include: 'Instruments' }); // Also works
// // User.findAll({ include: { association: 'Instruments' } }); // Also works
//     console.log(JSON.stringify(users, null, 2));
//   } catch(err) {console.log('errr===================================',err)}
// }

const getComments = async (req, res) => {
    const idIMDB = req.params.id;
    // const author = getAuthorComments();
    // console.log('author:::::::::::::::')
    // console.log(author)
    try {
        const comments = await Comment.findAll(
          { where: {movie: idIMDB} }, 
          { include: [{model: User, where: {state: sequelize.col('comment.author')}}] }
        );
        console.log(JSON.stringify(comments, null, 3));
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