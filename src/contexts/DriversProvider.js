import {createContext, useContext, useEffect, useState} from "react";
import {useApi} from "./ApiProvider";

const DriversContext = createContext()

export default function DriversProvider({ children }) {
    const [driversAll, setDriversAll] = useState();
    const api = useApi();

    useEffect(() => {
        (async () => {
            const response = await api.get('/drivers');
            if (response.ok) {
                setDriversAll(response.body);
            } else {
                setDriversAll(null);
            }
        })();
    }, [api]);

    return (
        <DriversContext.Provider value={{ driversAll, setDriversAll }}>
            {children}
        </DriversContext.Provider>
    )
}

export function useDrivers() {
    return useContext(DriversContext);
}