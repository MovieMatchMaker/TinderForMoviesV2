import React from "react";
import { Link } from "react-router-dom";

function FourOhFour() {
	return (
		<div>
			<br></br>
			<br></br>
			<h1 style={{ color: "lightgreen" }}>
				Sorry, but the page you were trying to view does not exist.
			</h1>
			<h1 style={{ color: "lightgreen" }}>
				It looks like this was the result of either:
			</h1>
			<ul>
				<h2>A mistyped address</h2>
				<h2>Or an out-of-date link</h2>
			</ul>
			<h2 style={{ color: "lightgreen" }}>
				Please try one of the following:
			</h2>
			<ul>
				<h2>Clicking the home button on the navbar</h2>
				<h2>
					Going back to the{" "}
					<Link to='/signup' style={{ color: "lightgreen" }}>
						signup page{" "}
					</Link>
					and creating an account
				</h2>
			</ul>
		</div>
	);
}

export default FourOhFour;
