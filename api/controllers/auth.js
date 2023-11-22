const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const { generateToken } = require("../middleware/authentication");
const User = require("../models/User");

const login = expressAsyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  const user = await User.findOne({ email });
  try {
    if (user && user.comparePassword(password)) {
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user),
      });
    } else {
      res.send({ message: "Ntamuntuntu ufite iyi myirondoro" });
    }
  } catch (error) {
    throw new Error(error);
  }
});

const register = expressAsyncHandler(async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    niUmuturage: req.body.niUmuturage,
    niMutwarasibo: req.body.niMutwarasibo,
    niMutekano: req.body.niMutekano,
    niMujyanama: req.body.niMujyanama,
    niUmwunzi: req.body.niUmwunzi,
    niMudugudu: req.body.niMudugudu,
    niKagali: req.body.niKagali,
    niMurenge: req.body.niMurenge,
    niAkarere: req.body.niAkarere,
    niIntara: req.body.niIntara,
    niMinistry: req.body.niMinistry,
    niRib: req.body.niRib,
    niInteko: req.body.niInteko,
    niPolice: req.body.niPolice,
    niRDF: req.body.niRDF,
    niAmbasade: req.body.niAmbasade,
    niAmbMurwa: req.body.niAmbMurwa,
    niDiaspora: req.body.niDiaspora,
    niUmunyamahanga: req.body.niUmunyamahanga,
    nationality: req.body.nationality,
    id: req.body.id,
    city: req.body.city,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  const user = await newUser.save();
  res.send({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user),
  });
});

// search user
const searchUsers = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

const getSingleUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "Ntabashije kuboneka" });
  }
});

const updatedUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    niUmuturage = Boolean(req.body.isUmuturage) || user.niUmuturage;
    niMutwarasibo = Boolean(req.body.niMutwarasibo);
    niMutekano = Boolean(req.body.niMutekano);
    niMujyanama = Boolean(req.body.niMujyanama);
    niUmwunzi = Boolean(req.body.niUmwunzi);
    niMudugudu = Boolean(req.body.niMudugudu);
    niKagali = Boolean(req.body.niKagali);
    niMurenge = Boolean(req.body.niMurenge);
    niAkarere = Boolean(req.body.niAkarere);
    niIntara = Boolean(req.body.niIntara);
    niMinistry = Boolean(req.body.niMinistry);
    niRib = Boolean(req.body.niRib);
    niInteko = Boolean(req.body.niInteko);
    niPolice = Boolean(req.body.niPolice);
    niRDF = Boolean(req.body.niRDF);
    niAmbasade = Boolean(req.body.niAmbasade);
    niAmbMurwa = Boolean(req.body.niAmbMurwa);
    niDiaspora = Boolean(req.body.niDiaspora);
    niUmunyamahanga = Boolean(req.body.niUmunyamahanga);
    const updatedUser = await user.save();
    res.send({ message: "Ahawe Inshingano nshya", user: updatedUser });
  } else {
    res.status(404).send({ message: "Ntabonetse" });
  }
});

const updateProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req, body.password, 10);
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404).send({ message: "imwirondoro yavuguruwe neza" });
  }
});

// follow users
const followUser = expressAsyncHandler(async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.body._id);
      const currentUser = await User.findById(req.user);

      if (user && currentUser) {
        if (!user.followers.includes(currentUser._id)) {
          await user.updateOne({ $push: { followers: req.body._id } });
          await currentUser.updateOne({ $push: { followings: req.body._id } });
          res.status(200).json({ message: `Mwakurikiranye ${user.name}` });
        }

        if (!user.followers.includes(currentUser._id)) {
          if (
            user.umudugudu === currentUser.umudugudu &&
            user.akagali === currentUser.akagali &&
            user.umurenge === currentUser.umurenge &&
            user.akarere === currentUser.akarere
          ) {
            await user.updateOne({ $push: { followers: req.user._id } });
            await currentUser.updateOne({
              $push: { followings: req.body._id },
            });
          }
        }
      } else {
        res.status(403).send({ message: `Musanzwe mukurikirana ${user.name}` });
      }
    } catch (error) {}
  }
});

// all users for the purpose of post man and statististics
const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).send(users);
});

module.exports = {
  register,
  login,
  getSingleUser,
  updateProfile,
  updatedUser,
  followUser,
  getAllUsers,
  searchUsers,
};
