import CardModal from "./CardModal/CardModal";
import Menu from "./Menu";
import CardList from "./CardList";
import CardChangeLogs from "./CardChangeLogs";
import useCards from "../hooks/useCards";
import { CardsContext } from "../context/CardsContext";
import { useState } from "react";

function Content(){
    const [currentTab, setCurrentTab] = useState("cards"); // expected values ["cards", "logs"]   
    const contextValueCards = useCards();

    return (
        <CardsContext.Provider value={contextValueCards}>
            <CardModal />
            <Menu currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {currentTab === "cards" && <CardList />}
            {currentTab === "logs" && <CardChangeLogs />}
        </CardsContext.Provider>
    );
}

export default Content;