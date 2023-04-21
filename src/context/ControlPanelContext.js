import { createContext } from "react";

const ControlPanelContext = createContext({
    searchQuery: "",
    setSearchQuery: () => {},
});

function ControlPanelProvider({children, value}){
    return (
        <ControlPanelContext.Provider value={value}>
            {children}
        </ControlPanelContext.Provider>
    );
}

export {ControlPanelContext, ControlPanelProvider};