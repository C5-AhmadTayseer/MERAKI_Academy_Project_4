const userModel = require("../models/usersShema");
const { param } = require("../routes/registerRouter");

// const follow = (req, res) => {
//   const _id = req.params.id;

//   //   const followId = req.token.userId;
//   console.log("====");
//   console.log(_id);

//   //   console.log(followId);
//   userModel
//     .updateOne(
//       { _id },
//       {
//         $push: { following: "627953ff328ea38308dfebf5" },
//       },
//       { new: true }
//     )
//     .then((result) => {
//       res.json({ success: result });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({ err: err });
//     });

//   // if (addToFollower) {
//   //   const addToFollowing = await userModel.findOneAndUpdate(
//   //     { _id: followId },
//   //     {
//   //       $push: { following: params },
//   //     },
//   //     { new: true }
//   //   );
//   // res.json({ success: true });
//   // }

//   //   console.log(addToFollowing , "=====");
//   //     console.log(addToFollower, "====");
//   //   } catch (err) {
//   //     res.json({ err: err });
//   //   }
// };

//how to handle not added the same user again ? , maybe can handle it in FE ? ..
const follow = async (req, res) => {
  const params = req.params.id;

  const signInUser = req.token.userId;

  try {
    const addToFollower = await userModel.updateOne(
      { _id: params },
      {
        $push: { followers: signInUser },
      },
      { new: true }
    );

    if (addToFollower) {
      const addToFollowing = await userModel.updateOne(
        { _id: signInUser },
        {
          $push: { following: params },
        },
        { new: true }
      );
      console.log(addToFollower, "Add To Follower");
      console.log(addToFollowing, "Add To Following");

      return res.status(201).json({
        success: true,
        message: "Added successfully",
        
      });
    }
  } catch (err) {
    res.status(500).json({
      messge: "Server Error",
      err: err.message,
    });
  }
};


//the unfollow will be the same with pull operator instead of push ....

const unFollow = async (req, res) => {
  const params = req.params.id;

  const signInUser = req.token.userId;

  try {
    console.log(params);
    const removeFromFollower = await userModel.updateMany(
      { _id: params },
      {
        $pull: { followers: signInUser },
      },
      { new: true }
    );

    if (removeFromFollower) {
      console.log(params);
      const removeFromFollowing = await userModel.updateMany(
        { _id: signInUser },
        {
          $pull: { following: params },
        },
        { new: true }
      );
      console.log(removeFromFollower, " removed from Follower");
      console.log(removeFromFollowing, "removed from Following");

      return res.status(201).json({
        success: true,
        message: "Removed successfully",
        process:`Id=>${signInUser} unfollow=>${params}`
      });
    }
  } catch (err) {
    res.status(500).json({
      messge: "Server Error",
      err: err.message,
    });
  }
};
/* response even when deleted and make a request again (can handle by check modifiedCount), ({
  acknowledged: true,
  modifiedCount: 0,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}  removed from Follower

{
  acknowledged: true,
  modifiedCount: 0,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
} removed from Following
)
/*
const follow = async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const findUser = await userModel.find({ _id: userId });

  const isFollwing =
    findUser[0].followers && findUser[0].followers.includes(userId);
  console.log(isFollwing);
  const option = isFollwing ? "$pull" : "$addToSet";

  req.token.userId = await userModel
    .findByIdAndUpdate(
      req.token.userId,
      {
        [option]: { following: userId },
      },
      { new: true }
    )
    .catch((err) => {
      console.log(err);
    });

  res.json(req.token.userId);
};



*/

module.exports = {
  follow,
  unFollow,
};
