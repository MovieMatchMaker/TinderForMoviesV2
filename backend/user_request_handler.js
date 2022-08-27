// Author: Danny Zahariev
// Date Created: 7 June 2022
// Date Modified: 7 June 2022

// const database = require('./account_database.js')
// const api_caller = require(('./account_database.js'))


import {
    create,
    access,
    save
} from './account_database.js';
import {
    rec_get_current_movie,
    rec_swipe_left,
    rec_swipe_right,
    rec_match
} from './recommendation_engine.js';

// loads user from file
function get_user_by_username(username){
    return access(username)
}


/* creates account in database
 * inputs:
 * returns:
 * true if successful, false if an account with that username already exists
 */
function create_account(username, password) {
    let user = create(username, password)

    if (!user) {
        return false
    }

    return true
}




// returns array of previous matches 
function get_previous_matches(user) {
    return user.data.matches
}

// returns movie object of current 
async function get_current_movie(user) {
    let out = await rec_get_current_movie(user)
    return out
}

// returns next movie recommendation
async function swipe_right(user) {
    await rec_swipe_right(user)
    let out = await rec_get_current_movie(user)
    return out
}

// returns next movie recommendation
async function swipe_left(user) {
    await rec_swipe_left(user)
    let out = await rec_get_current_movie(user)
    return out
}

// returns watch providers or null if login token invalid
async function match(user) {
    let providers = await rec_match(user)
    return providers
}


// TO DO
// function logout(login_token) { }




// console.log("<===Test Script for Backend===>")

// console.log("\nlogging in/creating account...")
// var test_token = create_account("danny", "d")
// if (!test_token) {
//     test_token = login("danny", "d")
// }

// console.log("Login Token (expect 1):")
// console.log(test_token)

// console.log("\n attempting to resolve login token...")
// var test_user = resolve_login_token(test_token)
// var test_failed_user = resolve_login_token(2)
// console.log("resolved user details: ")
// console.log(test_user)
// console.log("false login token(expect null): ")
// console.log(test_failed_user)

// console.log("\n grabbing first film...")
// var test_current_movie_1 = await get_current_movie(test_token)
// console.log("first movie: ")
// console.log(test_current_movie_1.title)

// console.log("\nswiping right")
// var test_wrong_film = test_user.data.backup_queue[0]
// var test_current_movie_2 = await swipe_right(test_token)

// console.log("\nnext movie after that: ")
// console.log(test_current_movie_2.title)
// console.log("^^^ should not be the same as the following: ")
// console.log(test_wrong_film.title)

// console.log("\nswiping left on 100 movies")
// for (let i = 0; i < 100; i++){
//     let test_next_movie = await swipe_left(test_token)
//     console.log('swipe (' + i + '): ' + test_next_movie.title)
// }

// console.log("\nprinting current queue (should be empty)")
// for(let i = 0; i < test_user.data.queue.length; i++){
//     console.log(test_user.data.queue[i])
// }

// console.log("\nswiping right on 100 movies")
// for(let i = 0; i < 100; i++){
//     let test_next_movie = await swipe_right(test_token)
//     console.log('swipe (' +  i + '): ' + test_next_movie.title)
// }

// for(let i = 0; i < test_user.data.queue.length; i++){
//     console.log(test_user.data.queue[i].title)
// }

// console.log("\nmatching with ",  test_user.data.current.title)
// var prov = await match(test_token)

// console.log("Providers")
// console.log(prov.US)

// // console.log("Attempting to logout")
// // logout(test_token)

export { get_user_by_username, create_account,  get_previous_matches, get_current_movie, swipe_right, swipe_left, match };