import asyncHandler from "express-async-handler";
import Order from '../modals/orderModal.js'


// create new order
//route POST /api/orders
//private
const addOrderItems = asyncHandler(async(req, res) => {
        res.json('add order Items');
})


// get logged in user orders
//route GET /api/orders/myorders
//private
const getMyOrders = asyncHandler(async(req, res) => {
        res.json('get my order');
})

// get order bi id
//route GET /api/orders/:id
//private
const getOrderById = asyncHandler(async(req, res) => {
        res.json('get my  order by id');
})


// update order to paid
//route GET /api/orders/:id/pay
//private
const updateOrderToPaid = asyncHandler(async(req, res) => {
    res.json('update order to paid');
})

// update order to delivered
//route GET /api/orders/:id/deliver
//private /admin
const updateOrderToDelivered = asyncHandler(async(req, res) => {
    res.json('update order to delivered');
})



// get all orders
//route GET /api/orders/
//private/admin
const getAllOrders = asyncHandler(async(req, res) => {
    res.json('get all orders ');
})


export {
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getAllOrders
}