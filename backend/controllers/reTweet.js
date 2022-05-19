const userModel = require("../models/usersShema");

const tweetModel = require("../models/tweetsSchema");

const addToRetweet = async (req, res) => {
  const params = req.params.id; // tweet id .

  const signInUser = req.token.userId;

  try {
    const addRetweetToTweet = await tweetModel
      .findByIdAndUpdate(
        { _id: params },
        {
          $push: { reTweet: signInUser },
        },
        { new: true }
      )
      .populate("userId", "userName profileImage")
      .populate({
        path: "likes",
        model: "User",
        select: "userName profileImage",
      }).populate({
        path:"reTweet",
        model:"User",
        select:"userName profileImage"
      })
      .populate({
        path: "comments",
        populate: [
          {
            path: "commenter",
            model: "User",
            select: "userName profileImage",
          },
        ],
      })
    ////

    // res.json(addLikeToTweet)
    if (addRetweetToTweet) {
      const addReTweetToUser = await userModel.findByIdAndUpdate(
        { _id: signInUser },
        {
          $push: { reTweetByUser: addRetweetToTweet._id },
        },
        { new: true }
      );

      return res.status(201).json({
        success: true,
        message: "Added successfully",
        addRetweetToTweet: addRetweetToTweet,
        addReTweetToUser: addReTweetToUser,
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

const deleteFromRetweet = async (req, res) => {
    const params = req.params.id; // tweet id .
  
    const signInUser = req.token.userId;
  
    try {
      const deleteReTweetFromTweet = await tweetModel
        .findByIdAndUpdate(
          { _id: params },
          {
            $pull: { reTweet: signInUser },
          },
          { new: true }
        )
        .populate("userId", "userName profileImage")
        .populate({
          path: "likes",
          model: "User",
          select: "userName profileImage",
        }).populate({
            path:"reTweet",
            model:"User",
            select:"userName profileImage"
          })
        .populate({
          path: "comments",
          populate: [
            {
              path: "commenter",
              model: "User",
              select: "userName profileImage",
            },
          ],
        });
      // res.json(addLikeToTweet)
      if (deleteReTweetFromTweet) {
        const deleteReTweetFromUser = await userModel.findByIdAndUpdate(
          { _id: signInUser },
          {
            $pull: { reTweetByUser: deleteReTweetFromTweet._id },
          },
          { new: true }
        );
        return res.status(201).json({
          success: true,
          message: "Deleted successfully",
          deleteReTweetFromTweet: deleteReTweetFromTweet,
          deleteReTweetFromUser: deleteReTweetFromUser,
        });
      }
    } catch (err) {
      res.status(500).json({
        messge: "Server Error",
        err: err.message,
      });
    }
  };

  const getAllRetweetTweet = async (req, res) => {
    const signInUser = req.token.userId;
    const params = req.params.id;
  
    try {
      let result = await userModel.findById(params).populate({
        path: "reTweetByUser",
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
            path: "reTweet",
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
        ReTweetTweet: result.reTweetByUser,
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
  






module.exports = { addToRetweet , deleteFromRetweet ,getAllRetweetTweet };
