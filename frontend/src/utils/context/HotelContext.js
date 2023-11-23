import React, { createContext, useState, useEffect } from 'react';
import { getAllHotels } from "../../services/HotelService/hotelService";

export const HotelContext = createContext({
    hotels: [],
    addHotel: () => {},
});

export const useHotels = () => {
    const context = React.useContext(HotelContext);
    if (context === undefined) {
        throw new Error('useHotels must be used within a HotelProvider');
    }
    return context;
};

export const HotelProvider = ({ children }) => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        async function fetchHotels() {
            try {
                const hotelsData = await getAllHotels();
                setHotels(hotelsData);
            } catch (error) {
                console.error("Failed to fetch hotels:", error);
            }
        }
        fetchHotels();
    }, []);

    const addHotel = (newHotel) => {
        setHotels((prevHotels) => [...prevHotels, newHotel]);
    };

    return (
        <HotelContext.Provider value={{ hotels, addHotel }}>
            {children}
        </HotelContext.Provider>
    );
};
