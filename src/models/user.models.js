import mongoose, { Schema } from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"

// https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj    model linked

export const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    fullname: {
      type: String,
      required: true, 
      trim: true,
      index: true, //it very expanse to used so used it carefullly 
    },
    avatar: {
      type: String, //cloudary url
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    watchHistory: [
      {
         type: Schema.Types.ObjectId,
         ref: "Video",
      }
    ]
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
   if(!this.isModified("password")) return next();

   this.password = bcrypt.hash(this.password, 10)
   next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
   return Jwt.sign(
      {
         _id: this._id,
         email: this.email,
         username: this,username,
         fullname: this.fullname,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPITY,
      }
   )
}
userSchema.methods.generateRefreshToken = function () {
   return Jwt.sign(
      {
         _id: this._id,
         email: this.email,
         username: this,username,
         fullname: this.fullname,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPITY,
      }
   )
}

export const User = mongoose.model("User", userSchema);
