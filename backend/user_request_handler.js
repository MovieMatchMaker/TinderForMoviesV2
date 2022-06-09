// Author: Danny Zahariev
// Date Created: 7 June 2022
// Date Modified: 7 June 2022

// const database = require('./account_database.js')
// const api_caller = require(('./account_database.js'))


import {create, access, save} from './account_database.js';
import {rec_get_current_movie, rec_swipe_left, rec_swipe_right, rec_match} from './recommendation_engine.js';

/* creates account in database
 * inputs:
 * current page- page of popular movies, int 1-1000
 * returns:
 * array of movie objects
 */ 
// returns login_token or null if username already exists
function create_account(username, password){
    let user = create(username, password)

    if(!user){
        return null
    }

    let login_token = create_login_token(user)
    return login_token
}

// returns login_token or null if username/password is incorrent
export function login(username, password){
    let user = access(username, password)

    if(!user){
        return null
    }

    let login_token = create_login_token(user)
    return login_token
}

// returns array of previous matches 
function get_previous_matches(login_token){
    let user = resolve_login_token(login_token)

    if(user === null){
        return null
    }

    return user.data.matches
}

// returns movie object of current 
async function get_current_movie(login_token){
    let user = resolve_login_token(login_token)

    if(user === null){
        return null
    }

    let out = await rec_get_current_movie(user)
    return out
}

// returns next movie recommendation or null if login token invalid
async function swipe_right(login_token){
    let user = resolve_login_token(login_token)

    if(user === null){
        return null
    }

    await rec_swipe_right(user)

    let out = await rec_get_current_movie(user)
    
    return out
}

// returns next movie recommendation or null if login token invalid
function swipe_left(login_token){
    let user = resolve_login_token(login_token)

    if(user === null){
        return null
    }

    rec_swipe_left(user)

    let out = get_current_movie(user)
    return out
}

// returns watch providers or null if login token invalid
function match(login_token){
    let user = resolve_login_token(login_token)

    if(user === null){
        return null
    }

    let providers = rec_match(user)
    return providers
}

function logout(login_token){
    let user = resolve_login_token(login_token)
    if(user = null)
        return
    if(user){
        close_login_token(login_token)
        save(user)
    }
}

// private
var login_token_count = 1
var current_users = []

// returns new login token 
function create_login_token(user){
    let new_token = login_token_count
    login_token_count++
    
    let key_val = {
        key: new_token,
        val: user
    }
    current_users.push(key_val)

    return new_token
}

// returns user object of corresponding login_token if existant
function resolve_login_token(login_token){
    for(let i = 0; i < current_users.length; i++){
        if(current_users[i].key === login_token){
            return current_users[i].val
        }
    }
    return null
}

function close_login_token(login_token){
    for(let i = 0; i < current_users.length; i++){
        if(current_users[i].key === login_token){
            user = current_users[i].val
            current_users.splice(i)
        }
    }

}



// console.log("<===Test Script for Backend===>")

// console.log("\nlogging in/creating account...")
// var test_token = create_account("danny", "shhh, password")
// if(!test_token){
//     test_token = login("danny", "shhh, password")
// }
// console.log("Login Token (expect 0):")
// console.log(test_token)

// console.log("\n attempting to resolve login token...")
// var test_user = resolve_login_token(test_token)
// var test_failed_user = resolve_login_token(1)
// console.log("resolved user details: ")
// console.log(test_user)
// console.log("false login token(expect null): ")
// console.log(test_failed_user)

// console.log("\n grabbing first film...")
// var test_current_movie_1 = await get_current_movie(test_token)
// console.log("first movie: ")
// console.log(test_current_movie_1.title)

// console.log("swiping right")
// var wrong_film = test_user.data.backup_queue[0]
// var next_film = await swipe_right(test_token)

// console.log("\nnext movie after that: ")
// console.log(test_current_movie_2.title)
// console.log("^^^ should not be the same as the following: ")
// console.log(test_wrong_film.title)

// console.log("swipeing left on 100 movies")
// for(let i = 0; i < 100; i++){
//     let test_next_movie = await swipe_left(test_token)
//     console.log(test_next_movie)
// }




// var test_current_movie = get_current_movie(test_token)
// console.log(test_current_movie)