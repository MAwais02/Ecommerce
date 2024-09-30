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

        if(!id){
            return null;
        }
        try
        {
            const response = await fetch(`http://localhost:4000/api/v1/product/${id}`);
            const data = await response.json();
            return data;
        }
        catch(error){
            throw error
        }
    }
})