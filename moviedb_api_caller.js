// Author: Danny Zahariev
// Date Created: 7 June 2022
// Date Modified: 7 June 2022

const api_key = 'b9964db6966369e1b45cdd3f27968309'

import fetch from 'node-fetch'

/* gets list of popular pages
 * inputs:
 * current page- page of popular movies, int 1-1000
 * returns:
 * array of movie objects
 */ 
export function get_popular(current_page){
    let out
    console.log("get_popular(" + current_page + ")")

    fetch('https://api.themoviedb.org/3/movie/popular?api_key='
        + api_key
        + '&language=en-US&page='
        + current_page)
    .then( res=> {
        console.log("hello")
    })
    .then(res => res.json())
    .then(res_json => {
        console.log(res_json)
        out = res_json.results
    }).catch(err =>{
        throw(err)
    })
    console.log("before return")
    return out
}

/* gets list of recommendations based off the previous movie
 * inputs: 
 * movie id - moviedb id of film, int
 * page - page of results, int 1-1000
 * returns:
 * array of movie objects
 */ 
export function get_recommendations(movie_id, page){
    fetch('https://api.themoviedb.org/3/movie/'
        + current_movie.id 
        + '/recommendations?api_key=' 
        + api_key 
        + '&language=en-US&page='
        + page)
    .then(res => res.json())
    .then(res_json => {
        return res_json.results
    })
}

export function get_watch_providers(movie_id){
    fetch('https://api.themoviedb.org/3/movie/'
        + movie_id
        + '/watch/providers?api_key=' 
        + api_key)
    .then(res = res.json())
    .then(res_json => {
        return res_json.results
    })
}


// test code
console.log(get_popular(1))
fetch('https://api.themoviedb.org/3/movie/popular?api_key=b9964db6966369e1b45cdd3f27968309&language=en-US&page=1')
.then(res => {
    console.log("response")
    console.log(res)
})


fetch('https://api.themoviedb.org/3/movie/300?api_key=b9964db6966369e1b45cdd3f27968309&language=en-US')
.then(res=>{
    console.log(res)
})

// console.log(get_recommendations(300), 1)