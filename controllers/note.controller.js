const notes = require('../models/notes.model');
const asyncHandler = require('express-async-handler');


const addNotes = asyncHandler((req,res)=>{
    const { title,mainContent,image,userId,category} = req.body;

    const note = new notes({
        title,
        mainContent,
        image,
        userId,
        category
    });

    note
    .save()
    .then(()=>{
        res.status(200).send({
            success: true,
            message:'Blog is added successfully',
        })
    })
    .catch((err)=>{
        res.status(400).send({
            success:false,
            message: 'Caught some error',
            data:err,
        })
    });
})

const deleteNote = asyncHandler((req,res)=>{
    const noteId = req.params.id;
     notes.deleteOne({id : noteId})
     .then(()=>{
        res.status(200).send({
            success : true,
            message:'Blog is deleted successfully',
     })
     })
     .catch((err)=>{
        res.status(400).send({
         success:false,
         message: 'Caught some error',
        })
     })
})
 const getNote = asyncHandler(async(req,res)=>{
    notes.find({userId : req.params.id})
    .then((ele)=>{
        res.status(200).send({
            success:true,
            message:'Blogs are as Follow',
            data:ele, 
        })
    })
    .catch((err)=>{
        res.status(400).send({
            success:false,
            message: 'Caught some error'+err,
        })
    })
 })
const getAllNote  = asyncHandler(async (req,res) =>{
    notes.find()
    .then((note)=>{
        res.status(200).send({
            success : true,
            message : 'Blogs Dispalyed succesfully',
            data : note,

        })
    })
});

const updateNote = asyncHandler((req,res)=>{
    const noteId = req.params.id;
    const data = req.body;
    notes.updateOne(
        {id : noteId},
        {$set : data}
    )
    .then((result)=>{
        res.status(200).send({
            success : true,
            message : 'Blog is updated successfully',

        })
    })
    .catch((err)=>{
        res.status(400).send({
            success:false,
            message: 'Caught some error',
        })
    })


})


module.exports = {addNotes,deleteNote,getAllNote,updateNote,getNote}