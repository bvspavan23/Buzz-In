const asyncHandler = require("express-async-handler");
const { customAlphabet } = require("nanoid");
const Buzz = require("../models/Buzz");
const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890', 6);
const Admin = require("../models/Admin");

const buzzCtrl = {
  create: asyncHandler(async (req, res) => {
    const { name } = req.body;
    if (!name) {
      throw new Error("Please enter the Name!");
    }
    const shortedRoomId = nanoid();
    const dbRoom = await Buzz.create({
      name,
      roomId: shortedRoomId,
    });
    const adminId = req.user;
    await Admin.findByIdAndUpdate(
      adminId,
      { $push: { Buzzes: dbRoom._id }},
      { new: true }
    );
    res.json({
      adminId,
      name: dbRoom.name,
      roomId: dbRoom.roomId,
      id: dbRoom._id,
    });
  }),

  getAll: asyncHandler(async (req, res) => {
    const rooms = await Buzz.find();
    res.json(rooms);
  }),

    myBuzzes: asyncHandler(async (req, res) => {
    const adminId = req.user;
    console.log("ADMIN ID", adminId);
    const admin = await Admin.findById(adminId).populate("Buzzes");
    res.json(admin.Buzzes);
  }),

  getRoomById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const room = await Buzz.findById(id);
    res.json(room);
  }),
};

module.exports = buzzCtrl;
