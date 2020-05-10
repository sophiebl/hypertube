const checkJwtFormat = (jwt) => {
  let segments = jwt.split(".");
  return segments.length === 3;
};

const tokenErrorMessage = (res) => {
  res.send({
    resetAccepted: false,
    message:
      "We were unable to find a user for this token. Please sign up again 🙏",
  });
};

module.exports.checkJwtFormat = checkJwtFormat;
module.exports.tokenErrorMessage = tokenErrorMessage;
