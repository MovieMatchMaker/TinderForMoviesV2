const fs = require('fs')

/* 
 * username: username,
 * password: password,
 * movies: {
 *      current_movie: null,
 *      movies_swiped: [],
 *      queue: [],
 *      backup_queue: []
 * },
 * current_page_popular: 1
 * 
 */ 

/* creates account
 * inputs:
 * username - string
 * password - string
 * returns:
 * (if successful) js object with user info
 * (if account already exists) null
 */ 
function account_create(username, password){
    if(fs.existsSync('./accounts/' + username + '.json')){
        return null
    }
    
    let user ={
        username: username,
        password: password,
        movies: {
            current_movie: null,
            movies_swiped: [],
            queue: [],
            backup_queue: []
        },
        current_page_popular: 1
    }

    let file_data = JSON.stringify(user)
    fs.writeFileSync('./accounts/' + username + '.json', file_data)

    
    //TO DO: UPDATE CURRENT MOVIE

    return user
}

/* accesses the login token
 * inputs:
 * username - string
 * password - string
 * returns:
 * (if successful) js object with user info
 * (if username or password is incorrect) null
 */ 
function account_access(username, password){
    if(!fs.existsSync('./accounts/' + username + '.json')){
        return null
    }
}

/* saves account to database
 * inputs:
 * username - string
 * returns:
 * (if successful) js object with user info
 * (if username does not exist) null
 */ 
function account_save(username, user_info){
    return "test"
}






// test script
console.log(account_create("d", "z"))