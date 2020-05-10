const passport = require("passport");
const dotenv = require("dotenv");

const userModel = require("../models/user");
const Comment = require("../models/comment");

const getComments = async (req, res) => {
    const idIMDB = req.params.id;

    try {
        const comments = await Comment.find({ where: idIMDB });
        console.log(' |||||| comments ||||| ');
        console.log(comments);
        res.status(200).json({ comments });
    } catch(err) { console.log(err) }
};

module.exports = {
    getComments,
};
