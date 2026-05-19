const express=require("express");
const router=express.Router();


router.get("/",(req,res)=>{
    res.send("GET for users");
})

//Show-post
router.get("/:id",(req,res)=>{
    res.send("GET for show users");
})

//get-post
router.post("/creates",(req,res)=>{
    res.send("post for the users");
})


//delete-post
router.delete("/delete",(req,res)=>{
    res.send("delete the users");
})


module.exports=router;