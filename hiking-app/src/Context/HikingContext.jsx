import { createContext, useContext, useState } from "react";
import { createHikingRequest, getHikingsRequest } from "../api/hikings";

const HikingContext = createContext();

export const useHikings = () => {
    const context = useContext(HikingContext);
    if (!context) {
        throw new Error("useHikings must be used within a HikingProvider")
    }

    return context;
}

export function HikingProvider({ children }) {
    const [ hinkings, setHikings ] = useState([]);

    const getHikingPlaces = async () => {
        try {
            const res = await getHikingsRequest();
            setHikings(res.data);
        } catch (error) {
            console.error(error);
        }
       
    }

    const createHiking = async (hiking) => {
        const res = await createHikingRequest(hiking)
        console.log(res);
    }

    return (
        <HikingContext.Provider 
        value={{
            hinkings,
            createHiking,
            getHikingPlaces,
        }}
        >
            {children}
        </HikingContext.Provider>
    );
}