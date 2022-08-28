import { User } from "../models/user.js";
import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
      const username = req.body.username;
      const newEntry = req.body.match;
      let match = [];
      console.log(req.body);
      User.findOne({
            username: username
      }, (err, user) => {
            if (err) {console.log(err);}
            if (user) {
                  user.matches.push(newEntry);
                  user.matches = match;
                  user.save();
                  console.log("match saved");
            }
      });
      res.send(match);
});

export default router;