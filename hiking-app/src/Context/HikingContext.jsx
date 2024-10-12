import { createContext, useContext, useState } from "react";
import { createHikingRequest } from "../api/hikings";

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

    const createHiking = async (hiking) => {
        const res = await createHikingRequest(hiking)
        console.log(res);
    }

    return (
        <HikingContext.Provider 
        value={{
            hinkings,
            createHiking,
        }}
        >
            {children}
        </HikingContext.Provider>
    );
}