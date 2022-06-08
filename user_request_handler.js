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
function login(username, password){
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
function get_current_movie(login_token){
    let user = resolve_login_token(login_token)

    if(user === null){
        return null
    }

    return rec_get_current_movie(user)
}

// returns next movie recommendation or null if login token invalid
function swipe_right(login_token){
    let user = resolve_login_token(login_token)

    if(user === null){
        return null
    }

    rec_swipe_right(user)

    let out = get_current_movie(user)
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
var login_token_count = 0
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


var test_token = create_account("danny", "shhh, password")

if(!test_token){
    test_token = login("danny", "shhh, password")
}

console.log(test_token)

var test_current_movie = get_current_movie(test_token)
console.log(test_current_movie)