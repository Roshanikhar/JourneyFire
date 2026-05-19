const express=require("express");
const app=express();
const user=require("./router/user.js");
const post=require("./router/post.js");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");


//--------------------------Express session--------------------------------------

// app.use(session({secret: "mysupersecretstring"}));

// app.get("/test",(req,res)=>{
//     res.send("test successfull");
// });


app.use(session({secret: "mysupersecretstring",resave:false,saveUninitialized:true}));
app.use(flash());

//middleware of connect_flash

app.use((req,res,next)=>{

    res.locals.msg= req.flash("success");
    res.locals.error=req.flash("error");
    next();

});

// app.get("/reqcount",(req,res)=>{   //expore the express seeion.
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`you sent a request ${req.session.count} times`);
// });



//here we can store at server side and display at another route like websites
app.get("/register",(req,res)=>{

    let{name="anonymous"} =req.query;
    req.session.name=name;

    if( name === "anonymous")
    { 
            req.flash("error","User not register");
    }else{
            req.flash("success","User registered successfully ");
    }
    //req.flash("success","user register successfully!");
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    //res.send(`hello ${req.session.name}`);
    res.render("page.ejs",{name:req.session.name});
});

//--------------------cookie is used to saved on user browser--------------------
/*
app.use(cookieParser("secretcode"));

//-------------------------signed cookie------------------------------------------
app.get("/getsignedcookie",(req,res)=>{
    res.cookie("made-in","India",{ signed:true });
    res.send("signed cookie send");

});

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verifed");
});

//----------------------------------------------------------------------------------

app.use("/greate",(req,res)=>{
    let{name="anonymous"}=req.cookies;
    res.send(`hii ,${name}`);
})

app.get("/",(req,res)=>{ //it print the cookies on the console
    console.dir(req.cookies);
})

app.get("/setcookie",(req,res)=>{ //it sent the cookies to the user browser
    res.cookie("great","namaste");
    res.cookie("madein","india");
    res.cookie("name","Roshan");
    res.send("cookie has been set");
})

//Index-user
app.use("/user",user)  //express router 

//posts
app.use("/post",post)  //express router
*/



app.listen(3000,()=>{
    console.log("server listen on port no 3000");
})