const usersModel = require("../models/usersShema");


const getAllUsers = async (req , res) => { 
try{
  const response = await usersModel.find({}).select("-password")

  res.status(201).json({
    success:true,
    allUsers:response
  })
} catch(err) {
  console.log(err);
  res.status(500).json({
    err:err
  })
}

}


const getUserById = async (req, res) => {
  signInUserId = req.token.userId
  id = req.params.id;

 //Edit For FE , will modify result using populate and sending info about signin user using token . 
  try {
    const result = await usersModel.findById(id)
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
  const { profileImage, coverImage , dateOfBirthDay , Bio , userName } = req.body;

  try {
    const result = await usersModel.findByIdAndUpdate(
      id,
      {
        profileImage,
        coverImage,
        dateOfBirthDay,
        Bio,
        userName
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
  getAllUsers
};
