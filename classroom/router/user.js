const express=require("express");
const router=express.Router();



router.get("/",(req,res)=>{
    res.send("GET for users");
})

//Show-user
router.get("/:id",(req,res)=>{
    res.send("GET for show users");
})

//psot-user
router.post("/posts",(req,res)=>{
    res.send("post for the users");
})


//delete-user
router.delete("/delete",(req,res)=>{
    res.send("delete the users");
})


module.exports=router;