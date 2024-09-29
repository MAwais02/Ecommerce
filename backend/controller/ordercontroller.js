const Order  =  require("../models/ordermodels");

const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");

const catchasyncError = require("../middleware/catchasyncError");


exports.newOrder = catchasyncError(async (req , res , next)=>{
    const {
        shippinginfo,
        orderitems,
        paymentinfo,
        itemsprice,
        taxprice,
        shippingprice,
        totalprice
    } = req.body;

    const order = await Order.create({
        shippinginfo,
        orderitems,
        paymentinfo,
        itemsprice,
        taxprice,
        shippingprice,
        totalprice,
        paidat:Date.now(),
        user:req.user.id // if user is loogin
    })


    res.status(201).json({
        success : true,
        order,
    })
})
// get login userorder
exports.getSingleOrder = catchasyncError(async (req , res , next)=>{
    const order = await Order.findById(req.params.id).populate("user" , "name email");
    if(!order){
        return next(new ErrorHandler("Order not found with this id" , 404));

    }

    res.status(200).json({
        success : true,
        order,
    })
})
exports.myorder = catchasyncError(async (req , res , next)=>{
    const order = await Order.find({user : req.user._id});

    res.status(200).json({
        success : true,
        order,
    })
})
// get all orders --Admin
exports.getallorder = catchasyncError(async (req , res , next)=>{
    const order = await Order.find();

    let totalamount=  0;
    order.forEach(order=>{
        totalamount+= order.totalprice;
    })

    res.status(200).json({
        success : true,
        totalamount,
        order,
    })
})
// update orders --Admin
exports.updateorder = catchasyncError(async (req , res , next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("No order with that id exist" , 404))
    }
    if(order.orderstatus === "Delivered"){
        return next(new ErrorHandler("You have already dileverd this order" , 404))
    }
    order.orderitems.forEach(async (oorder)=>{
        await updatestock(oorder.product , oorder.quantity);
    })

    order.orderstatus = req.body.status;
    
    if(req.body.status === "Delivered"){
        order.deliveredat = Date.now();
    }
    
    await order.save({validateBeforeSave : false})
    res.status(200).json({
        success : true,
    })
})
async function updatestock(id , quantity){
    const product = await Product.findById(id);

    product.stock -= quantity;

    product.save({validateBeforeSave : false});
}

// Delete orders --Admin
// Delete orders -- Admin
exports.removeOrder = catchasyncError(async (req, res, next) => {
    // Find the order by its ID and delete it
    const order = await Order.findByIdAndDelete(req.params.id);

    // If the order doesn't exist, send a 404 error
    if (!order) {
        return res.status(404).json({
            success: false,
            message: "Order not found"
        });
    }

    // Respond with success after deletion
    res.status(200).json({
        success: true,
        message: "Order has been deleted"
    });
});
