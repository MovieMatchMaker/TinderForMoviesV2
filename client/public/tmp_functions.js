function local_get_current_movie(token){
    const response = await fetch("/api/matching/get_current", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			token: localStorage.getItem("token"),
		}),
	});
}

function local_swipe_right(token){

}

function local_swipe_left(token){

}

function local_match(token){

}

function logout(token){

}