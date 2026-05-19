const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js"); 
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn ,isowner,validateListing }=require("../middleware.js");

const listingController =require("../controllers/listings.js");
const { listingSchema } = require("../schema.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js"); //here image is commes from form and stored in cloud and url is store in mongodb
const upload = multer({ storage });


//router.route
router.route("/")
                 .get(wrapAsync(listingController.index))  
                //  .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing)); 
                .post( upload.single('Listing[image]'), function (req, res) { //this is line where image is comes from fronend 
                    res.send(req.file);
                });


router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
                    .get( wrapAsync(listingController.showListing))
                    .put( isLoggedIn, isowner, validateListing, wrapAsync(listingController.updateListing))
                    .delete(isLoggedIn, isowner, wrapAsync(listingController.destroyListing));


                    //below are the previous implementation is correct but we make it more compact so below is correct.
//----------------------------------------------------------------------------------
//[INDEX ROUTE] ---->display all the list of listings
//router.get("/",wrapAsync(listingController.index));


//------------------------------------------------------------------------------------
//[New ROUTE]
//router.get("/new",isLoggedIn, listingController.renderNewForm);


//------------------------------------------------------------------------------------
//[SHOW ROUTE]
//router.get("/:id", wrapAsync(listingController.showListing));


//------------------------------------------------------------------------------------
//[create ROUTE] first maked new and then created
//router.post("/",isLoggedIn, validateListing, wrapAsync(listingController.createListing)); 


//---------------------------------------------------------------------------------------
//Edit Route
router.get("/:id/edit",isLoggedIn, isowner, wrapAsync(listingController.renderEditForm));


//-----------------------------------------------------------------------------------------
//[Updated Route]
//router.put("/:id", isLoggedIn, isowner, validateListing, wrapAsync(listingController.updateListing));


//------------------------------------------------------------------------------------------
//[Delete Route]
//router.delete("/:id",isLoggedIn, isowner, wrapAsync(listingController.destroyListing));


module.exports=router;
