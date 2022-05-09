const mongoos = require("mongoose");

const comments = new mongoos.Schema({
  commenter: { type: mongoos.Schema.Types.ObjectId, ref: "User" },
  comment: { type: String },
});

module.exports = mongoos.model("Comment", comments);
