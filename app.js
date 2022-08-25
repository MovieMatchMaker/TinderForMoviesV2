import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import axios from "axios";
import mongoose from "mongoose";
const app = express();

app.use(cors());

app.use(express.json());


dotenv.config();

app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
      );
      next();
});


app.post("/api/login", (req, res) => {
      const user = JSON.stringify(req.body);
      const {
            username,
            password
      } = JSON.parse(user);

      const login_token = urh.login(username, password);
      if (login_token !== null) {
            let status = 1;
            res.send({
                  message: `Signed in as ${username}`,
                  status,
                  login_token
            });
      } else {
            let status = 0;
            res.send({
                  message: `Wrong username or password`,
                  status,
                  login_token
            });
      }
});


// creates an account and logs the user in
app.post("/api/signup", (req, res) => {

      let username = req.body.username;
      let password = req.body.password;

      

      if (login_token !== null) {
            res.send({
                  message: `${username} is now signed up! Redirecting to Home..`,
                  status: 1,
                  login_token: login_token
            });
      } else {
            res.send({
                  message: "Failed to create account, username already exists",
                  status: 0,
                  login_token: null
            });
      }

});


const PORT = process.env.PORT;

app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
});