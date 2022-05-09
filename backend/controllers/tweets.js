const tweetModel = require("../models/tweetsSchema");

const createNewTweet = async (req, res) => {
  const { tweetBody, comments } = req.body;

const userId = req.token.userId

  const newTweet = new tweetModel({ userId, tweetBody, comments });
  try {
    const result = await newTweet.save();

    // for test .
    //  const test = await result.populate("userId" , "userName")
    // console.log(test);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

//export
module.exports = {
  createNewTweet,
};
