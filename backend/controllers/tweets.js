const tweetModel = require("../models/tweetsSchema");

const createNewTweet = async (req, res) => {
  const { tweetBody, comments } = req.body;

  const userId = req.token.userId;

  const newTweet = new tweetModel({ userId, tweetBody, comments });
  try {
    const result = await newTweet.save();
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
  try {
    // populated userId to can use the informations like images , username when show all tweets ,
    const result = await tweetModel
      .find({})
      .populate("userId", "-password -email");
    res.json(result);
  } catch (err) {
    res.json(err);
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
  const id = req.params.id;

  try {
    const result = await tweetModel.findById(id);

    if (result) {
      res.status(200).json({
        success: true,
        message: `The tweet with id ${id}`,
        tweet: result,
      });
    }
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
    const result = await tweetModel.findByIdAndUpdate(
      id,

      { tweetBody },
      { new: true }
    );

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

const getAllTweetByUser = async (req, res) => {
  let id = req.params.id;

  try {
    const result = await tweetModel
      .find({ userId: id })
      .populate("userId", "-password");
    // maybe will exclude email
    res.status(201).json({
      success: true,
      message: `All tweets By ${id} `,
      tweets: result,
    });
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
