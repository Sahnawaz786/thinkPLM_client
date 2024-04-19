import { createContext, useState, useEffect } from 'react';

const PartsContext = createContext();

const PartsProvider = ({ children }) => {
    
    const [partsHistory,setPartsHistory] = useState({});

    return <PartsContext.Provider value={{partsHistory,setPartsHistory}}>
        {children}
    </PartsContext.Provider>
}

export { PartsContext, PartsProvider };