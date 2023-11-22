const expressAsyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Ukekwa = require("../models/ukekwa");
const Umushyitsi = require("../models/umushyitsi");

const cUmushyitsi = expressAsyncHandler(async (req, res) => {
  const {
    visitorsInfo,
    address,
    stayingInfo,
    contract,
    rent,
    received,
    createdBy,
  } = req.body;

  const visitor = {
    visitorsInfo: visitorsInfo,
    address: address,
    stayingInfo: stayingInfo,
    contract: contract,
    received: received,
    createdBy: req.user,
    rent: rent,
  };

  const wanted = await Ukekwa.find({});
  if (wanted && wanted.id === visitor.indangamuntu) {
    res.send({
      message:
        "Umuntu mwakiriye akurikiranywe nubutabera, mumenyeshe ushinze umutekano",
    });
  }
  const savedVisitor = await (
    await Umushyitsi.create(visitor)
  ).populate("createdBy", "name pic");
  console.log(savedVisitor);
  res.send({
    message: "Murakoze kumenyesha abari iwanyu bashya",
    savedVisitor,
  });
});

// get your own visitor
const getAllBashy = async (req, res) => {
  try {
    const abashyitsi = await Umushyitsi.find().populate(
      "createdBy",
      "name pic -_id"
    );

    res.status(200).send(abashyitsi);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
// get single visitor

async function getUmushyitsi(req, res) {
  try {
    const umushyitsi = await Umushyitsi.findById(req.params.id);
    if (!umushyitsi) {
      return res.status(404).json({ message: "Umushyitsi Ntabonetse" });
    }
    return res.send(umushyitsi);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
}

// delete umushyitsi
const sibaUmushyitsi = async (req, res) => {
  try {
    const umushyitsi = await Umushyitsi.findById(req.params.id, {
      user: req.user._id,
    });
    console.log(umushyitsi);

    if (umushyitsi) {
      await umushyitsi.deleteOne();
      res.status(StatusCodes.OK).send({ message: ` mumukuye iwanyu` });
    } else {
      res.status(StatusCodes.UNAUTHORIZED).send({
        message: `kumenyesha  atakiri iwawe ntibikinze`,
      });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
};
// update abashyitsi

const vugAmakuru = async (req, res) => {
  try {
    const umushyitsi = await Umushyitsi.findById(req.params.id, {
      user: req.user._id,
    }).populate("createdBy", "name pic -_id");
    console.log(umushyitsi);
    if (umushyitsi) {
      (umushyitsi.firstName = req.body.firstName),
        (umushyitsi.lastName = req.body.lastName),
        (umushyitsi.indangamuntu = req.body.indangamuntu);
      await umushyitsi.updateOne({ $set: req.body });
      res.status(StatusCodes.OK).send({
        message: `Amakuru yerekeye ${umushyitsi.firstName} yavuguruwe`,
        umushyitsi,
      });
    } else {
      res
        .status(StatusCodes.UNAUTHORIZED)
        .send({ message: "Ntimwemerewe kuvugurura aya makuru", umushyitsi });
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

module.exports = {
  cUmushyitsi,
  getAllBashy,
  sibaUmushyitsi,
  vugAmakuru,
  getUmushyitsi,
};
