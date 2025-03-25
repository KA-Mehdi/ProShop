import asyncHandler from "express-async-handler";
import Order from '../modals/orderModal.js'


// create new order
//route POST /api/orders
//private
const addOrderItems = asyncHandler(async(req, res) => {
        const {
            orderItems, 
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        } = req.body

        if (orderItems && orderItems.length === 0 ) {
            res.status(404)
            throw new Error('No Order items')
        } else {
            const order = new Order({
                orderItems,
                user: req.user._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            })
            const createOrder = await order.save()

            res.status(201).json(createOrder);
        }
})


// get logged in user orders
//route GET /api/orders/myorders
//private
const getMyOrders = asyncHandler(async(req, res) => {
        const orders = await Order.find( {user: req.user._id } )
        res.status(200).json(orders)
})

// get order bi id
//route GET /api/orders/:id
//private
const getOrderById = asyncHandler(async(req, res) => {
        const order = await Order.findById(req.params.id).populate('user', 'name email');

        if (order) {
            res.status(200).json(order)
        } else {
            res.status(404)
            throw new Error('Order no found')
        }
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