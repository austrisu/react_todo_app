import axios from "axios"

export default {
    user: {
        register: credentials => {
            return new Promise( ( resolve, reject ) => {
                axios.post( "/register", credentials ).then( ( res ) => {
                    resolve( res )
                } ).catch( ( err ) => {
                    reject( err )
                } );
            } )
        },
        login: credentials => {
            return new Promise( ( resolve, reject ) => {
                axios.post( "/login", credentials ).then( ( res ) => {
                    resolve( res )
                } ).catch( ( err ) => {
                    reject( err )
                } );
            } )
        },
        addTodo: todos => {
            return new Promise( function( resolve, reject ) {
                axios.post( "/addTodo", todos )
                    .then( ( res ) => resolve( res ) )
                    .catch( ( err ) => reject( err ) )
            } );
        },
        removeTodo: todos => {
            return new Promise( function( resolve, reject ) {
                axios.post( "/removeTodo", todos )
                    .then( ( res ) => resolve( res ) )
                    .catch( ( err ) => reject( err ) )
            } );
        },
        strikeTodo: todos => {
            return new Promise( function( resolve, reject ) {
                axios.post( "/strikeTodo", todos )
                    .then( ( res ) => resolve( res ) )
                    .catch( ( err ) => reject( err ) )
            } );
        },
        logout: () => {
            return new Promise( function( resolve, reject ) {
                axios.post( "/logout", {} )
                    .then( ( res ) => resolve( res ) )
                    .catch( ( err ) => reject( err ) )
            } );
        },
        getUserData: () => {
            return new Promise( function( resolve, reject ) {
                axios.get( "/getUserData", {} )
                    .then( ( res ) => {
                        console.log( res );
                        resolve( res )
                    } )
                    .catch( ( err ) => reject( err ) )
            } );
        },

        test: () => {
            console.log( "test in api" )
        }
    }
}