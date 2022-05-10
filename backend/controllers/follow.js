const userModel = require("../models/usersShema");

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

module.exports = follow;
