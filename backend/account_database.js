// Author: Danny Zahariev
// Date Created: 7 June 2022
// Date Modified: 8 June 2022

const account_file_path = './accounts/'

import * as fs from 'fs';

/* 
 * username: username,
 * password: password,
 * recommendation_data: {
 *      current: null,
 *      swiped: [],
 *      queue: [],
 *      backup_queue: [],
 *      matches: [],
 *      current_page_popular: 1
 * },
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
export function create(username, password) {
    if (fs.existsSync(account_file_path + username + '.json')) {
        return null
    }

    let user = {
        username: username,
        password: password,
        data: {
            current: null,
            swiped: [],
            queue: [],
            backup_queue: [],
            matches: [],
            current_page_popular: 1
        },

    }

    let file_data = JSON.stringify(user)
    fs.writeFileSync(account_file_path + username + '.json', file_data)

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
export function access(username, password) {
    if (fs.existsSync(account_file_path + username + '.json')) {
        let file_data = fs.readFileSync(account_file_path + username + '.json')
        let user = JSON.parse(file_data)
        if (user.password === password) {
            return user
        }
    }

    return null
}

/* saves account to database
 * inputs:
 * user_info - js user object (presumed correct)
 * returns:
 * (bool) success state
 */
export function save(user_info) {
    console.log("save called on", user_info)
    let file_data = JSON.stringify(user_info)
    fs.writeFileSync(account_file_path + user_info.username + '.json', file_data)
    return true
}





// test script
// console.log("create new account: " + create("testaccount", "z"))
// console.log("access with wrong password: " + access("testaccount",  "poop"))
// let test_user = access("testaccount", "z")
// console.log("access with correct password " + test_user)
// test_user.current_page_popular++;
// console.log(save(test_user))