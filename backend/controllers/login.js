const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/usersShema");

//generate token ,
const generateToken = (userId, expiresIn) => {
  const payload = {
    userId: userId,
  };

  const options = {
    expiresIn: expiresIn,
  };
  return jwt.sign(payload, process.env.SECRET, options);
};

//(will check it again if i need to populate info from the result to send it with token .)

const login = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  try {
    result = await userModel.findOne({ email });

    if (result) {
      const passCompare = await bcrypt.compare(password, result.password);

      if (passCompare) {
        //   5m just for check will change it
        const token = await generateToken(result._id, "5m");

        return res.json({
          success: true,
          message: "Valid login credentials",
          token: token,
        });
      } else {
        res.status(403).json({
          success: false,
          message: "The password you've entered is incorrect",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "email does not exist ",
      });
    }
  } catch (err) {
    // to catch any error that occurred
    res.status(500).json({
        message:"Server Error",
        err: err
    });
  }
};

module.exports = login;
