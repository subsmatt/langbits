import Menu from "./Menu";
import CardList from "./CardList";
import CardChangeLogs from "./CardChangeLogs";
import useCardModal from "../hooks/useCardModal";
import useCards from "../hooks/useCards";
import { CardModalContext, CardModalProvider } from "../context/CardModalContext";
import { CardsContext, CardsProvider } from "../context/CardsContext";
import { useState } from "react";

function Content(){
    const [currentTab, setCurrentTab] = useState("cards"); // ["cards", "logs"]
    const contextValueCardModal = useCardModal();    
    const contextValueCards = useCards();

    return (
        <CardModalContext.Provider value={contextValueCardModal}>
            <CardsContext.Provider value={contextValueCards}>
                <Menu currentTab={currentTab} setCurrentTab={setCurrentTab} />
                {currentTab === "cards" && <CardList />}
                {currentTab === "logs" && <CardChangeLogs />}
            </CardsContext.Provider>
        </CardModalContext.Provider>
    );
}

export default Content;