const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createReview=async ( req, res )=>{
    let listing=await Listing.findById(req.params.id);
    let newreview=new Review(req.body.review);//create new review, and data from the show.ejs from cames and I store it in the backend

    newreview.auther =req.user._id;
    console.log(newreview);
    listing.reviews.push(newreview); //we push the newreview in the reviews array created in the listing.ejs

    await newreview.save();
    await listing.save();
    req.flash("success","New Review is created!"); 

    res.redirect(`/listings/${listing._id}`);

};

module.exports.destroyReview=async (req ,res)=>{
    let { id, reviewId}=req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId }});

    await Review.findByIdAndDelete(reviewId);
     req.flash("success","Review is Deleted!"); 

    res.redirect(`/listings/${id}`);
};