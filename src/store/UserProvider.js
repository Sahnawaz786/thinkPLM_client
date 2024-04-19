import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    
    const [choice,setChoice] = useState(false);
    const [showAlert,setShowAlert] = useState(false);

    return <UserContext.Provider value={{choice,setChoice,showAlert,setShowAlert}}>
        {children}
    </UserContext.Provider>
}

export { UserContext, UserProvider };