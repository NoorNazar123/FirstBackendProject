import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";

import { ApiResponse }  from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend name password email check userShema
  //validation, - not empty
  //check if user already exit with username, email
  //check image or avatar
  //uplord them to cloudunary, avatar
  //create user object-- create entry in db
  //remove password and refresh token from response
  //check for user creation
  //return message if user created or error if not

  //gt data.Data usally come from from , json- use (req.body) and for url (leanr later)
  const { username, email, fullname, password } = req.body;

  if (
    [fullname, email,username, password].some( (field) => field?.trim() === "" )
   ) 
   {
    throw new ApiError(400, "full name is required"); 
  }

  const existedUser = User.findOne({
   $or: [{ username }, { email }] 
})

if( existedUser ){
   throw new ApiError(409, "User already Existed...")
}

const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;

if (!avatarLocalPath){
   throw new ApiError(400, "Avatar file is required");
}

const avatar = await uploadOnCloudinary(avatarLocalPath);

const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if(!avatar){
   throw new ApiError("4001", "avatar is required")
}

const user = await User.create({
   fullname,
   avatar: avatar.url,
   coverImage: coverImage?.url || "",
   email,
   username: username.toLowerCase(),
   password,
})
const createdUser = await User.findById(user._id).select(
   "-password - refreshToken"
)

if(!createdUser){
   throw new ApiError("500", "something went wrong user did not register")
}

return res.status(201).json(
   new ApiResponse(200, createdUser, "User register successfully!") 
)





});



export { registerUser };
