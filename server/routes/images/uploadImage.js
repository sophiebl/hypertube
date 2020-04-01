const passport = require("passport");
const { sequelize } = require("../../models/index");
const _ = require("lodash");
const User = sequelize.import("../../models/user");
const multiparty = require("multiparty");
const fs = require("fs");
const fileType = require("file-type");
const s3 = require("./../../config/awsConfig");

const deleteFile = url => {
  const name = url.match(/[^\/]+\/[^\/]+\/[^\/]+$/)[0];
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: name
  };
  return s3.deleteObject(params).promise();
};

const uploadImage = async (req, res) => {
const id = req.user.id;
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const { path } = files.file[0];
      const buffer = fs.readFileSync(path);
      const type = await fileType.fromBuffer(buffer);
      const timestamp = Date.now().toString();
      const fileName = `${process.env.ENVIRONMENT}/${id}/${timestamp}`;
      const data = await uploadFile(buffer, fileName, type);

      if (data) {
        const user = await User.findByPk(id);
        const oldPicture = user.picture
        deleteFile(oldPicture);
      }
      
      User.update({picture: data.Location}, {
        where: { id }
      }).then(updatedRows =>
        res.status(200).send({ success: true, Location: data.Location, message: "Image uploaded!" })
      );
    } catch (error) {
      console.log(error);
      // if (process.env.VERBOSE === "true") console.log(error);
      return res.status(400).send(error);
    }
  });
};

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`
  };
  return s3.upload(params).promise();
};

module.exports = app => {
  app.post(
    "/upload",
    passport.authenticate("jwt", { session: false }),
    uploadImage
  );
};
