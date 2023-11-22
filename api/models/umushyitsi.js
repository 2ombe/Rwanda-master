const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema(
  {
    visitorsInfo: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },

      lastName: {
        type: String,
      },
      indangamuntu: {
        type: Number,
        required: true,
      },
      sex: {
        type: String,
        enum: ["gabo", "gore"],
      },
      status: {
        type: String,
        enum: ["single", "married", "devorced"],
      },
    },

    address: {
      nationality: {
        type: String,
        required: true,
      },

      village: {
        type: String,
        required: true,
      },
      cell: {
        type: String,
        required: true,
      },
      sector: {
        type: String,
        required: true,
      },
      province: { type: String, required: true },
      district: {
        type: String,
      },
    },

    stayingInfo: {
      impamvu: {
        type: String,
        enum: ["gusura", "umukozi", "gukodesha"],
        min: 6,
        max: 50,
      },
      igiheAhageze: {
        type: Date,
        default: Date.now,
      },
      igiheAmara: {
        type: Date,
      },
    },

    contract: {
      salary: { type: Number },
      akazi: { type: String },
      workHour: { type: Number },
      sickLeave: {
        type: String,
        enum: ["uburwayi", "gusura", "gusenga"],
      },
      termination: { type: String },
      dispute: { type: String },
      isPaid: { type: Boolean, default: false },
      paidAt: { type: Date, default: null },
    },

    rent: {
      amount: { type: Number },
      entryDate: { type: Date, default: Date.now },
      exitDate: { type: Date },
      securityBill: { type: Number },
      utilitiesBills: { type: Number },
      maintainace: { type: String, enum: ["nyirinzu", "ukodesha"] },
      Occupancy: { type: String },
      petPolicy: {
        type: String,
        enum: ["injangwe", "imbwa", "iryariryo"],
      },
      restrictions: { type: String, default: "Ibiyobyabwenge" },
      termination: { type: String },
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    tax: { type: Number },
  },
  { timestamps: true }
);

const Umushyitsi = mongoose.model("Umushyitsi", notifySchema);
module.exports = Umushyitsi;
