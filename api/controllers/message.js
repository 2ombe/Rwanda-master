const expressAsyncHandler = require("express-async-handler");
const Iganiriro = require("../models/Iganiriro");
const Message = require("../models/message");
const User = require("../models/User");

const sendMessage = expressAsyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("invalid data passes in the request");
    return res.status(400);
  }

  const newMessage = {
    sender: req.user._id,
    chat: chatId,
    description: description,
    conclusion: conclusion,
    signature: conclusion,
    tinNumber: tinNumber,
    file: file,
    umurenge: umurenge,
    akagali: akagali,
    umudugudu: umudugudu,
  };
  try {
    var message = await Message.create(newMessage);
    message = await message.populate("sender", "name pic role");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email role",
    });

    await Iganiriro.findByIdAndUpdate(req.body.chatId, { newMessage: message });
    res.json(message);
  } catch (error) {
    res.status(404).send({ error: "Internal server error" });
  }
});

const allMessages = expressAsyncHandler(async (req, res) => {
  try {
    const ubutumwa = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email role")
      .populate("chat");
    res.json(ubutumwa);
  } catch (error) {
    res.status(400).send({ error: "Ubutumwa ntibubonetse" });
  }
});

module.exports = { sendMessage, allMessages };
