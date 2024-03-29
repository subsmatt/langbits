import { createContext } from "react";

const CardModalContext = createContext({
    modalShow: false,
    setModalShow: () => {},
    modalCardId: 0,
    setModalCardId: () => {},
    modalCardWord: "",
    setModalCardWord: () => {},
    modalCardDesc: "",
    setModalCardDesc: () => {},
    modalCardWordType: "",
    setModalCardWordType: () => {},
    tagNamesNewValue: "", 
    setTagNamesNewValue: () => {},
    modalCardTagIds: [], 
    setModalCardTagIds: () => {}
});

function CardModalProvider({children, value}){
    return (
        <CardModalContext.Provider value={value}>
            {children}
        </CardModalContext.Provider>
    );
}

export {CardModalContext, CardModalProvider};