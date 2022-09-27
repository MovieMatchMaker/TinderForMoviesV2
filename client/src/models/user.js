import mongoose from "mongoose";
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
      seen: []
});

const User = mongoose.model("User", userSchema);
const MovieMatchMakerUserSchema = User;
export {MovieMatchMakerUserSchema as User};
