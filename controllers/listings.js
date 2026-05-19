const Listing=require("../models/listing"); // implementation of MVC framework

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
    res.render("listings/show.ejs",{ listing });
};

module.exports.createListing=async (req,res)=>{

   // try { 
        const newlistings=new Listing(req.body.listing);
        // Attach logged‑in user as owner
       // console.log(req.user);
        newlistings.owner = req.user._id;

        await newlistings.save();
        console.log(newlistings);
        req.flash("success","New Listings Created!"); //flash message display on page
        res.redirect("/listings");
    //} catch (err) {
       // console.log(err);
      //  res.status(400).send("Error creating listing: " + err.message);
        //next(err);
   // }
};




module.exports.renderEditForm=async (req,res)=>{

    let {id}=req.params;
    const listing=await Listing.findById(id);
    if(!listing){
        req.flash("error","Listings you requestes for does not exits!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", {listing});

};


module.exports.updateListing=async (req,res)=>{

    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
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