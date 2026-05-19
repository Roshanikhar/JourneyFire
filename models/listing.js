const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{

        filename: {
        type: String,
        default: "listingimage",
            },
        url:{
        type:String,
        default:
            "https://unsplash.com/photos/vibrant-cityscape-with-illuminated-skyscrapers-at-night-9U7wBiMhZkY",

        set: (v)=> v==="" ?"https://unsplash.com/photos/vibrant-cityscape-with-illuminated-skyscrapers-at-night-9U7wBiMhZkY" : v,

        }
       
    },
    price:Number,
    location:String,
    country:String,
    reviews: [{
        type:Schema.Types.ObjectId,
        ref:"Review",
           }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
});

listingSchema.post("findOneAndDelete", async(listing)=>{ //post mongoose middleware
    if(listing){
        await Review.deleteMany({ _id: { $in:listing.reviews }})
    }
});

const Listing=mongoose.model("Listing",listingSchema); //create the collection
module.exports=Listing;
