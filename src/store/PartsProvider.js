import { createContext, useState } from "react";

const PartsContext = createContext();

const PartsProvider = ({ children }) => {
  const [partsHistory, setPartsHistory] = useState({});
  const [initialBomData, setInitialBomData] = useState({
    topLevelParentId: '',
    partDetailsList: []
  });
  const [selectedData, setSelectedData] = useState({});
  const [bomIds, setBomIds] = useState({
    parentId: "",
    childId: "",
  });

  return (
    <PartsContext.Provider
      value={{
        partsHistory,
        setPartsHistory,
        initialBomData,
        setInitialBomData,
        bomIds,
        setBomIds,
        setSelectedData,
        selectedData
      }}
    >
      {children}
    </PartsContext.Provider>
  );
};

export { PartsContext, PartsProvider };

