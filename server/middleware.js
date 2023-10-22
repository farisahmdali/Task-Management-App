const jwt = require("jsonwebtoken");
const model = require("./model/model");

module.exports = {
  verifyJwt: async (req, res, next) => {
    try {
      let user = jwt.verify(req.headers.authorization, process.env.SECRET);
      req._id = user._id;
      next();
    } catch (err) {
      res.send(403);
    }
  },
  verfiyAdmin: async (req, res, next) => {
    try {
      let user = jwt.verify(req.headers.authorization, process.env.SECRET);
      let valid = await model.getUserAdminbyid(user._id);
      if (valid) {
        next();
      } else {
        res.sendStatus(403);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(403);
    }
  },
};
