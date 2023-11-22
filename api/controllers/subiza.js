const { StatusCodes } = require("http-status-codes");
const { NotFoundError, BadRequestError } = require("../errors");

const Subiza = require("../models/TangaUrushushya");

// aho umuyobozi yandikira asubiza abaturage
const subiza = async (req, res) => {
  const igisubizo = new Subiza(req.body);
  try {
    const savedAnswer = await igisubizo.save();
    res.status(StatusCodes.CREATED).json(savedAnswer);
  } catch (error) {
    res.status(StatusCodes.CREATED).json(error);
  }
};
const aboMwasubije = async (req, res) => {
  const ibisubizo = await Subiza.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ ibisubizo, count: ibisubizo.length });
};

const vugIgisubizo = async (req, res) => {
  const {
    body: { name, responsibility, impamvu },
    user: userId,
    params: { id: responseId },
  } = req;

  if ((name === "", responsibility === "", impamvu === "")) {
    throw new BadRequestError("you must fill all required componentsa");
  }

  const igisubizo = await Subiza.findByIdAndUpdate(
    { _id: responseId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!igisubizo) {
    throw new NotFoundError(`there is no answer with id ${responseId}`);
  }
  res.status(StatusCodes.OK).json(igisubizo);
};
const igisubizo = async (req, res) => {
  const {
    user: { userId },
    params: { id: responseId },
  } = req;
  const response = await Subiza.findOne({ createdBy: userId, _id: responseId });
  if (!response) {
    throw new NotFoundError(
      `ntagisubizo cyibonetse gifite ibi birango${responseId}`
    );
  }
  res.status(StatusCodes.OK).json({ response });
};
const sibaIgisubizo = async (req, res) => {
  const {
    user: userId,
    params: { id: responseId },
  } = req;

  const answer = await Subiza.findOneAndRemove({
    _id: responseId,
    createdBy: responseId,
  });
  if (!answer) {
    throw new NotFoundError(`there is no response with id ${responseId}`);
  }
  res.status(StatusCodes.OK).json({ answer });
};

module.exports = {
  subiza,
  aboMwasubije,
  vugIgisubizo,
  igisubizo,
  sibaIgisubizo,
};
