const mongoos = require("mongoose");

const comments = new mongoos.Schema({
  commenter: { type: mongoos.Schema.Types.ObjectId, ref: "User" },
  comment: { type: String },
  Date: {type:String , default:Date()}
});

module.exports = mongoos.model("Comment", comments);
