const express = require("express");
const {
  createCase,
  getCasesForUser,
  getCasesByLevel,
  updateCase,
  getUserCases,
  escalateCase,
  getSingleCase,
  getCase,
} = require("../controllers/case");
const router = express.Router();

router.post("/", createCase);
router.get("/", getUserCases);
router.get("/cases", getCasesForUser);
router.get("/cases/:level", getCasesByLevel);
router.put("/:caseId/escalate", escalateCase);
router.route("/:id").put(updateCase).get(getSingleCase);

module.exports = router;
