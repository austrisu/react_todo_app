var express               = require("express"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")

mongoose.connect("mongodb://localhost/auth_demo_app");
var app = express();
// app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//============
// ROUTES
//============

app.get("/", function(req, res){
    res.send("home");
});

// app.get("/secret",isLoggedIn, function(req, res){
//    res.render("secret");
// });

// Auth Routes

//show sign up form
app.get("/register", function(req, res){
   res.render("register");
});
//handling user sign up
app.post("/register", function(req, res){
  let body = JSON.parse(Object.keys(req.body)[0]);
    User.register(new User({username: body.username}), body.password, function(err, user){
        if(err){
            console.log(err);
            return res.sens('loginerror');
        }
        passport.authenticate("local")(req, res, function(){
           res.send("loginSuccesss");
        });
    });
});

// LOGIN ROUTES
//render login form
app.get("/login", function(req, res){
   res.send("login");
});
//login logic
//middleware
app.post("/login", passport.authenticate("local", {
    successRedirect: "/loggedin",
    failureRedirect: "/error"
}) ,function(req, res){
});

app.get("/loggedin", function(req, res){
  res.send("suces get")
})

app.get("/error", function(req, res){
  res.send("error get")
})

// app.get("/logout", function(req, res){
//     req.logout();
//     res.redirect("/");
// });


// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


app.listen(8080, function(){
    console.log("server started.......");
})