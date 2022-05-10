const usersModel = require("../models/usersShema");

const getUserById = async (req, res) => {
  id = req.params.id;

  try {
    const result = await usersModel.findById(id);
    // console.log(result); want to remove password from result

    res.status(200).json({
      success: true,
      message: `The user with ${id}`,
      user: result,
    });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        message: `The user is not found`,
      });
    }
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  }
};

//export

module.exports = getUserById;
