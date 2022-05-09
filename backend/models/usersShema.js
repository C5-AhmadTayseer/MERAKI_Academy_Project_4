const mongoos = require("mongoose");

const users = new mongoos.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  proffileImage: { type: String },
  coverImage: { type: String },
  following: [{ type: mongoos.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoos.Schema.Types.ObjectId, ref: "User" }],
  bookMark: [{type:mongoos.Schema.Types.ObjectId , ref:"User"}]
});

module.exports = mongoos.model("User",users)
