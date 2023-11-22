const expressAsyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const Ukekwa = require("../models/ukekwa");
const Umushyitsi = require("../models/umushyitsi");

const andikaUkekwa = expressAsyncHandler(async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    idNumber,
    icyaha,
    since,
    nationality,
  } = req.body;
  if (!firstName || !idNumber) {
    res.send({ message: " Mugaragaze amazina nindangamuntu byukurkiranywe" });
  }

  const ukekwa = {
    createdBy: req.user._id,
    firstName: firstName,
    lastName: lastName,
    idNumber: idNumber,
    middleName: middleName,
    icyaha: icyaha,
    since: since,
    nationality: nationality,
  };

  if (req.user.role === "Mutekano") {
    const wanted = await Umushyitsi.findOne().populate(
      "createdBy",
      "name pic -_id  "
    );
    const savedWanted = await Ukekwa.create(ukekwa);

    if (wanted && wanted.indangamuntu === savedWanted.id) {
      res.send({
        message: `UKekwa yabonetse kwa ${wanted.createdBy.name} `,
        savedWanted,
      });
    } else {
      res.status(201).send(savedWanted);
    }
  } else {
    res
      .status(403)
      .send({ message: "Nturi urwego rwemerewe gukurikirana umuntu" });
  }
});

const updateUkekwa = expressAsyncHandler(async (req, res) => {
  const ukekwa = await Ukekwa.findById(req.params.id, {
    user: req.user._id,
  }).populate("postedBy", "name pic -_id");

  if (ukekwa) {
    (ukekwa.firstName = req.body.firstName),
      (ukekwa.lastName = req.body.lastName),
      (ukekwa.id = req.body.id);
    (ukekwa.icyaha = req.body.icyaha),
      (ukekwa.since = req.body.since),
      (ukekwa.nationality = req.body.nationality);
    await Ukekwa.updateOne({ $set: req.body });

    const wanted = await Umushyitsi.findOne().populate(
      "createdBy",
      "name pic -_id  "
    );

    if (wanted && wanted.indangamuntu === ukekwa.id) {
      res.send({
        message: `UKekwa yabonetse kwa ${wanted.createdBy.name} `,

        ukekwa,
      });
    } else {
      res.status(201).send({
        message: `Amakuru yerekeye ${ukekwa.firstName} yavuguruwe`,
        ukekwa,
      });
    }
  }
});

//get single wanted
const ukekwa = expressAsyncHandler(async (req, res) => {
  const ukekwa = await Ukekwa.findById(req.params.id);
  const wanted = await Umushyitsi.findOne().populate(
    "createdBy",
    "name pic -_id  "
  );
  if (ukekwa && ukekwa.id === wanted.indangamuntu) {
    res.status(200).send({
      message: `ukekwa yabonetse kwa ${wanted.createdBy.name}`,
      ukekwa,
    });
  } else {
    res.status(201).send(ukekwa);
  }
});

// list yabakekwa

const abakekwa = expressAsyncHandler(async (req, res) => {
  const abakekwa = await Ukekwa.find().sort("createdAt -1");

  res.status(StatusCodes.OK).send(abakekwa);
});
// siba utagikurikiranwa

const deleteAbakekwa = async (req, res) => {
  const ukekwa = await Ukekwa.findById(req.params.id, {
    user: req.user._id,
  });

  if (ukekwa) {
    await ukekwa.deleteOne();
    res.status(StatusCodes.OK).send({ message: ` ntagikurikiranywe` });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).send({
      message: `kumenyesha  atakiri iwawe ntibikinze`,
    });
  }
};

const abanjye = expressAsyncHandler(async (req, res) => {
  try {
    const abakekwa = await Ukekwa.find({ user: req.user._id });
    res.send(abakekwa);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: "Hari ikibazo, mugerageze ihuzanzira" });
  }
});

const markUcyekwa = async (req, res) => {
  try {
    await Ukekwa.findByIdAndUpdate(
      req.body._id,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    ).exec((err, result) => {
      if (err) {
        return res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ error: err });
      } else {
        res.json(result);
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
// mark uwuyekwa
const unMarkUcyekwa = async (req, res) => {
  await Ukekwa.findByIdAndUpdate(
    req.body._id,
    {
      $pull: { likes: req.user._id },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: err });
    } else {
      res.json(result);
    }
  });
};

// gucunga uko abakora ibyaha biyongera nuko bagabanuka
const ibyaha = expressAsyncHandler(async (req, res) => {
  const sins = await Ukekwa.find().distinct("icyaha");
  res.send(sins);
});

module.exports = {
  ukekwa,
  updateUkekwa,
  abakekwa,
  deleteAbakekwa,
  andikaUkekwa,
  markUcyekwa,
  unMarkUcyekwa,
  abanjye,
  ibyaha,
};
