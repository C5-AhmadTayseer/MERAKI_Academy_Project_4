const mongoos = require("mongoose");

const tweets = new mongoos.Schema({
  userId: { type: mongoos.Schema.Types.ObjectId, ref: "User" },

  tweetBody: { type: String, required: true },

  comments: [{ type: mongoos.Schema.Types.ObjectId, ref: "Comment" }],

  likes:[{type:mongoos.Schema.Types.ObjectId , ref:"User"}],
  reTweet:[{type:mongoos.Schema.Types.ObjectId , ref:"User"}]
  //   date : date() << will check it when create comment
});

module.exports = mongoos.model("tweet", tweets);
