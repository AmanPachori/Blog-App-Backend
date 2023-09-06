import router from "./routes";

const {
  Signup,
  Signin,
  getUser,
  update,
} = require("../controllers/user.controller");
const { VerifyToken: any } = require("../middleware/authmiddleware");
router.post("/signup", Signup);
router.post("/signin", Signin);
router.get("/get/:id", getUser);
router.put("/update/:id", update);

module.exports = router;
