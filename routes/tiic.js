const router = require("express").Router();
const { getAllData, addData } = require("../controllers/tiic.controller");

router.get("/get", getAllData);
router.post("/add", addData);

module.exports = router;
