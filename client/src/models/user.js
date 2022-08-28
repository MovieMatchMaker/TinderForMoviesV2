import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
      matches: [],
      username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 200,
            unique: true,
      },
      password: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 1024
      },
});

const User = mongoose.model("User", userSchema);

const _User = User;
export {
      _User as User
};
