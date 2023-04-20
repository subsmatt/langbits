import CardList from "./CardList";
import useCardModal from "../hooks/useCardModal";
import { CardModalContext, CardModalProvider } from "../context/CardModalContext";

function Content(){
    const contextValueCardModal = useCardModal();

    return (
        <div className="container">
            <CardModalContext.Provider value={contextValueCardModal}>
                <CardList />
            </CardModalContext.Provider>
        </div>
    );
}

export default Content;