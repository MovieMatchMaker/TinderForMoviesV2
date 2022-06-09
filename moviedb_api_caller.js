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
export async function get_popular(current_page){
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key='
            + api_key
            + '&language=en-US&page='
            + current_page)
    const data = await response.json()
    var movies = JSON.parse(JSON.stringify(data));
    return movies.results
    
}

/* gets list of recommendations based off the previous movie
 * inputs: 
 * movie id - moviedb id of film, int
 * page - page of results, int 1-1000
 * returns:
 * array of movie objects
 */ 
export async function get_recommendations(movie_id, page){
    console.log("in the recommendations function")
    const response = await fetch('https://api.themoviedb.org/3/movie/'
        + movie_id 
        + '/recommendations?api_key=' 
        + api_key 
        + '&language=en-US&page='
        + page)
    const data = await response.json()
    var movies = JSON.parse(JSON.stringify(data));
    return movies.results

}

export async function get_watch_providers(movie_id){
    const response = await fetch('https://api.themoviedb.org/3/movie/'
        + movie_id
        + '/watch/providers?api_key=' 
        + api_key)
    const data = await response.json()
    var movies = JSON.parse(JSON.stringify(data));
    return movies.results
}


// test code
// var test = await get_popular(1)
// console.log(test[1])

// console.log("printing output from function")
// console.log(test[1])
// console.log(test)
