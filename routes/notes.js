const router = require('express').Router();
const {addNotes,deleteNote,getAllNote,updateNote}  = require('../controllers/note.controller');

router.get('/get',getAllNote);
router.post('/add',addNotes);
router.delete('/delete/:id',deleteNote);
router.put('/update/:id', updateNote);

module.exports = router;