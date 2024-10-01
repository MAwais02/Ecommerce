import { atom, selector } from "recoil";


export const fetchbackenddata = selector({
    key : "fetchdataselector",
    get : async ()=>{
        try{
            const response = await fetch('http://localhost:4000/api/v1/products');
            const data = await response.json();
            return data;

        }catch(error){
            throw error
        }
    }
})
// export backend single product data from backend api
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