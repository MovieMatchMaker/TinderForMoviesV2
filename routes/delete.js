import { User } from "../models/user.js";
import { Router } from "express";
const router = Router();

router.post("/", async (req, res) => {
      // using a try catch block, deletee all matches for the user in monogdb
      let username = req.body.username;
      try {
            User.findOneAndUpdate({ username: username }, { $set: { matches: [Array] } }).exec();
            User.save();
            res.send("Successfully deleted all matches for user");
      } catch (error) {
            res.send(error);
      }
});

export default router;