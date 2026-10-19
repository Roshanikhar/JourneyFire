const Listing=require("../models/listing"); // implementation of MVC framework
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const maptoken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken:maptoken });


const defaultImage = {
    filename: "listingimage",
    url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
};

const getEditImageUrl = (url) => {
    if (!url || !url.includes("/upload/")) {
        return url;
    }

    return url.replace(
        "/upload/",
        "/upload/c_fill,w_250,q_auto,f_auto/"
    );
};

module.exports.index=async (req,res)=>{

    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm=(req,res)=>{
    res.render("listings/new.ejs");
};

module.exports.showListing=async (req,res)=>{

    let {id}=req.params;
    const listing=await Listing.findById(id)
                                .populate({path:"reviews",
                                    populate:{
                                        path:"auther",
                                    },
                                })
                                .populate("owner");
    if(!listing){
        req.flash("error","Listings you requestes for does not exits!");
       return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", {
        listing,
        mapToken: process.env.MAP_TOKEN,
    });
};

module.exports.createListing=async (req,res)=>{

    const response = await geocodingClient.forwardGeocode({
        query: `${req.body.listing.location}, ${req.body.listing.country}`,
        limit: 1,
    }).send();
    const feature = response.body.features[0];

    if (!feature) {
        req.flash("error", "Could not find that location.");
        return res.redirect("/listings/new");
    }

    const newlistings = new Listing(req.body.listing);
    newlistings.geometry = feature.geometry;
    newlistings.owner = req.user._id;
    newlistings.geometry=response.body.features[0].geometry;
    newlistings.image = req.file
        ? { url: req.file.path, filename: req.file.filename }
        : defaultImage;
    let savelisting=  await newlistings.save();
    console.log(savelisting);
    req.flash("success","New Listings Created!"); //flash message display on page
    res.redirect(`/listings/${newlistings._id}`);
};




module.exports.renderEditForm=async (req,res)=>{

    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listings you requestes for does not exits!");
        return res.redirect("/listings");
    }

    const originalImageUrl = getEditImageUrl(listing.image.url);
    res.render("listings/edit.ejs", {listing, originalImageUrl});

};


module.exports.updateListing=async (req,res)=>{

    let {id}=req.params;
    const response = await geocodingClient.forwardGeocode({
        query: `${req.body.listing.location}, ${req.body.listing.country}`,
        limit: 1,
    }).send();
    const feature = response.body.features[0];

    if (!feature) {
        req.flash("error", "Could not find that location.");
        return res.redirect(`/listings/${id}/edit`);
    }

    let listing = await Listing.findByIdAndUpdate(
        id,
        { ...req.body.listing, geometry: feature.geometry },
        { new: true, runValidators: true }
    );

    if(!listing){
        req.flash("error","Listing does not exist!");
        return res.redirect("/listings");
    }

    if(req.file){
        listing.image={
            url: req.file.path,
            filename: req.file.filename,
        };
        await listing.save();
    }

    req.flash("success","Listings Updated Successfully!"); 
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing=async (req,res)=>{

    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    req.flash("success","Listings is Deleted!"); 
    console.log(deletedListing);
    res.redirect("/listings");
};