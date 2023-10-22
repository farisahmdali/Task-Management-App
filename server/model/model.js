const { ObjectId } = require("mongodb");
const { getDb } = require("../configs/mongoConnection");

module.exports = {
  getUserAdmin: async (username) => {
    const res = await getDb()
      .collection("userAdmin")
      .findOne({ username: username });
    if (res) {
      return res;
    } else {
      return false;
    }
  },
  getAllUsers:async()=>{
    return await getDb().collection("users").aggregate([{$project:{ password : 0}}]).toArray();
  },
  getUserAdminbyid: async (_id) => {
    _id = new ObjectId(_id)
    const res = await getDb()
      .collection("userAdmin")
      .findOne({ _id });
    if (res) {
      return res;
    } else {
      return false;
    }
  },
  userExist: async (username) => {
    const res = await getDb()
      .collection("users")
      .findOne({ username: username });
    if (res) {
      return false;
    } else {
      return true;
    }
  },
  signup: (data) => {
    getDb().collection("users").insertOne(data);
  },
  getUser: async (username) => {
    const res = await getDb()
      .collection("users")
      .findOne({ username: username });
    if (res) {
      return res;
    } else {
      return false;
    }
  },
  addTask: (_id, text) => {
    _id = new ObjectId(_id);
    const task = { text, done: false, _id: new ObjectId() };
    console.log(text, _id, task);
    getDb().collection("users").updateOne({ _id }, { $push: { task } });
  },
  getTasks: async (_id) => {
    try {
      _id = new ObjectId(_id);
      return await getDb().collection("users").findOne({ _id });
    } catch (err) {
      console.log(err);
    }
  },
  updateTask: async (_id, taskId, done) => {
    try {
      _id = new ObjectId(_id);
      taskId = new ObjectId(taskId);
      console.log(_id, taskId, done);
      getDb()
        .collection("users")
        .updateOne(
          { _id, "task._id": taskId },
          { $set: { "task.$.done": done } }
        );
    } catch (err) {
      console.log(err);
    }
  },
  removeTask: (_id, taskId) => {
    _id = new ObjectId(_id);
    taskId = new ObjectId(taskId);
    getDb()
      .collection("users")
      .updateOne(
        { _id },
        {
          $pull: {
            task: {
              _id: taskId,
            },
          },
        }
      );
  },
};
