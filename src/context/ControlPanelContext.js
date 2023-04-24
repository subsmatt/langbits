import { createContext } from "react";

const ControlPanelContext = createContext({
    searchQuery: "",
    setSearchQuery: () => {},
    searchType: "",
    setSearchType: () => {},
});

function ControlPanelProvider({children, value}){
    return (
        <ControlPanelContext.Provider value={value}>
            {children}
        </ControlPanelContext.Provider>
    );
}

export {ControlPanelContext, ControlPanelProvider};