import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from '../modals/userModal.js'

const protect = AsyncHandler(async (req, res, next) => {
    let token;

    //read the jwt from the cookie
    token = req.cookies.jwt

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('not authorized, token failed')    
        }

    } else {
        res.status(401)
        throw new Error('not authorized, no token')
    }
})


const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('not authorized as admin')
    }
}


export {protect, admin};