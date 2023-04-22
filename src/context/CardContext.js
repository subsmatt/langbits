import { createContext } from "react";

const CardContext = createContext();

function CardProvider({children, rec, updateRecord, insertRecord, deleteRecord}){
    return (
        <CardContext.Provider value={{rec, updateRecord, insertRecord, deleteRecord}}>
            {children}
        </CardContext.Provider>
    );
}

export {CardContext, CardProvider};