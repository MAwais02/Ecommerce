import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'; // localStoarage session 

const { persistAtom } = recoilPersist();


export const Cart = atom({
    key:"Cart",
    default: [],
});

export const CartProductID = atom({
    key:"CartProductID",
    default: "",
});
export const CartQuantity = atom({
    key :"CartQuantity",
    default : 0,
})
export const shippingInfoState = atom({
    key: 'shippingInfoState',
    default: {
        address: '',
        city: '',
        state: '',
        country: '',
        phonenumber: '',
        pincode: '',
    }
});
export const AddItemsToCart = atom({
    key : "AddItemsToCart",
    get : async ( { get } )=>{
        const id = get(CartProductID);
        const quantity = get(CartQuantity);
        if(!id){
            return {data : null};
        }
        try
        {
            const response = await fetch(`http://localhost:4000/api/v1/product/${id}`);
            const data = await response.json();
            console.log(data.product);
            return {
                product : data.product._id,
                name : data.product.name,
                price : data.product.price,
                image : data.product.images[0].url,
                stock: data.product.stock,
                quantity,
            }
            
        }
        catch(error){
            console.log("Error while fetching the data");
            throw error
        }
    },

    effects: [persistAtom],
    }
);