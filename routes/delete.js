import { User } from "../models/user.js";
import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
      const username = req.body.username;
      let match = [];
      User.findOne({
            username: username
      }, (err, user) => {
            if (err) {console.log(err);}
            if (user) {
                  user.matches = [];
                  user.save();
            } else {
                  console.log("No matches to delete");
            }
            
      });
      res.send(match);
});

export default router;