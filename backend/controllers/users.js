const usersModel = require("../models/usersShema");

const getUserById = async (req, res) => {
  id = req.params.id;

  try {
    const result = await usersModel.findById(id);
    // console.log(result); want to remove password from result

    res.status(200).json({
      success: true,
      message: `The user with ${id}`,
      user: result,
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: `The user is not found`,
      });
    }
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  id = req.params.id;
  try {
    const result = await usersModel.findByIdAndDelete(id);
    if (result) {
      // console.log(result);
      return res.status(201).json({
        success: true,
        message: "User Deleted",
        tweet: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `There's No User with id:${id}`,
      });
    }
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

const updateUserInfo = async (req, res) => {
  let id = req.params.id;
  //  ========
  const { profileImage, coverImage } = req.body;

  try {
    const result = await usersModel.findByIdAndUpdate(
      id,
      {
        profileImage,
        coverImage,
      },
      { new: true }
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

//export
module.exports = {
  getUserById,
  deleteUser,
  updateUserInfo,
};
