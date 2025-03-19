import asyncHandler from "express-async-handler";
import User from '../modals/userModal.js'
import jwt from 'jsonwebtoken'
// auth user & get token
// GET /api/users/login
//public
const  authUser = asyncHandler(async( req, res) => {
    const { email, password} = req.body;

    const user = await User.findOne({ email})
    
    if (user && (await user.matchPassword(password))) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        })
        //set jwt as http-only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })



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
    res.cookie('jwt', '', {
        httpOnly:true,
        expires: new Date(0)
    });

    res.status(200).json({message: 'logged out successfully'})
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