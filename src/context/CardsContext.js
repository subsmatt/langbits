import { createContext } from "react";

const CardsContext = createContext({
    cardsData: [],
    cardsDataError: "",
    cardAttributesData: [],
    cardAttributesDataError: "",
    cardChangeLogsData: [],
    cardChangeLogsDataError: "",
    tagsData: [],
    tagsDataError: "",
    tagOnCardData: [],
    tagOnCardDataError: "",
    createCard: () => {},
    updateCard: () => {},
    deleteCard: () => {}
});

function CardsProvider({children, value}){
    return (
        <CardsContext.Provider value={value}>
            {children}
        </CardsContext.Provider>
    );
}

export {CardsContext, CardsProvider};