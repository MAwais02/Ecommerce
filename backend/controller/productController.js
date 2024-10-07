const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");

const catchasyncError = require("../middleware/catchasyncError");
const ApiFeatures = require("../utils/APIFeatures");
// Create Product 

exports.createProduct = catchasyncError( async (req , res , next) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body);

    res.status(201).json({
        success : true,
        product
    })
    }

)
// Get all products Admin


exports.getAllProducts = catchasyncError( async (req , res)=> {

        const ProductsperPage = 8;
        const CountProduct = await Product.countDocuments();
        
        console.log("Hi there " + req.query.keyword);
        const apiFeatures = new ApiFeatures(Product.find() , req.query)
        .search()
        .filter()
        .pagaination(ProductsperPage);

        const products = await apiFeatures.query;
        res.status(200).json({
            success : true,
            products ,
            CountProduct ,
            ProductsperPage ,
        })
    }
)
// admin - update product
exports.UpdateProduct = catchasyncError(
    async (req , res , next) =>{

        let product = await Product.findById(req.params.id);
    
        if(!product){
            return next(new ErrorHandler("Product not found" , 404));
        }
    
        product = await Product.findByIdAndUpdate(req.params.id , req.body ,
            {
                new : true , 
                runValidators : true , 
                useFindAndModify : false
            }
        )
    
        res.status(200).json({
            success : true ,
            product ,
        })
    }
)
//Get product details
exports.GetProductDetails = catchasyncError(
    async (req , res , next) =>{
    let product = await Product.findById(req.params.id);
    
    if(!product){
        return next(new ErrorHandler("Product not found" , 404));
    }

    res.status(200).json({
        success : true,
        message : "Get all product",
        product,
    })
})

// delete product
exports.DeleteProduct = catchasyncError(
    async (req , res , next) => {
        let product = await Product.findById(req.params.id);
    
        if(!product){
            return res.status(500).json({
                success : false ,
                message : "Product not find",
            })
        }
        // Remove the product
    
        await Product.deleteOne({ _id: req.params.id });
    
        res.status(200).json({
            success : true,
            message : "Product deleted succesfully",
        })
    }
)



// create review or update the review
exports.CreateProductReview = catchasyncError(async (req, res , next)=>{

    const {rating , comment , productid} =  req.body;
    const review = {
        user : req.user._id,
        name : req.user.name,
        rating:Number(rating),
        Comment:comment,
    }

    const product = await Product.findById(productid);

    const isReviewed = product.reviews.find((rev)=>rev.user.toString() === req.user._id.tostring())
    if(isReviewed){
        product.reviews.forEach(rev =>{
            if(rev.user.toString() === req.user._id.tostring())
            {
                rev.rating = rating;
                rev.Comment=  comment;
            }
        })
    }
    else{
        product.reviews.push(review);
        product.numOfreviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach(rev =>{
        avg += rev.rating;
    }) 

    product.ratings = avg / product.reviews.length;

    await product.save({validateBeforeSave : false});

    res.status(200).json({
        success : true,
    })
})

exports.getAllProductReviews = catchasyncError(async (req ,res , next) =>{
    const product = await Product.findById(req.query.id);
    if(!product){
        return next(new ErrorHandler("Product not found") , 400);
    }
    res.status(200).json({
        success : true,
        reviews : product.reviews,
    })
})
// delete review

exports.DeleteProductReview = catchasyncError(async (req ,res , next) =>{
    const product = await Product.findById(req.query.productid);


    if(!product){
        return next(new ErrorHandler("Product not found") , 400);
    }
    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    console.log(reviews);
    let avg = 0;
    reviews.forEach((rev) =>{
        avg += rev.rating;
    }) 
    const ratings = (avg / reviews.length ) > 0 ? (avg / reviews.length ) : 0;
    const numOfReviews = reviews.length;
    await Product.findByIdAndUpdate(req.query.productid , {
        reviews: reviews,
        ratings : ratings,
        numOfreviews: numOfReviews,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })
    res.status(200).json({
        success : true,
    })
})