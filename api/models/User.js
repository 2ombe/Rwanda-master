const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
    },
    password: {
      type: String,
    },

    pic: {
      type: String,
      default: "",
    },
    nationality: {
      type: String,
    },

    umudugudu: {
      type: String,
    },
    akagari: {
      type: String,
    },
    umurenge: {
      type: String,
    },
    akarere: {
      type: String,
    },

    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    role: {
      type: String,

      enum: [
        "Umuturage",
        "Mutwarasibo",
        "Mutekano",
        " Mujyanama",
        "Umwunzi",
        "Mudugudu",
        "Gitifu-kagali",
        "Murenge",
        "Mayor",
        "Vice-mayor",
        "village",
        "cell",
        "sector",
        "district",
        "province",
        "ministry",
        "president",
      ],
      default: "Umuturage",
    },

    niUmuturage: {
      type: Boolean,
      default: true,
    },
    niMutwarasibo: {
      type: Boolean,
      default: false,
    },
    niMutekano: {
      type: Boolean,
      default: false,
    },
    niMujyanama: {
      type: Boolean,
      default: false,
    },
    niUmwunzi: {
      type: Boolean,
      default: false,
    },
    niMudugudu: {
      type: Boolean,
      default: false,
    },
    niKagali: {
      type: Boolean,
      default: false,
    },
    niMurenge: {
      type: Boolean,
      default: false,
    },
    niAkarere: {
      type: Boolean,
      default: false,
    },
    niIntara: {
      type: Boolean,
      default: false,
    },
    niMinistry: {
      type: Boolean,
      default: false,
    },
    niRib: {
      type: Boolean,
      default: false,
    },
    niInteko: {
      type: Boolean,
      default: false,
    },
    niPolice: {
      type: Boolean,
      default: false,
    },
    niRDF: {
      type: Boolean,
      default: false,
    },
    niAmbasade: {
      type: Boolean,
      default: false,
    },
    niAmbMurwa: {
      type: Boolean,
      default: false,
    },
    niDiaspora: {
      type: Boolean,
      default: false,
    },
    niUmunyamahanga: {
      type: Boolean,
      default: false,
    },

    nationality: {
      type: String,
      max: 50,
    },
    id: {
      type: String,
      max: 25,
    },
    city: {
      type: String,
    },

    createdAt: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", userSchema);
