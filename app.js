
if(process.env.NODE_ENV != "production"){   //this is used to hide the secrete code in the production environment
    require('dotenv').config()   //this is used to load the .env file and make the secrete code available in the process.env object
}                                   //this is used for cloud deloplment image store on that.
console.log(process.env) // remove this after you've confirmed it is working

const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride= require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const {listingSchema , reviewSchema}=require("./schema.js");//require the validation schema to handle the server side validation.
const listingsRouter = require("./routers/listing.js");
const reviewsRouter=require("./routers/review.js");
const UserRouter=require("./routers/user.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport"); //below three for the authentication
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
//---------------------------------------------------------------------------
//connection setting
const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
})

async function main() {
  await mongoose.connect(MONGO_URL);
}
//-------------------------------------------------------------------------------

//require path
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views") );
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public"))); //for the sytle.css we write it


app.get("/",(req,res)=>{
    res.send("I am roshan");
});

//--------------------Using session-----------------------------------------------------------
const sessionOption={                     //this add the cookie on the inspect
    secret:"mysupersecretecode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*24*3,
        maxAge:7*24*60*60*24*3,
        httpOnly:true,
    }
}

app.use(session(sessionOption));//it is used before the route 

    //connect-flash

app.use(flash());//it is used before the route 

//--------------------------------------------------------------------------------------------

//for the passport use

//passport
app.use(passport.initialize());
app.use(passport.session());

//passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//-------------------------------------------------------------------------------------------------------

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;                 //it store the current user info used for " the show signup ,signout and logout option."
    next();
});
//--------------------------------------------------------------------------------------------


//[INDEX ROUTE] ---->display all the list of listings

app.use("/listings",listingsRouter);
//---------------------------------------------------------------------------------------------
//Review
//POST Raute
app.use("/listings/:id/reviews",reviewsRouter);

//User Router
app.use("/",UserRouter);

//Authentication User first Came to register
app.get("/demoUser",async (req,res)=>{
    let fakeUser=new User({
        email:"student@gmail.com",
        username:"roshan",
    })

    let registeredUser=await User.register(fakeUser,"helloword");
    res.send(registeredUser);
}) 




app.use("/*splat",(req,res,next)=>{ //all request which are not match above route it ,it will be there.
    next(new ExpressError(404,"Page Not Found!"));
});
//---------------------------middleware to handle error--------------------------------
app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong!"}=err;
    res.status(statusCode).render("error.ejs",{message});
    //res.status(statusCode).send(message);
});
// app.use((err, req, res, next) => { //this is for the error handling in the development environment if listing is not upload
//     console.log("🔥 FULL ERROR OBJECT:");
//     console.log(err);
//     console.log("🔥 ERROR MESSAGE:", err.message);
//     console.log("🔥 STACK:", err.stack);

//     res.status(500).send(err.message);
// });


app.listen(8080,()=>{
    console.log("Post 8080 is listen");
});