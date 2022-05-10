const usersModel = require("../models/usersShema");

const register = async (req, res) => {
  const {
    userName,
    password,
    email,
    proffileImage,
    coverImage,
    following,
    followers,
    bookMark,
  } = req.body;
  const newUser = new usersModel({
    userName,
    password,
    email,
    proffileImage,
    coverImage,
    following,
    followers,
    bookMark,
  });
  try {
    const response = await newUser.save();
    res.status(201).json({
      success: true,
      message: "Accout Created",
      userInfo: response,
    });
  } catch (err) {
    console.log(err);

    if (err.code === 11000) {
      res.status(409).json({
        success: false,
        message: "email already exist",
      });
    } else {
      res.status(500).json({    
        message: "Server Error",
        err: err.message,
      });
    }
  }
};

module.exports = register;
