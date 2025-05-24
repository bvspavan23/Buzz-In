const express = require("express");
const buzzController=require("../controllers/buzzerCtrl");
const buzzRouter = express.Router();
const isAuthenticated = require("../middlewares/isAuth");

buzzRouter.post("/api/create-buzz",isAuthenticated,buzzController.create);
buzzRouter.get("/api/buzzes",buzzController.getAll);
buzzRouter.get("/api/admin/buzzes",isAuthenticated,buzzController.myBuzzes);
buzzRouter.get("/api/buzzes/:id",buzzController.getRoomById);
module.exports = buzzRouter;