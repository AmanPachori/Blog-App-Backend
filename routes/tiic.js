const router = require("express").Router();
const {
  getAllData,
  addData,
  getData,
} = require("../controllers/tiic.controller");

router.get("/get", getAllData);
router.get("/getdata", getData);
router.post("/add", addData);

module.exports = router;
