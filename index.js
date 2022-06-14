import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import * as urh from "./backend/user_request_handler.js";
import {create_account, get_current_movie, swipe_right} from "./backend/user_request_handler.js";

const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();

app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
});

app.get("/api", (req, res) => {
      axios
            .get(
                  `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&origin_country=US`
            )
            .then((response) => {
                  res.send(response.data);
            })
            .catch((err) => {
                  res.send(err);
            });
});

app.get("/api/matches", (req, res) => {
      axios
            .get(
                  `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1&origin_country=US`
            )
            .then((response) => {
                  res.send(response.data);
            })
            .catch((err) => {
                  res.send(err);
            });
});

app.post("/api/login", (req, res) => {
      const user = JSON.stringify(req.body);
      const {
            username,
            password
      } = JSON.parse(user);

      const login_token = urh.login(username, password);
      console.log(login_token);
      console.log(username,password);
      if (login_token !== null) {
            let status = 1;
            res.send({message: `Signed in as ${username}`, status, login_token});
      } else {
            let status = 0;
            res.send({message: `Wrong username or password`, status, login_token});
      }
});

// creates an account and logs the user in
app.post("/api/signup", (req, res) => {

      let username = req.body.username;
      let password = req.body.password;

      let login_token = urh.create_account(username, password);

      // this is null if username or password is incorrect <<OR>> an integer >= 1 if the create account is complete
      if (login_token !== null) {
            res.send({message: `${username} is now signed up! Redirecting to Home..`, status: 1, login_token: login_token});
      } else {
            res.send({message: "Failed to create account, username already exists", status: 0, login_token: null});
      }

});

// tells the server that the user has matched and would like to see the viewing options for the previously served movie
app.post("/api/matching/match", (req, res) => {

      let login_token = null;
      let data;
      // this is null if login_token is invalid <<OR>> a movie providers object with the viewing options
      //let prov_ops = match(login_token);

      let singleMovie = `https://api.themoviedb.org/3/movie/526896/watch/providers?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`;
      axios.get(singleMovie).then((response) => {
            res.send({
                  message: "You have successfully matched with a movie provider!",
                  status: 1,
                  login_token: login_token,
                  data: response.data
            });
      }
      ).catch((err) => {
            res.send(err);
            res.send({
                  message: "You have not matched with a movie provider!",
                  status: 0,
                  login_token: null
            });
      }
      );
      


});

// tells the server that the user would like to see the next movie
app.post("/api/matching/get_current", async (req, res) => {

      let login_token = req.body.token;
      login_token = parseInt(login_token);
      // this is null if login_token is invalid <<OR>> a movie object with the data of the next movie to be rated
      let next_movie_to_view = await get_current_movie(login_token)
      if (!next_movie_to_view) {
            res.send({
                  message: `Error: You have been logged out.`,
                  status: 0,
            }).status(401);
      } else {
            res.send({
                  message: `Grabbing next movie....`,
                  status: 1,
                  current_movie: next_movie_to_view
            }).status(200);
      }
});

app.post("/api/matching/swipe_left", async (req, res) => {

      let login_token = req.body.token;
      login_token = parseInt(login_token);
      // this is null if login_token is invalid <<OR>> a movie object with the data of the next movie to be rated
      let next_movie_to_view = await swipe_left(login_token)
      if (!next_movie_to_view) {
            res.send({
                  message: `Error: You have been logged out.`,
                  status: 0,
            }).status(401);
      } else {
            res.send({
                  message: `Grabbing next movie....`,
                  status: 1,
                  current_movie: next_movie_to_view
            }).status(200);
      }
});

app.post("/api/matching/swipe_right", async (req, res) => {

      let login_token = req.body.token;
      login_token = parseInt(login_token);
      // this is null if login_token is invalid <<OR>> a movie object with the data of the next movie to be rated
      let next_movie_to_view = await swipe_right(login_token)
      if (!next_movie_to_view) {
            res.send({
                  message: `Error: You have been logged out.`,
                  status: 0,
            }).status(401);
      } else {
            res.send({
                  message: `Grabbing next movie....`,
                  status: 1,
                  current_movie: next_movie_to_view
            }).status(200);
      }
});


app.post("/api/logout", (req, res) => {

      let login_token = req.body.token;
      //await logout(login_token);
      res.send({
            message: "You have been logged out!"
      }).status(200);
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
});