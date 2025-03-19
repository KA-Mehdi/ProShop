import asyncHandler from "express-async-handler";
// import User from '../model/UserModal.js';
import User from '../modals/userModal.js'

// auth user & get token
// GET /api/users/login
//public
const  authUser = asyncHandler(async( req, res) => {
    const { email, password} = req.body;

    const user = await User.findOne({ email})
    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(401)
        throw new Error('invalid email or password')
    }
    res.send('auth user')
})


// register a new user
// POST /api/users/
//public
const  registerUser = asyncHandler(async( req, res) => {
    res.send('register user')
})


// logout user & clear cookie
// POST /api/users/logout
//private
const  logoutUser = asyncHandler(async( req, res) => {
    res.send('logout user')
})    

// get user profile
// PUT /api/users/profile
// private
const  getUserProfile = asyncHandler(async( req, res) => {
    res.send('get user profil')
})    


// update user profile
// PUT /api/users/profile
// private
const  updateUserProfile = asyncHandler(async( req, res) => {
    res.send('update user profil')
})


// get all users
// GET /api/users
// private/admin
const  getUsers = asyncHandler(async( req, res) => {
    res.send('update user profil')
})


// delete users
// DELETE /api/users:id
// private/admin
const  deleteUser = asyncHandler(async( req, res) => {
    res.send('update user profil')
})


// Get users by iD
// get /api/users:id
// private/admin
const  getUserById = asyncHandler(async( req, res) => {
    res.send('update user profil')
})

// update user
// PUT /api/users:id
// private/admin
const  updateUser = asyncHandler(async( req, res) => {
    res.send('update user profil')
})



export {
    authUser, 
    registerUser,
    logoutUser, 
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}