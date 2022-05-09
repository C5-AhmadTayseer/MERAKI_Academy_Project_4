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
    const result = await tweetModel.find({}).populate("userId" , "-password -email");
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

//export
module.exports = {
  createNewTweet,
  getAllTweets
};
