import { createContext, useState, useEffect } from 'react';

const DocsContext = createContext();

const DocsProvider = ({ children }) => {
    
    const [type,setType] = useState('hello');
    
    return <DocsContext.Provider value={{type,setType}}>
        {children}
    </DocsContext.Provider>
}

export { DocsContext, DocsProvider };