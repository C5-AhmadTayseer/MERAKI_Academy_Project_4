const userModel = require("../models/usersShema");

const tweetModel = require("../models/tweetsSchema");

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

module.exports = {
  addToBookMark,
  removeFromBookMark,
};
