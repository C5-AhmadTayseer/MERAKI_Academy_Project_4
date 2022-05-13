const tweetModel = require("../models/tweetsSchema");

const commentModel = require("../models/commentsSchema");

///need to get the commenter info , not only his id ....

const createNewComment = async (req, res) => {
  let id = req.params.id;

  const { comment } = req.body;
  const commenter = req.token.userId;

  try {
    const newComment = new commentModel({
      comment,
      commenter,
    });
    let response = await newComment.save();
    console.log(response, "111");
    response = await response.populate("commenter", "userName proffileImage");
    console.log(response, "Response");

    ////
    const result = await tweetModel.findOneAndUpdate(
      { _id: id },
      {
        $push: { comments: response },
      },
      { new: true }
    ).populate("userId", "userName profileImage")
    .populate({
      path: "comments",
      populate: [
        {
          path: "commenter",
          select: "userName profileImage",
        },
      ],
    });
    
    console.log(result, "Result");
    res.json(result);
  } catch (err) {
    console.log(err);
  }
};

module.exports = createNewComment;
