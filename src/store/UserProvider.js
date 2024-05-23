import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    
    const [choice,setChoice] = useState(false);
    const [showAlert,setShowAlert] = useState(false);

    const [showDeleteBomModal, setShowDeleteBomModal] = useState(false);

    const handleCloseDeleteBomModal = () => setShowDeleteBomModal(false);
    const handleShowDeleteBomModal = () => setShowDeleteBomModal(true);

    return <UserContext.Provider value={{choice,setChoice,showAlert,setShowAlert, handleCloseDeleteBomModal, handleShowDeleteBomModal, showDeleteBomModal, setShowDeleteBomModal}}>
        {children}
    </UserContext.Provider>
}

export { UserContext, UserProvider };