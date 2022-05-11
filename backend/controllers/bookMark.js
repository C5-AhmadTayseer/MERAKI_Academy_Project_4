const userModel = require("../models/usersShema");

const tweetModel = require("../models/tweetsSchema");
const { populate } = require("../models/usersShema");

//should use populate to get user info to show it .<<<<<<
const addToBookMark = async (req, res) => {
  const signInUser = req.token.userId;
  let params = req.params.id;

  try {
    // to get the tweet id on params
    const response = await tweetModel.findById(params);

    console.log(response);
    if (response) {
      const result = await userModel.updateOne(
        { _id: signInUser },
        {
          $push: { bookMark: response },
        },
        { new: true }
      );
      console.log("Added To BookMark", response);
      return res.status(201).json({
        success: true,
        message: "Added To Book Mark",
        addedTweet: response,
      });
    }
  } catch (err) {
    console.log(err, "BookMark");
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

const removeFromBookMark = async (req, res) => {
  const signInUser = req.token.userId;

  const params = req.params.id;

  try {
    const result = await userModel.updateMany(
      { _id: signInUser },
      {
        $pull: { bookMark: params },
      },
      { new: true }
    );
    console.log(result, "delete BookMark");

    res.status(200).json({
      success: true,
      message: "tweet deleted from Bookmark",
    });
  } catch (err) {
    console.log(err, "deleteBookMark Err");
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

//to get allTweets in bookMark for the sign in user

const getAllBookMarkTweets = async (req, res) => {
  const signInUser = req.token.userId;

  try {
    let result = await userModel.findById(signInUser).populate({
      path: "bookMark",
      populate: [
        {
          path: "userId",
          model: "User",
          select: "userName coverImage",
        },
        {
          path: "comments",
          model: "Comment",
          populate: {
            path: "commenter",
            model: "User",
            select: "userName coverImage",
          },
        },
      ],
      // populate: { path: "commenter", model: "User" },
    });

    //the nested populate must be all inside {} ,
    //done , now i should determine the info i needed from the result . will use select to get the specific info ..

    //(Tweet , tweet publisher with his userName and profile image)
    //(comments > commenter > userName and profile image  )

    // result.populate

    res.status(201).json(result.bookMark);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

module.exports = {
  addToBookMark,
  removeFromBookMark,
  getAllBookMarkTweets,
};

//will delete it
// let result = await userModel
//   .find({ _id: signInUser })
//   .populate({
//     path: "bookMark",
//     populate: {
//       path: "userId",
//       model: "User",
//     },
//   })
//   .then((result) => {
//     console.log("result", result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// let userId = [];
// result.bookMark.forEach((element) => {
//   // console.log(element.userId);
// const userPopulate = userModel.findOne({_id: element.userId});

//   userId.push(userPopulate);
// });
// // res.json(userId);
// console.log(userId);