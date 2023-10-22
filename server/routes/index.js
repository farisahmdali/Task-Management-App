var express = require('express');
var router = express.Router();
const helper = require("../helpers/helpers");
const middleware = require('../middleware');

/* GET home page. */
router.post('/signup',helper.signup );
router.get("/login",helper.login);
router.get("/admin-login",helper.adminLogin)
router.post("/addTask",middleware.verifyJwt,helper.addTask)
router.post("/addAdminTask",middleware.verfiyAdmin,helper.addAdminTask)
router.get("/tasks",middleware.verifyJwt,helper.getTasks)
router.patch("/updateTask/:id",middleware.verifyJwt,helper.updateTask)
router.patch("/updateTaskAdmin/:id",middleware.verfiyAdmin,helper.updateTaskAdmin)
router.delete("/remove/:id",middleware.verifyJwt,helper.removeTask)
router.delete("/removeAdmin/:id",middleware.verfiyAdmin,helper.removeTaskAdmin)
router.get("/getUsers",middleware.verfiyAdmin,helper.getUser)
router.get("/getTasks",middleware.verfiyAdmin,helper.getAllTasks)


module.exports = router;
