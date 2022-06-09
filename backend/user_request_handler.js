// Author: Danny Zahariev
// Date Created: 7 June 2022
// Date Modified: 8 June 2022

import {
    get_popular,
    get_recommendations,
    get_watch_providers
} from './moviedb_api_caller.js';

export async function rec_get_current_movie(user) {


    if (user.data.current === null) {
        await fill_current(user)
    }
    return user.data.current
}

export async function rec_swipe_right(user) {
    user.data.swiped.push(user.data.current.id)

    // adds to queue with recommendations based on this movie
    let recommendations = await get_recommendations(user.data.current.id, 1)
    let i = 0
    while (i < 10) {
        if (i === recommendations.length) {
            break
        }
        if (!user.data.swiped.includes(recommendations[i].id)) {
            user.data.queue.push(recommendations[i])
        }
        i++
        console.log("loop: " + i)
    }
    user.data.current = null

}

export function rec_swipe_left(user) {
    user.data.swiped.push(user.data.current.id)

    user.data.current = null
}

// returns provider data
export async function rec_match(user) {
    user.data.swiped.push(user.data.current.id)
    user.data.matches.push(user.data.current)

    let out = await get_watch_providers(user.data.current.id)

    user.data.current = null

    return out
}

// private
async function fill_current(user) {
    if (user.data.queue.length !== 0) {
        user.data.current = user.data.queue.shift();
    } else {
        // fills current backup_queue if necessary
        if (user.data.backup_queue.length === 0) {
            const recommendations = await get_popular(user.data.current_page_popular)
            user.data.current_page_popular++

            // checks if movies have been swiped yet
            for (let i = 0; i < recommendations.length; i++) {
                if (!user.data.swiped.includes(recommendations[i].id)) {
                    user.data.backup_queue.push(recommendations[i])
                }
            }
        }
        user.data.current = user.data.backup_queue.shift()
    }
}


console.log("<===Test Script for Backend===>")

console.log("\nlogging in/creating account...")
var test_token = create_account("danny", "d")
if(!test_token){
    test_token = login("danny", "d")
}

console.log("Login Token (expect 1):")
console.log(test_token)

console.log("\n attempting to resolve login token...")
var test_user = resolve_login_token(test_token)
var test_failed_user = resolve_login_token(2)
console.log("resolved user details: ")
console.log(test_user)
console.log("false login token(expect null): ")
console.log(test_failed_user)

console.log("\n grabbing first film...")
var test_current_movie_1 = await get_current_movie(test_token)
console.log("first movie: ")
console.log(test_current_movie_1.title)

console.log("\nswiping right")
var test_wrong_film = test_user.data.backup_queue[0]
var test_current_movie_2 = await swipe_right(test_token)

console.log("\nnext movie after that: ")
console.log(test_current_movie_2.title)
console.log("^^^ should not be the same as the following: ")
console.log(test_wrong_film.title)

console.log("\nswiping left on 100 movies")
for(let i = 0; i < 100; i++){
    let test_next_movie = await swipe_left(test_token)
    console.log('swipe (' +  i + '): ' + test_next_movie.title)
}

// console.log("\nswiping right on 100 movies")
// for(let i = 0; i < 100; i++){
//     let test_next_movie = await swipe_right(test_token)
//     console.log('swipe (' +  i + '): ' + test_next_movie.title)
// }

console.log("\nmatching")
var prov = await match(test_token)

console.log("Providers")
console.log(prov.US)

console.log("Attempting to logout")
logout(test_token)