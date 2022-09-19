const router = require('express').Router();
const {addNotes,deleteNote,getAllNote,updateNote,getNote}  = require('../controllers/note.controller');

router.get('/get',getAllNote);
router.get('/get/:id',getNote);
router.post('/add',addNotes);
router.delete('/delete/:id',deleteNote);
router.put('/update/:id', updateNote);

module.exports = router;