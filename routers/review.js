const express=require("express");
const router=express.Router({mergeParams:true});//to access the :id from app.js
const Review=require("../models/review.js");
const Listing=require("../models/listing.js"); 
const wrapAsync=require("../utils/wrapAsync.js");
const { Validatereview, isLoggedIn,isReviewAuther }=require("../middleware.js");//require the validation schema to handle the server side validation.

const reviewController=require("../controllers/review.js");

router.post("/",isLoggedIn, Validatereview, wrapAsync(reviewController.createReview));

//delete Route
router.delete("/:reviewId",isLoggedIn,isReviewAuther, wrapAsync(reviewController.destroyReview));


module.exports=router;