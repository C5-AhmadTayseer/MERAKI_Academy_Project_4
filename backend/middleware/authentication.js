const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  if (req.headers.authorization) {
    const TOKEN = req.headers.authorization.split(" ").pop();

    try {
      const result = await jwt.verify(TOKEN, process.env.SECRET);
      req.token = result;
      console.log(result);

      next();
    } catch (err) {
      res.status(403).json({
        success: false,
        message: "The token is invalid or expired",
      });
    }
  } else {
    res.status(404).json({
      success: false,
      message: "Forbidden",
    });
  }
};

//export
module.exports = authentication;
