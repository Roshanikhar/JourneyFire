const Listing=require("./models/listing.js"); 
const Review=require("./models/review.js"); 
const {listingSchema}=require("./schema.js");//require the validation schema to handle the server side validation.
const {reviewSchema}=require("./schema.js");//require the validation schema to handle the server side validation.
const ExpressError=require("./utils/ExpressError.js");

module.exports.isLoggedIn=(req,res,next)=>{
    //console.log(req.path, "---" , req.originalUrl); save url tp rediredt user to its original destination after login

     if(!req.isAuthenticated()){
        //redirect url
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
}


module.exports.savedRedirectUrl=(req,res,next)=>{//this middleware store the originalUrl to the local variable so it can use further.
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}


module.exports.isowner=async (req,res,next)=>{ //this middleware for the to check only owner can edit,update,delete listings
    let {id}=req.params;
    let listing =await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.validateListing=(req,res,next)=>{
    let { error }=listingSchema.validate(req.body);  //here joi tool is used to handle the validation schema for the listings
     
       if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
       }else{
        next();
       }
}


module.exports.Validatereview=(req,res,next)=>{ //schema validation middleware for the review 
    let { error }=reviewSchema.validate(req.body);  //here joi tool is used to handle the validation schema
     
       if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
       }else{
        next();
       }
}

//this midddleware are for the only auther can delete the review.
module.exports.isReviewAuther=async (req,res,next)=>{ //this middleware for the to check only owner can edit,update,delete listings
    let {id,reviewId}=req.params;
    let review =await Review.findById(reviewId);

    if(!review.auther.equals(res.locals.currUser._id)){
        req.flash("error","You are not the auther of this listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
