import axios from "axios";
import { selector } from "recoil";
import { recoilPersist } from 'recoil-persist'; // for localStorage or sessionStorage persistence

const { persistAtom } = recoilPersist();

export const MyOrders = selector({
    key: "MyOrders",
    get: async () => {
        try {
            const response = await axios.post(
                `http://localhost:4000/api/v1/orders/me`,
                {},
                {
                    withCredentials: true, // This ensures cookies are sent with the request
                }
            );

            const data = response.data; // Axios parses the JSON response for us
            console.log("Data is", data);
            return data;
        } catch (error) {
            console.error("Error fetching orders:", error);
            throw error; // Re-throw the error so it can be handled in the component
        }
    },
    effects: [persistAtom], // Persist state using recoilPersist (optional)
});