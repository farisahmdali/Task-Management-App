const model = require("../model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: async (req, res) => {
    try {
      const valid = await model.userExist(req.body.username);
      if (valid) {
        req.body.password = await bcrypt.hash(req.body.password, 2);
        model.signup(req.body);
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      console.log(err);
    }
  },

  login: async (req, res) => {
    try {
      const user = await model.getUser(req.query.username);
      if (user) {
        const valid = await bcrypt.compare(req.query.password, user.password);
        if (valid) {
          console.log(process.env.SECRET);
          const token = await jwt.sign(
            { _id: user._id + "" },
            process.env.SECRET + ""
          );
          res.send(token);
        } else {
          res.sendStatus(400);
        }
      } else {
        res.sendStatus(400);
      }
    } catch (err) {
      console.log(err);
    }
  },
  addTask: (req, res) => {
    try {
      model.addTask(req._id, req.body.text);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  addAdminTask: (req, res) => {
    try {
      model.addTask(req.body._id, req.body.text);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  },
  getTasks: async (req, res) => {
    try {
      const data = await model.getTasks(req._id);
      res.send(data?.task);
    } catch (err) {
      console.log(err);
    }
  },
  getAllTasks: async (req, res) => {
    try {
      const data = await model.getTasks(req.query._id);
      res.send(data?.task);
    } catch (err) {
      console.log(err);
    }
  },
  updateTask: async (req, res) => {
    try {
      console.log(req._id, req.params.id, req.body.done);
      model.updateTask(req._id, req.params.id, req.body.done);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  updateTaskAdmin: async (req, res) => {
    try {
      console.log(req.body._id, req.params.id, req.body.done);
      model.updateTask(req.body._id, req.params.id, req.body.done);
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  },
  removeTask: async (req, res) => {
    try {
        console.log(req._id,req.params.id)
        model.removeTask(req._id,req.params.id);
        res.sendStatus(200)
    } catch (err) {
      console.log(err);
    }
  },
  removeTaskAdmin: async (req, res) => {
    try {
        model.removeTask(req.query._id,req.params.id);
        res.sendStatus(200)
    } catch (err) {
      console.log(err);
    }
  },
  getUser:async(req,res)=>{
    try{
   const users = await model.getAllUsers()
   res.status(200).send(users)
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
  },
  adminLogin:async(req,res)=>{
    try {
        const user = await model.getUserAdmin(req.query.username);
        if (user) {
          const valid = await bcrypt.compare(req.query.password, user.password);
          if (valid) {
            console.log(process.env.SECRET);
            const token = await jwt.sign(
              { _id: user._id + "" },
              process.env.SECRET + ""
            );
            res.send(token);
          } else {
            res.sendStatus(400);
          }
        } else {
          res.sendStatus(400);
        }
      } catch (err) {
        console.log(err);
      }
  },
};
