const mongoos = require("mongoose");
const bcrypt = require("bcrypt");
const defaultCover =
  "https://images2.alphacoders.com/515/thumb-1920-515958.jpg";

const defaultProfile =
  "https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg";

const users = new mongoos.Schema({
  userName: { type: String, required: true },
  dateOfBirthDay: { type: Date },
  Bio: { type: String },
  joinedAt: { type: String, default: Date() },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profileImage: { type: String, default: defaultProfile },
  coverImage: { type: String, default: defaultCover },
  following: [{ type: mongoos.Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: mongoos.Schema.Types.ObjectId, ref: "User" }],
  bookMark: [{ type: mongoos.Schema.Types.ObjectId, ref: "tweet" }],
  likesTweet: [{ type: mongoos.Schema.Types.ObjectId, ref: "tweet" }],
  reTweetByUser: [{ type: mongoos.Schema.Types.ObjectId, ref: "tweet" }],
});

users.pre("save", async function () {
  this.email = this.email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoos.model("User", users);
