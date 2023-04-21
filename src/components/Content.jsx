import CardList from "./CardList";
import useCardModal from "../hooks/useCardModal";
import { CardModalContext, CardModalProvider } from "../context/CardModalContext";

function Content(){
    const contextValueCardModal = useCardModal();

    return (
        <CardModalContext.Provider value={contextValueCardModal}>
            <CardList />
        </CardModalContext.Provider>
    );
}

export default Content;