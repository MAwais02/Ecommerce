import { selector } from "recoil";

import axios from "axios";

import { atom } from "recoil";
export const Userprofile = atom({
    key:"UserProfile",
    default : {"avatar":{"public_id":"avatars/dzgslmqwy1eho2dbxcqh","url":"https://res.cloudinary.com/dnwkge8wr/image/upload/v1728043128/avatars/dzgslmqwy1eho2dbxcqh.png"},"_id":"66f81996b7c3163c0d8ef18b","name":"awais","email":"amir05@gmail.com","role":"admin","__v":0
},
})

export const UserInformation = selector({
    key: "UserInformation",
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
            console.log("Data is " + data);
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
