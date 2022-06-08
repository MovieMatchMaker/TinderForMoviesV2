// Author: Danny Zahariev
// Date Created: 7 June 2022
// Date Modified: 7 June 2022

import {get_popular, get_recommendations} from './moviedb_api_caller.js';

export default function get_current_movie(user){
    if(user.data.current === null){
        fill_current(user)
    }
    return user.data.current
}

export default function swipe_right(user){
    user.data.swiped.push(user.data.current.id)

    // adds to queue with recommendations based on this movie
    let recommendations =  get_recommendations(user.data.current.id, 1)
    let i = 0
    while (i < 5){
        if(i === recommendations.lenght){
            break
        }
        if(!user.data.swiped.includes(recommendations[i].id)){
            user.data.backup_queue.push(recommendations[i])
        }
    }
    user.data.current = null
}

export default function swipe_left(user){
    user.data.swiped.push(user.data.current.id)

    user.data.current = null
}

// returns provider data
export default function match(user){
    user.data.swiped.push(user.data.current.id)
    user.data.matches.push(user.data.current)

    user.data.current = null
}

function fill_current(user){
    if(queue.length !== 0){
        user.data.current = user.data.queue.shift();
    } else {
        // fills current backup_queue if necessary
        if(user.data.backup_queue.length === 0){
            let recommendations = get_popular(user.data.current_page_popular)
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
