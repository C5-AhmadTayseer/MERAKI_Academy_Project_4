const mongoos = require("mongoose");

const tweets = new mongoos.Schema({
  userId: { type: mongoos.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoos.Schema.Types.ObjectId, ref: "Comment" }],
  tweetBody: {type:String , required: true}
  //   date : date() << will check it when create comment
});

module.exports = mongoos.model("tweet", tweets);
