const tweetModel = require("../models/tweetsSchema");
const userModel = require("../models/usersShema");

const createNewTweet = async (req, res) => {
  const { tweetBody, comments } = req.body;

  const userId = req.token.userId;

  const newTweet = new tweetModel({ userId, tweetBody, comments });
  try {
    let result = await newTweet.save();
    result = await result.populate("userId");
    // for test .
    //  const test = await result.populate("userId" , "userName")
    // console.log(test);
    res.status(201).json({
      success: true,
      message: "Tweet Created",
      tweet: result,
    });
  } catch (err) {
    // if there's error.
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err,
    });
  }
};
//Note : ======================================
//make another function to get tweets for specific user , i think will be useful to use it to show it in user profile when clicked , maybe will populate userId to get followers , followings , likes << later will added re-tweet
//======================================

const getAllTweets = async (req, res) => {
  const signInUserId = req.token.userId;
  try {
    // populated userId to can use the informations like images , username when show all tweets ,
    const result = await tweetModel
      .find({})
      .populate(
        "userId",
        "userName profileImage"
        // {
        //   path:"userId",
        //   select:"userName proffileImage"
        // }
      )
      .populate({
        path: "comments",
        populate: {
          path: "commenter",
          select: "userName profileImage",
        },
      });

    if (result) {
      // To Solve addToBookMark after reloading the page ....
      try {
        const loggedInUser = await userModel
          .findById(signInUserId)
          .select("-password");
        res.status(201).json({
          tweets: result,
          signInUserId: signInUserId,
          newResult: loggedInUser,
        });
      } catch (err) {
        res.json({
          message: "EROR IN FINDALLTWEETS",
          err: err,
        });
      }
    }

    // will populate likes when make it .
  } catch (err) {
    res.status(500).json(err);
  }
};

//ById
//that will be use to show a single tweet when click ., i think i will populate commentes later to show informations .<< resulut :
/* << need to populate it .
{
    "_id": "62797352e16987a80a871f0a",
    "userId": "627953ff328ea38308dfebf5",
    "comments": [],
    "tweetBody": "Hello",
    "__v": 0
}
*/
const getTweetById = async (req, res) => {
  const signInUserId = req.token.userId;

  const id = req.params.id;
  /*
  path: "userId",
        select: "userName profileImage coverImage following followers",
        populate: [
          {
            path: "following",
            model: "User",
            select: "userName profileImage",
          },
          {
            path: "followers",
            model: "User",
            select: "userName profileImage",
          },
        ],
*/

  try {
    const result = await tweetModel
      .findById(id)
      .populate("userId", "userName profileImage")
      .populate({
        path: "likes",
        model: "User",
        select: "userName profileImage",
      })
      .populate({
        path: "reTweet",
        model: "User",
        select: "userName profileImage",
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

    if (result) {
      // To Solve addToBookMark after reloading the page ....
      try {
        const loggedInUser = await userModel
          .findById(signInUserId)
          .select("-password");

        res.status(201).json({
          success: true,
          message: `The tweet with id ${id}`,
          tweet: result,
          newResult: loggedInUser,
        });
      } catch (err) {
        res.json({
          message: "EROR IN FINDALLTWEETS",
          err: err,
        });
      }
    }
    /*
              res.status(200).json({
        success: true,
        message: `The tweet with id ${id}`,
        tweet: result,
      });
            */
  } catch (err) {
    if (err.kind === "ObjectId") {
      res.status(404).json({
        success: false,
        message: "tweet not found",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    }
  }
};

// used return inside if , to solve (Can't set headers after they are sent to the client)
const updateTweet = async (req, res) => {
  let id = req.params.id;
  const { tweetBody } = req.body;

  try {
    const result = await tweetModel
      .findByIdAndUpdate(
        id,

        { tweetBody },
        { new: true }
      )
      .populate("userId", "userName profileImage")
      .populate({
        path: "likes",
        model: "User",
        select: "userName profileImage",
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
      .populate({
        path: "reTweet",
        model: "User",
        select: "userName profileImage",
      });

    res.status(201).json({
      success: true,
      message: "Tweet Updated",
      tweet: result,
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: "The tweet is not found",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    }

    res.json(err);
  }
};

const deleteTweetById = async (req, res) => {
  id = req.params.id;
  try {
    const result = await tweetModel.findByIdAndDelete(id);
    if (result) {
      // console.log(result);
      return res.status(201).json({
        success: true,
        message: "Tweet Deleted",
        tweet: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: `the tweet with ${id} is not found `,
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

//will handle resulut to deal with , when clicked on user should get all the info to show it

const getAllTweetByUser = async (req, res) => {
  let id = req.params.id;
  const signInUserId = req.token.userId;
  // modify for FE , need to get logged in userId
  try {
    // const result = await tweetModel
    //   .find({ userId: id })
    //   .populate("userId", "-password");
    const result = await tweetModel
      .find({ userId: id })
      .populate({
        path: "userId",
        select:
          "userName profileImage coverImage following followers Bio dateOfBirthDay joinedAt ",
        populate: [
          {
            path: "following",
            model: "User",
            select: "userName profileImage",
          },
          {
            path: "followers",
            model: "User",
            select: "userName profileImage",
          },
        ],
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
    // got followers , following (userName and profileImage)
    //need to get comments and commenter .(Done , just need to add followers to the user to check it)
    //Done .
    // Modify to use Same Component in FE
    if (result) {
      // To Solve addToBookMark after reloading the page ....
      try {
        const loggedInUser = await userModel
          .findById(signInUserId)
          .select("-password");
        res.status(201).json({
          tweets: result,
          signInUserId: signInUserId,
          newResult: loggedInUser,
        });
      } catch (err) {
        res.json({
          message: "EROR IN FINDALL TWEETS FOR USER",
          err: err,
        });
      }
    }
  } catch (err) {
    // console.log(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: true,
        message: `There's no tweets yet By ${id} `,
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
      err: err.message,
    });
  }
};

//export
module.exports = {
  createNewTweet,
  getAllTweets,
  getTweetById,
  updateTweet,
  deleteTweetById,
  getAllTweetByUser,
};
