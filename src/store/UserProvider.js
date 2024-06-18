import { createContext, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    
    const [choice, setChoice] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [searchData, setSearchData] = useState([]);

    const [showDeleteBomModal, setShowDeleteBomModal] = useState(false);

    const handleCloseDeleteBomModal = () => setShowDeleteBomModal(false);
    const handleShowDeleteBomModal = () => setShowDeleteBomModal(true);

    return <UserContext.Provider value={{choice,setChoice,showAlert,setShowAlert, handleCloseDeleteBomModal, handleShowDeleteBomModal, showDeleteBomModal, setShowDeleteBomModal,searchData,setSearchData}}>
        {children}
    </UserContext.Provider>
}

export { UserContext, UserProvider };
