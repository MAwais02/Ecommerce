import { selector } from "recoil";

import axios from "axios";
export const Userprofile = selector({
    key: "UserProfile",
    get: async () => {
        try {
            const data = await fetch('http://localhost:4000/api/v1/me')
                .then((response) => response.json());



            if (!data) {
                console.log("No data received");
                return {
                    data: null,
                    isaAuth: true,
                }
            }
            return {
                data,
                isaAuth: true,
            };
        }
        catch (error) {
            console.log("Error whilw loading information");
            throw error;
        }
    }
})