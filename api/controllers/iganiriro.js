const expressAsyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");
const Iganiriro = require("../models/Iganiriro");
const User = require("../models/User");

// get conversations
const accessIganiriro = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("userId params not send to the request");
    return res.sendStatus(400);
  }
  var isChat = await Iganiriro.find({
    isGroupChat: false,
    isBuyobazi: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("newMessage");

  isChat = await User.populate(isChat, {
    path: "newMessage.sender",
    select: "name pic",
  });

  if (isChat > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      isBuyobazi: false,
      users: [req.user._id, userId],

      umuyobozi: [req.user._id, userId],
    };
    try {
      const createdChat = await Iganiriro.create(chatData);

      const fullChat = await Iganiriro.findOne({
        _id: createdChat._id,
      }).populate(
        "users",
        "-password -followers -followings -niUmuturage -niMutwarasibo -niMudugudu -niMutekano -niKagali -niMurenge -niAkarere -niIntara -niMinistry -niRib -niInteko -niPolice -niRDF -niAmbasade -niAmbMurwa -niDiaspora -niUmunyamahanga -niUmwunzi -niMujyanama -createdAt -updatedAt -__v -_id"
      );
      res.status(201).json(fullChat);
    } catch (error) {
      res.status(400).send({ error: "ntimugeze kubutumwa" });
    }
  }
});

// ubusabe bwose hamwe
const ubusabeBwose = async (req, res) => {
  await Iganiriro.find({
    users: { $elemMatch: { $eq: req.user._id } },
  })
    .sort({ updatedAt: -1 })
    .populate(
      "users",
      "-password -followers -followings -niUmuturage -niMutwarasibo -niMudugudu -niMutekano -niKagali -niMurenge -niAkarere -niIntara -niMinistry -niRib -niInteko -niPolice -niRDF -niAmbasade -niAmbMurwa -niDiaspora -niUmunyamahanga -niUmwunzi -niMujyanama -createdAt -updatedAt -__v -_id"
    )
    .populate("newMessage")
    .then(async (results) => {
      results = await User.populate(results, {
        path: "newMessage.sender",
        select: "name pic email",
      });
      res.status(200).send(results);
    });
};
const createGroupConversation = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Fill all required fild" });
  }
  var users = JSON.parse(req.body.users);
  if (users.length < 1) {
    return res
      .status(400)
      .send({ message: "The group required more than two persons" });
  }
  console.log(users);
  users.push(req.user);
  try {
    const itsinda = await Iganiriro.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      Admin: req.user,
    });
    const itsindaRyose = await Iganiriro.findOne({ _id: itsinda._id })
      .populate(
        "users",
        "-password -followers -followings -niUmuturage -niMutwarasibo -niMudugudu -niMutekano -niKagali -niMurenge -niAkarere -niIntara -niMinistry -niRib -niInteko -niPolice -niRDF -niAmbasade -niAmbMurwa -niDiaspora -niUmunyamahanga -niUmwunzi -niMujyanama -createdAt -updatedAt -__v -_id"
      )
      .populate(
        "Admin",
        "-password -followers -followings -niUmuturage -niMutwarasibo -niMudugudu -niMutekano -niKagali -niMurenge -niAkarere -niIntara -niMinistry -niRib -niInteko -niPolice -niRDF -niAmbasade -niAmbMurwa -niDiaspora -niUmunyamahanga -niUmwunzi -niMujyanama -createdAt -updatedAt -__v -_id"
      );
    res.status(200).json(itsindaRyose);
  } catch (error) {
    res.status(400).send({ error: "Failed to create group chat" });
  }
};

const chillWithLeader = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .status(400)
      .send({ message: "Ongeraho uwo mukorana ibi biganiro" });
  }
  var users = JSON.parse(req.body.users);

  if (users.length < 1) {
    return res.status(400).send({ message: "ongeraho umuyobozi ucyeneye" });
  }

  const inChat = await User.findById(users);
  users.push(req.user);

  try {
    if (inChat && inChat.role) {
      const elegantChill = await Iganiriro.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: false,
        isBuyobazi: true,
        Admin: req.user || users,
      });

      const fullConversation = await Iganiriro.findOne({
        _id: elegantChill._id,
      })
        .populate(
          "users",
          "-password -followers -followings -niUmuturage -niMutwarasibo -niMudugudu -niMutekano -niKagali -niMurenge -niAkarere -niIntara -niMinistry -niRib -niInteko -niPolice -niRDF -niAmbasade -niAmbMurwa -niDiaspora -niUmunyamahanga -niUmwunzi -niMujyanama -createdAt -updatedAt -__v -_id"
        )
        .populate(
          "Admin",
          "-password -followers -followings -niUmuturage -niMutwarasibo -niMudugudu -niMutekano -niKagali -niMurenge -niAkarere -niIntara -niMinistry -niRib -niInteko -niPolice -niRDF -niAmbasade -niAmbMurwa -niDiaspora -niUmunyamahanga -niUmwunzi -niMujyanama -createdAt -updatedAt -__v -_id"
        );
      res.status(200).json(fullConversation);
    } else {
      return res.send({ error: "Mwongereho umuyobozi" });
    }
  } catch (error) {
    res.status(400).send({ message: "Ntibikunze ko mwaganira nubuyobozi" });
  }
});

const renameGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedConversation = await Iganiriro.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate(
      "users",
      "-password -followers -followings -niUmuturage -niMutwarasibo -niMudugudu -niMutekano -niKagali -niMurenge -niAkarere -niIntara -niMinistry -niRib -niInteko -niPolice -niRDF -niAmbasade -niAmbMurwa -niDiaspora -niUmunyamahanga -niUmwunzi -niMujyanama -createdAt -updatedAt -__v -_id"
    )
    .populate(
      "Admin",
      "-password -followers -followings -niUmuturage -niMutwarasibo -niMudugudu -niMutekano -niKagali -niMurenge -niAkarere -niIntara -niMinistry -niRib -niInteko -niPolice -niRDF -niAmbasade -niAmbMurwa -niDiaspora -niUmunyamahanga -niUmwunzi -niMujyanama -createdAt -updatedAt -__v -_id"
    );
  if (!updatedConversation) {
    res.status(404).send({ error: "Ikiganiro ntikibonetse" });
  } else {
    res.status(200).json(updatedConversation);
  }
});

const removeFromGroup = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const removed = await Iganiriro.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate(
      "users",
      "-password -followers -followings -niUmuturage -niMutwarasibo -niMudugudu -niMutekano -niKagali -niMurenge -niAkarere -niIntara -niMinistry -niRib -niInteko -niPolice -niRDF -niAmbasade -niAmbMurwa -niDiaspora -niUmunyamahanga -niUmwunzi -niMujyanama -createdAt -updatedAt -__v -_id"
    )
    .populate(
      "Admin",
      "-password -followers -followings -niUmuturage -niMutwarasibo -niMudugudu -niMutekano -niKagali -niMurenge -niAkarere -niIntara -niMinistry -niRib -niInteko -niPolice -niRDF -niAmbasade -niAmbMurwa -niDiaspora -niUmunyamahanga -niUmwunzi -niMujyanama -createdAt -updatedAt -__v -_id"
    );
  if (!removed) {
    res.status(404).send({ error: "ubutumwa ntibwasibwe" });
  } else {
    res.send(removed);
  }
});

// add participants
const addNewParticipants = expressAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const added = await Iganiriro.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate(
      "users",
      "-password -followers -followings -niUmuturage -niMutwarasibo -niMudugudu -niMutekano -niKagali -niMurenge -niAkarere -niIntara -niMinistry -niRib -niInteko -niPolice -niRDF -niAmbasade -niAmbMurwa -niDiaspora -niUmunyamahanga -niUmwunzi -niMujyanama -createdAt -updatedAt -__v -_id"
    )
    .populate(
      "Admin",
      "-password -followers -followings -niUmuturage -niMutwarasibo -niMudugudu -niMutekano -niKagali -niMurenge -niAkarere -niIntara -niMinistry -niRib -niInteko -niPolice -niRDF -niAmbasade -niAmbMurwa -niDiaspora -niUmunyamahanga -niUmwunzi -niMujyanama -createdAt -updatedAt -__v -_id"
    );
  if (!added) {
    res.status(404).send({ error: "Aba bantu ntibabonetse" });
  } else {
    res.status(200).send(added);
  }
});

module.exports = {
  accessIganiriro,
  ubusabeBwose,
  createGroupConversation,
  chillWithLeader,
  renameGroup,
  removeFromGroup,
  addNewParticipants,
};
// gusabira urihusa rwo gukora ibirori cyangwa ce inama zitandukanye
