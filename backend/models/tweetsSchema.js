const mongoos = require("mongoose");

const tweets = new mongoos.Schema({
  userName: { type: mongoos.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoos.Schema.Types.ObjectId, ref: "Comment" }],
  //   date : date() << will check it when create comment
});

module.exports = mongoos.model("tweet", tweets);
