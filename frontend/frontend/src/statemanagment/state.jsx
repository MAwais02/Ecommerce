import { atom, selector } from "recoil";

/////////////-----------Getting All product state---------------/////////////

export const Ratings = atom({
    key : "Ratings",
    default : 0,
})
export const Category = atom({
    key : "Category",
    default : "",
})
export const ProductKeyword = atom(
    {
        key : "Keyword",
        default : "",
    }
)
export const PriceAtom = atom(
    {
        key : "price",
        default : [0 , 25000],
    }
)
export const Page = atom(
    {
        key : "page",
        default : 1,
    }
)
export const fetchbackenddata = selector({
    key : "fetchdataselector",
    get : async ({get})=>{
        try{
            const keyword = get(ProductKeyword);
            const page = get(Page);
            const price = get(PriceAtom);
            const cat = get(Category);
            const ratings = get(Ratings);
            let response;
            
            if(cat != ""){
                response = await fetch(`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${cat}&ratings[gte]=${ratings}`);
            }
            else{
                response = await fetch(`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`)
            }
            const data = await response.json();
            console.log("Data is " + data);
            return data;
            
        }
        catch(error){
            throw error;
        }
    }
})
//////////////////////------Getting single product details----------------------////
export const productIDAtom = atom(
    {
        key : "productid",
        default : null,
    }
)
export const fetchsingledataproduct = selector({
    key : "fetchsingledataproduct",
    get : async ( { get } )=>{
        const id = get(productIDAtom);
        console.log("Came into the fetch data state" + id);
        if(!id){
            return null;
        }
        try
        {
            console.log("came here");
            const response = await fetch(`http://localhost:4000/api/v1/product/${id}`);
            const data = await response.json();
            console.log(data.product);
            return data;
        }
        catch(error){
            console.log("Error while fetching the data");
            throw error
        }
    }
})
////////////-----------Product Keyword State---------------------
export const GetProductWithKeywordSearch = selector({
    key : "keywordsearch",
    get : async ({get})=>{
        try{
            const keyword = get(ProductKeyword);
            const page = get(Page);
            if(!keyword)
            {
                throw "Keyboard is not defined";
            }
            else
            {

                console.log("Keyword search in async " + keyword);
                console.log(`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${page}`);

                const response = await fetch(`http://localhost:4000/api/v1/products?keyword=${keyword}&page=${page}`)
                const data = await response.json();
                console.log("Data is getproduct" + JSON.stringify(data));
                return data;
            }
        }
        catch(error){
            throw error;
        }
    }
})
///////////////////LOAD USER//////////////////////
export const LoadUser = selector({
    key  : "Loaduser",
    get: async ({get})=>{
        try{
            const {data} = await axios.get('http://localhost:4000/api/v1/me');
        }
        catch{
            
        }
    }
})