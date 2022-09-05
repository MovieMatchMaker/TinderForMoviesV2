// Author: Danny Zahariev


import {get_popular, get_recommendations, get_watch_providers} from './moviedb_api_caller.js';

export async function rec_get_current_movie(user){
    if(user.data.current === null){
        await fill_current(user)
    }
    return user.data.current
}

export async function rec_swipe_right(user){
    user.data.swiped.push(user.data.current.id)

    // adds to queue with recommendations based on this movie
    let recommendations = await get_recommendations(user.data.current.id, 1)
    let i = 0
    let new_movie_count = 0
    while (new_movie_count < 5){
        if(i === recommendations.length){
            break
        }
        if(!user.data.swiped.includes(recommendations[i].id)){
            user.data.queue.push(recommendations[i])
            new_movie_count++
        }
        i++
    }
    user.data.current = null

}

export function rec_swipe_left(user){
    user.data.swiped.push(user.data.current.id)

    user.data.current = null
}

// returns provider data
export function rec_match(user){
    user.data.swiped.push(user.data.current.id)
    user.data.matches.push(user.data.current)

    let out = get_watch_providers(user.data.current.id)

    user.data.current = null

    return out
}

// private
async function fill_current(user){
    if(user.data.queue.length !== 0){
        user.data.current = user.data.queue.shift();
    } else {
        // fills current backup_queue if necessary
        if(user.data.backup_queue.length === 0){
            const recommendations = await get_popular(user.data.current_page_popular)
            user.data.current_page_popular++

            // checks if movies have been swiped yet
            for(let i = 0; i < recommendations.length; i++){
                if(!user.data.swiped.includes(recommendations[i].id)){
                    user.data.backup_queue.push(recommendations[i])
                }
            }
        }
        user.data.current = user.data.backup_queue.shift()
    }
}
