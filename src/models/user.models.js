import mongoose, { Schema } from "mongoose";
import  Jwt  from "jsonwebtoken";
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
      index: true, //index help in searching
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
      required: [true,"password is required"],
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


//it run just before data saved. it should be normal fuction 
//not arow function. it takes to execute so make it async
userSchema.pre("save", async function (next) {
   if(!this.isModified("password")) return next();

   this.password = bcrypt.hash(this.password, 10)
   next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password)
}
//-----------x---------------x--------------------x---------------

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
         expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
   )
}
userSchema.methods.generateRefreshToken = function () {
   return Jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
   )
} 

export const User = mongoose.model("User", userSchema); 
