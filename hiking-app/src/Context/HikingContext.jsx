import { createContext, useContext, useState } from "react";
import { createHikingRequest, getHikingsRequest, deleteHikingsRequest, getHikingByNameRequest } from "../api/hikings";

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
        const res = await createHikingRequest(hiking);
        console.log(res);
    }

    const deleteHiking = async (id) => {
        try {
        const res = await deleteHikingsRequest(id);
        if (res.status = 204) setHikings(hinkings.filter(hiking => hiking.id != id));
            
        } catch (error) {
        console.log(error);
            
        }
    }

    const getHikingByName = async (name) => {
        const res = await getHikingByNameRequest(name); // Suponiendo que esta función obtiene todos los datos
        if (res.status = 200) setHikings(hinkings.filter(hiking => hiking.name.toLowerCase().includes(name.toLowerCase())));

        // const filteredHikes = hinkings.filter(hiking => hiking.name.toLowerCase().includes(name.toLowerCase()));
        // setHikings(res)
    };
    
    // const getHikingByName = async (name) => {
    //         const res = await getHikingByNameRequest(name);
    //         console.log(res);

    // }

    return (
        <HikingContext.Provider 
        value={{
            hinkings,
            createHiking,
            getHikingPlaces,
            deleteHiking,
            getHikingByName,
        }}
        >
            {children}
        </HikingContext.Provider>
    );
}