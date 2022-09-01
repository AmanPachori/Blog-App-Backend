const router = require("express").Router();
const {Signup,Signin,getUser} = require('../controllers/user.controller')
const {VerifyToken} = require('../middleware/authmiddleware');
router.post('/signup',Signup);
router.post('/signin',Signin);
router.get('/get',getUser);


module.exports = router;