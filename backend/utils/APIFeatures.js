class ApiFeatures {
    constructor(query , queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }
    search()
    {

        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : "i",
            }
        } :
        {};

        this.query = this.query.find({...keyword}); 

        return this;
    }
    filter() // apply filter on catagory 
    {
        const queryCopy = {...this.queryStr} //<- this will give value  // this is refernece in JS this.query

        // remove some fields

        console.log(queryCopy);
        
        const RemoveFields = ["keyword" , "page" , "limit"]; 
        RemoveFields.forEach(key=>delete queryCopy[key]);

        console.log(queryCopy);
         
        let queryStr = JSON.stringify(queryCopy);

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        console.log(queryStr);
        
        return this;
    }
    pagaination(ProductsPerpage)
    {
        const currentpage = Number(this.queryStr.page) || 1;
        const skip = ProductsPerpage * (currentpage - 1);

        this.query = this.query.limit(ProductsPerpage).skip(skip);

        return this;


    }
}

module.exports = ApiFeatures