const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      followers: user.followers,
      followings: user.followings,
      niUmuturage: user.niUmuturage,
      niMutwarasibo: user.niMutwarasibo,
      niMutekano: user.niMutekano,
      niMujyanama: user.niMujyanama,
      niUmwunzi: user.niUmwunzi,
      niMudugudu: user.niMudugudu,
      niKagali: user.niKagali,
      niMurenge: user.niMurenge,
      niAkarere: user.niAkarere,
      niIntara: user.niIntara,
      niMinistry: user.niMinistry,
      niRib: user.niRib,
      niInteko: user.niInteko,
      niPolice: user.niPolice,
      niRDF: user.niRDF,
      niAmbasade: user.niAmbasade,
      niAmbMurwa: user.niAmbMurwa,
      niDiaspora: user.niDiaspora,
      niUmunyamahanga: user.niUmunyamahanga,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Ntimwemerewe, mubanze mwinjire" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res
      .status(401)
      .send({ message: "Imwirondoro mwatanze siyo, mwongere mugerageze" });
  }
};

const niMudugudu = (req, res, next) => {
  if (req.user && req.user.niMudugudu) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};

const niRib = (req, res, next) => {
  if (req.user && req.user.niRib) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niMutekano = (req, res, next) => {
  if (req.user && req.user.niMutekano) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};

const niMutwarasibo = (req, res, next) => {
  if (req.user && req.user.niMutwarasibo) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};

const niMujyanama = (req, res, next) => {
  if (req.user && req.user.niMujyanama) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niUmwunzi = (req, res, next) => {
  if (req.user && req.user.niUmwunzi) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niKagali = (req, res, next) => {
  if (req.user && req.user.niKagali) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niMurenge = (req, res, next) => {
  if (req.user && req.user.niMurenge) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niAkarere = (req, res, next) => {
  if (req.user && req.user.niAkarere) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niIntara = (req, res, next) => {
  if (req.user && req.user.niIntara) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};

const niMinistry = (req, res, next) => {
  if (req.user && req.user.niMinistry) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niInteko = (req, res, next) => {
  if (req.user && req.user.niInteko) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niPolice = (req, res, next) => {
  if (req.user && req.user.niPolice) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niRDF = (req, res, next) => {
  if (req.user && req.user.niRDF) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niAmbasade = (req, res, next) => {
  if (req.user && req.user.niAmbasade) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niAmbMurwa = (req, res, next) => {
  if (req.user && req.user.niAmbMurwa) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niDiaspora = (req, res, next) => {
  if (req.user && req.user.niDiaspora) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};
const niUmunyamahanga = (req, res, next) => {
  if (req.user && req.user.niUmunyamahanga) {
    next();
  } else {
    res.status(401).send({ message: "Ntimwemerewe" });
  }
};

module.exports = {
  generateToken,
  isAuth,
  niMudugudu,
  niMutekano,
  niRib,
  niAkarere,
  niAmbMurwa,
  niAmbasade,
  niDiaspora,
  niIntara,
  niInteko,
  niKagali,
  niUmunyamahanga,
  niRDF,
  niMinistry,
  niPolice,
  niUmwunzi,
  niMurenge,
  niMujyanama,
  niMutwarasibo,
};
