import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import axios from "axios";
import bcrypt from "bcrypt";
import passport from "passport";
import flash from "express-flash"
import session from "express-session"

import * as pp from "./backend/passport_config.js";
import * as urh from "./backend/user_request_handler.js";

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash())
app.use(session({
      secret: "test secret", // process.env.SESSION_SECRET
      resave: false,
      saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

dotenv.config();

pp.initialize(
      passport, 
      email => urh.get_user_by_username(email)
)

app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
});

app.post("/api/signup/", async (req, res) => {
      try {
            const hashed_password = await bcrypt.hash(req.body.password, 10)
            if (!urh.create_account(req.body.username, hashed_password)){
                  res.send({
                        message: "Failed to create account, username already exists", 
                        status: 0
                  });
            }
            res.send({message: `Now signed up! Redirecting to Login`, status: 1 })

      } catch (err) {
            console.trace(err);
            res.send({
                  message: "Server error", 
                  status: 0
            }).status(500)
      }
});

app.post("/api/login", passport.authenticate('local'), (req, res) =>{
      res.redirect('/swipe')
});

app.get("api/matching/get_current", checkAuthenticated,(req, res) => {
      try{
            let next_movie_to_view = await urh.get_current_movie(req.user);
            res.send({
                  message: `Grabbing next movie....`,
                  status: 1,
                  current_movie: next_movie_to_view
            }).status(200);
      } catch(e) {
            console.log(e);
            res.send({
                  message: "Server error", 
                  status: 0
            }).status(500)
      }
})

app.get("/api/matching/swipe_left", checkAuthenticated, async (req, res) => {
      try{
            let next_movie_to_view = await urh.swipe_left(req.user)
            res.send({
                  message: `Grabbing next movie....`,
                  status: 1,
                  current_movie: next_movie_to_view
            }).status(200);
      } catch(e) {
            res.send({
                  message: "Server error", 
                  status: 0
            }).status(500)
      }
})

app.get("/api/matching/swipe_right", checkAuthenticated, async (req, res) => {
      try{
            let next_movie_to_view = await urh.swipe_right(req.user)
            res.send({
                  message: `Grabbing next movie....`,
                  status: 1,
                  current_movie: next_movie_to_view
            }).status(200);
      } catch(e) {
            res.send({
                  message: "Server error", 
                  status: 0
            }).status(500)
      }
})

app.get("/api/previous_matches", checkAuthenticated, async(req, res) => {
      try{
            let prev_matches = await urh.get_previous_matches(req.user)
            res.send({
                  message: `Grabbing next movie....`,
                  status: 1,
                  previous_matches: prev_matches
            }).status(200);
      } catch(e) {
            res.send({
                  message: "Server error", 
                  status: 0
            }).status(500)
      }
})

app.post("/api/matching/match", checkAuthenticated, async (req, res) => {
      try{
            let prov_ops = await match(req.user)
            res.send({
                  message: "You have matched!",
                  status: 1,
                  providers: prov_ops.US
            }).status(200)
      } catch(e) {
            res.send({
                  message: "Server error", 
                  status: 0
            }).status(500)
      }
})

// TO DO
// app.post("/api/logout", authenticateUser(req, res) => {
      
      
// });


function checkAuthenticated(req, res, next){
      console.log(`Req: \n Res: ${JSON.stringify(res)}`)
      if(req.isAuthenticated()){
            console.log("Authed")
            return next()
      }
      console.log("Not authed")
      res.send({
            message: `You have been logged out.`,
            status: 0,
      }).status(401);
      
}





const PORT = process.env.PORT;

app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
});