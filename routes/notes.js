const router = require('express').Router();
const {addNotes,deleteNote,getAllNote,updateNote,getNote,getuserNote}  = require('../controllers/note.controller');
const { VerifyToken } = require('../middleware/authmiddleware');

router.get('/get',getAllNote);
router.get('/get/:id',getNote);
router.get('/getuser/:id',VerifyToken,getuserNote);
router.post('/add',VerifyToken,addNotes);
router.delete('/delete/:id',VerifyToken,deleteNote);
router.put('/update/:id',VerifyToken, updateNote);

module.exports = router;