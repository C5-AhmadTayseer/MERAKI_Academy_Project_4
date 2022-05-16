const userModel = require("../models/usersShema");

const tweetModel = require("../models/tweetsSchema");

const addToLike = async (req, res) => {
  const params = req.params.id; // tweet id .

  const signInUser = req.token.userId;

  try {
    const addLikeToTweet = await tweetModel.findByIdAndUpdate(
      { _id: params },
      {
        $push: { likes: signInUser },
      },
      { new: true }
    );
    ////

    // res.json(addLikeToTweet)
    if (addLikeToTweet) {
      const addTweetToUserLikes = await userModel.findByIdAndUpdate(
        { _id: signInUser },
        {
          $push: { likesTweet: addLikeToTweet._id },
        },
        { new: true }
      );

      return res.status(201).json({
        success: true,
        message: "Added successfully",
        addLikeToTweet: addLikeToTweet,
        addTweetToUserLikes: addTweetToUserLikes,
      });
    }
  } catch (err) {
    res.status(500).json({
      messge: "Server Error",
      err: err.message,
    });
  }
};

//Delete ,

const deleteFromLike = async (req, res) => {
  const params = req.params.id; // tweet id .

  const signInUser = req.token.userId;

  try {
    const deleteLikeFromTweet = await tweetModel.findByIdAndUpdate(
      { _id: params },
      {
        $pull: { likes: signInUser },
      },
      { new: true }
    );
    // res.json(addLikeToTweet)
    if (deleteLikeFromTweet) {
      const deleteTweetFromUserLikes = await userModel.findByIdAndUpdate(
        { _id: signInUser },
        {
          $pull: { likesTweet: deleteLikeFromTweet._id },
        },
        { new: true }
      );
      return res.status(201).json({
        success: true,
        message: "Deleted successfully",
        deleteLikeFromTweet: deleteLikeFromTweet,
        deleteTweetFromUserLikes: deleteTweetFromUserLikes,
      });
    }
  } catch (err) {
    res.status(500).json({
      messge: "Server Error",
      err: err.message,
    });
  }
};

//to get allTweets in bookMark for the sign in user

const getAllLikedTweet = async (req, res) => {
  const signInUser = req.token.userId;
  const params = req.params.id;

  try {
    let result = await userModel.findById(params).populate({
      path: "likesTweet",
      populate: [
        {
          path: "userId",
          model: "User",
          select: "userName profileImage",
        },
        {
          path: "comments",
          model: "Comment",
          populate: {
            path: "commenter",
            model: "User",
            select: "userName profileImage",
          },
        },
        {
          path: "likes",
          model: "User",
          select: "userName profileImage",
        },
      ],
      // populate: { path: "commenter", model: "User" },
    });

    //the nested populate must be all inside {} ,
    //done , now i should determine the info i needed from the result . will use select to get the specific info ..

    //(Tweet , tweet publisher with his userName and profile image)
    //(comments > commenter > userName and profile image  )

    // result.populate

    res.status(201).json({
      success: true,
      likedTweets: result.likesTweet,
      signInUserId: signInUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

module.exports = { addToLike, deleteFromLike, getAllLikedTweet };
