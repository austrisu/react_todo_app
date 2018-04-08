// *********************************
// *  Handles api  authentification
// *********************************


var express = require( "express" ),
    mongoose = require( "mongoose" ),
    passport = require( "passport" ),
    bodyParser = require( "body-parser" ),
    User = require( "./models/user" ),
    LocalStrategy = require( "passport-local" ).Strategy,
    passportLocalMongoose = require( "passport-local-mongoose" )

mongoose.connect( "mongodb://localhost/react_app_V3" );
var app = express();
// app.use(bodyParser.urlencoded({extended: true}));

//this body parser way makes everithing correct
app.use( bodyParser.json() );

app.use( require( "express-session" )( {
    secret: "hello world",
    resave: false,
    saveUninitialized: false
} ) );


app.use( passport.initialize() );
app.use( passport.session() );

//creates strategy
passport.use( "local", new LocalStrategy( User.authenticate() ) );

passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

app.post( "/register", function( req, res ) {

    //using body parser data is extracted
    let body = req.body;

    //part where usr is created
    User.register( new User( {
        username: body.username,
        todos: [ {
            todo: "Your first todo",
            isCompleted: false
        } ],
        test: "test"
    } ), body.password, function( err, user ) {
        if ( err ) {
            console.log( err );
            if ( err.name === "UserExistsError" ) {
                return res.send( "UserExistsError" )
            }
            return res.send( `unknown error` );
        }
        console.log( user );

        // TODO: find the way how to push first initial todo to user
        // User.findOneAndUpdate( {
        //         username: user.username
        //     }, {
        //         $push: {
        //             "todos": {
        //                 todo: "firstTodo",
        //                 isCompleted: false
        //             }
        //         }
        //     }, {
        //         safe: true,
        //         upsert: true,
        //         new: true
        //     },
        //
        //     function( err, model ) {
        //         console.log( err );
        //     }
        // );
        passport.authenticate( "local" )( req, res, function() {
            //part where JSON is with succes is sent client
            res.status( 200 ).json( {
                login: {
                    success: "Login correct"
                }
            } )
        } );
    } );
} );


app.post( "/login", passport.authenticate( 'local', {
    successRedirect: '/loginsuccess',
    failureRedirect: '/loginerr'
} ), function( req, res ) {
    console.log( "got in to function" );
} )



app.get( "/loginsuccess", ( req, res ) => {
    res.status( 200 ).json( {
        login: {
            success: "Login success"
        }
    } )
} )
app.get( "/loginerr", ( req, res ) => {
    res.status( 400 ).json( {
        login: {
            err: "Credentials is wrong"
        }
    } )
} )

app.post( "/logout", ( req, res ) => {
    req.logout();
    res.status( 200 ).json( {
        logout: {
            succes: "loggout success"
        }
    } )
} )

// TODO: need to exported to helper file
let isLoggedIn = ( req, res, next ) => {
    if ( req.isAuthenticated() ) {
        return next();
    }
    res.redirect( "/login" );
}
// TODO add middleware to see if authentificated
// TODO: if authentificated then add necesary todos
// TODO: todos should be with IDs generated on user side and then id is sent
// to server where task can be sent bd and them modified as necesary
app.post( "/addTodo", isLoggedIn, ( req, res ) => {
    console.log( "/addTodo" );
    console.log( req.body );
    res.status( 200 );
    User.findOne( {
        username: req.session.passport.user
    }, ( err, user ) => {
        if ( err ) {
            console.log( err );
            res.send( "error" )
        }
        console.log( user );
        user.todos = req.body
        user.save( ( err, updatedUser ) => {
            if ( err ) {
                console.log( err );
            } else {
                res.send( updatedUser )
            }
        } )
    } )
} )

app.post( "/removeTodo", isLoggedIn, ( req, res ) => {
    console.log( "/removeTodo" );
    console.log( req.body );
    res.status( 200 );
    User.findOne( {
        username: req.session.passport.user
    }, ( err, user ) => {
        if ( err ) {
            console.log( err );
            res.send( "error" )
        }
        console.log( user );
        user.todos = req.body
        user.save( ( err, updatedUser ) => {
            if ( err ) {
                console.log( err );
            } else {
                res.send( updatedUser )
            }
        } )
    } )
} )

app.post( "/strikeTodo", isLoggedIn, ( req, res ) => {
    console.log( "/strikeTodo" );
    console.log( req.body );
    res.status( 200 );
    User.findOne( {
        username: req.session.passport.user
    }, ( err, user ) => {
        if ( err ) {
            console.log( err );
            res.send( "error" )
        }
        console.log( user );
        user.todos = req.body
        user.save( ( err, updatedUser ) => {
            if ( err ) {
                console.log( err );
            } else {
                res.send( updatedUser )
            }
        } )
    } )
} )

//DELATE this one!!!!!!for dev purposes!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.get( "/addTodo/:userName", ( req, res ) => {
    console.log( "dev/addTodo" );
    console.log( req.params.userName );
    //res.status( 200 );
    User.find( {
            username: req.params.userName
        },
        ( err, user ) => {
            res.send( user )
        } )
} )

app.get( "/addTodo", ( req, res ) => {
    console.log( "dev/addTodo" );
    User.find( ( err, user ) => {
        res.send( user )
    } )
    //
} )

//get initial data when page is loaded
app.get( "/getUserData", isLoggedIn, ( req, res ) => {
    console.log( "/getUserData" );
    // TODO: todos is wrongly created therefore on front end there is emty array whitch causes errors when adding todos
    //Also recie
    User.findOne( {
        username: req.session.passport.user
    }, ( err, user ) => {
        if ( err ) {
            console.log( err );
            res.status( 400 ).json( {
                db: err
            } )
        }
        console.log( user );
        console.log( user.todos );
        res.status( 200 ).json( {
            data: {
                user: req.session.passport.user,
                todos: user.todos,
                // todos: [ {
                //         todo: "task1",
                //         isCompleted: false
                // },
                //     {
                //         todo: "task2",
                //         isCompleted: false
                // } ],
                test: "sfdfsdf"

            }
        } )

    } );

} )




app.post( "/*", ( req, res ) => {
    res.send( "wrong post route, reached /* " )
} )

app.get( "/*", ( req, res ) => {
    res.send( "wrong get route, reached /* " )
} )


app.listen( 8080, () => {
    console.log( "server started on port 8080" )
} )