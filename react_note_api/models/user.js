let mongoose = require( "mongoose" );
let passportLocalMongoose = require( "passport-local-mongoose" );

let UserSchema = new mongoose.Schema( {
    username: String,
    password: String,
    todos: mongoose.Schema.Types.Mixed
} );

UserSchema.plugin( passportLocalMongoose );

module.exports = mongoose.model( "User", UserSchema );