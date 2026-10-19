const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const { savedRedirectUrl }=require("../middleware.js"); //for the local variable

const userController=require("../controllers/users.js");

//router.route

router.route("/signup")
                        .get(userController.rendersignupForm)
                        .post( wrapAsync (userController.signup));


router.route("/login")
                .get(userController.renderLoginForm)
                .post(savedRedirectUrl , passport.authenticate("local",{
    failureRedirect:"/login", failureFlash:true,
    }),
    userController.login
);


//------------------------SIGNUP------------------------------------------
//router.get("/signup",userController.rendersignupForm);


//router.post("/signup", wrapAsync (userController.signup));



//---------------------LOGIN--------------------------------------------------
//router.get("/login",userController.renderLoginForm);


/*router.post("/login", savedRedirectUrl , passport.authenticate("local",{
    failureRedirect:"/login", failureFlash:true,
    }),
    userController.login
);*/


//-------------------------LOGOUT---------------------------------------------
router.get("/logout",userController.logout);



module.exports=router;