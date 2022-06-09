import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import * as urh from "./backend/user_request_handler.js";


const app = express();

app.use(cors());

app.use(express.json());

dotenv.config();

mongoose
      .connect(
            "mongodb+srv://nyumat:tomtom123@tfm.irugf.mongodb.net/?retryWrites=true&w=majority", {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
            }
      )
      .then(() => {
            console.log("Connected to database!");
      })
      .catch(() => {
            console.log("Connection failed!");
      });

const userSchema = new mongoose.Schema({
      username: String,
      password: String,
});

const User = new mongoose.model("User", userSchema);

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
      const login_token = urh.login(username,password);
      console.log(login_token);
      if (login_token === 0) {
            res.send({meessage: `${username} is now signed in!`}).status(200);
      } else {
            res.send({message: `Wrong username or password!`}).status(401);
      }
});
      // User.findOne({
      //             username: username,
      //       },
      //       (err, user) => {
      //             if (user) {
      //                   if (user.password === password) {
      //                         res.send({
      //                               message: `${user.username} Is Now Signed In!`,
      //                               user: user,
      //                         });
      //                   } else {
      //                         res.send({
      //                               message: "Password is Incorrect!",
      //                         }).status(401);
      //                         return;
      //                   }
      //             } else {
      //                   res.send({
      //                         message: "Account not Found!",
      //                   }).status(404);
      //                   return;
      //             }

      //             if (err) {
      //                   console.log(err);
      //             }
      //       }
      // );

app.post("/api/signup", (req, res) => {
      const {
            username,
            password
      } = req.body;
      User.findOne({
                  username: username,
            },
            (err, user) => {
                  if (user) {
                        res.send({
                              message: `The username ${username} already exists!`,
                        });
                        return;
                  } else {
                        if (username.length <= 2 || password.length <= 2) {
                              res.send({
                                    message: "Please fill out all fields!",
                              }).status(401);
                              return;
                        }
                        const user = new User({
                              username: username,
                              password: password,
                        });
                        user.save()
                              .then(() => {
                                    res.send({
                                          message: `${user.username} Signed up!`,
                                    });
                              })
                              .catch((err) => {
                                    res.send({
                                          message: `${user.username} Failed to sign up!`,
                                    });
                                    return;
                              });
                  }
            }
      );
});

// if (process.env.NODE_ENV === "production") {
//       app.use(express.static("client/public"));
//       import path from "path";
//       app.get("*", (req, res) => {
//             res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
//       });
// }

const PORT = process.env.PORT;

app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
});