import { createContext, useState } from "react";

const PartsContext = createContext();

const PartsProvider = ({ children }) => {
  const [partsHistory, setPartsHistory] = useState({});
  const [initialBomData, setInitaialBomData] = useState({});
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
        setInitaialBomData,
        bomIds,
        setBomIds,
      }}
    >
      {children}
    </PartsContext.Provider>
  );
};

export { PartsContext, PartsProvider };

