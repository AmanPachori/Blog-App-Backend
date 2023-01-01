const notes = require('../models/notes.model');
const asyncHandler = require('express-async-handler');


const addNotes = asyncHandler((req,res)=>{
    const { title,mainContent,image,userId,username,category} = req.body;

    const note = new notes({
        title,
        mainContent,
        image,
        userId,
        username,
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
        console.log(err);
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
    notes.find({_id : req.params.id})
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
 const getuserNote = asyncHandler(async(req,res)=>{
    notes.find({userId: req.params.id})
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
    const { title, mainContent, image, category } = req.body;
    const myQuery = {id:noteId};
    const newvalues = {$set :{title:title, mainContent:mainContent, image:image, category:category}}

    notes
      .updateOne(myQuery,newvalues)
      .then(() => {
        res.status(200).send({
          success: true,
          message: "Blog is updated successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send({
          success: false,
          message: "Caught some error",
        });
      });


})


module.exports = {addNotes,deleteNote,getAllNote,updateNote,getNote,getuserNote}