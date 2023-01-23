import {createContext, useContext, useEffect, useState} from "react";
import {useApi} from "./ApiProvider";

const DriversContext = createContext()

export default function DriversProvider({ children }) {
    const [drivers, setDrivers] = useState();
    const api = useApi();

    useEffect(() => {
        (async () => {
            const response = await api.get('/drivers');
            if (response.ok) {
                setDrivers(response.body);
            } else {
                setDrivers(null);
            }
        })();
    }, [api]);

    return (
        <DriversContext.Provider value={{ drivers, setDrivers }}>
            {children}
        </DriversContext.Provider>
    )
}

export function useDrivers() {
    return useContext(DriversContext);
}