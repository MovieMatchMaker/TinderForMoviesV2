import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import login from "./routes/login.js";
import register from "./routes/register.js";
import save from "./middleware/save.js";
import _delete from "./routes/delete.js";
import { User } from "./models/user.js";
import headers from "./utils/setHeaders.js";
// import * as urh from "./backend/user_request_handler.js";
// import {
//       create_account,
//       get_current_movie,
//       swipe_right,
//       swipe_left,
//       logout,
//       get_previous_matches,
//       match
// } from "./backend/user_request_handler.js";

// `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
// Log the user in, and return a token
app.use('/api/login', login)
// Register a new user, save them to MongoDB, and return a token
app.use('/api/register', register)
// Save a new match the the database
app.use('/api/save_match', save)
// Delete all matches from the database
app.use('/api/delete_matches', _delete)
// Set the headers to allow CORS requests
app.use(headers);


app.get("/api", (req, res) => {
      axios
            .get(
                  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&origin_country=US`
            )
            .then((response) => {
                  let random = Math.floor(Math.random() * response.data.results.length);
                  res.send(response.data.results[random]);
            })
            .catch((err) => {
                  res.send(err);
            });
});

app.post("/api/get_movie", (req, res) => {
      let id = Math.floor(Math.random() * 100);
      axios
            .get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&origin_country=US`      
            )
            .then((response) => {
                  console.log(response.data.results[0]);
                  let random = Math.floor(Math.random() * response.data.results.length);
                  res.send(response.data.results[random]);
            })
            .catch((err) => {
                  res.send(err);
            });
}
);   

app.post("/api/matches", (req, res) => {
      // find the matches for the requested user in the user database schema
      const username = req.body.username;
      console.log(username);
      console.log(req.body);
      User.findOne({ username: username }, (err, user) => {
            if (err) {
                  console.trace(err);
            }
            if (user) {
                  console.trace(user);
                  res.send(user.matches);
            }
      });
      return true;
});











// creates an account and logs the user in
// app.post("/api/register", (req, res) => {

//       let username = req.body.username;
//       let password = req.body.password;

      

//       if (login_token !== null) {
//             res.send({
//                   message: `${username} is now signed up! Redirecting to Home..`,
//                   status: 1,
//                   login_token: login_token
//             });
//       } else {
//             res.send({
//                   message: "Failed to create account, username already exists",
//                   status: 0,
//                   login_token: null
//             });
//       }

// });


app.get("/", (req, res) => {
      res.send("Welcome.");
});

app.get("/matches", (req, res) => {
      res.send(matches);
});



const uri = process.env.URI;
mongoose
      .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB connection established..."))
      .catch((error) => console.error("MongoDB connection failed:", error.message));


const PORT = process.env.PORT;

app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
});