import Header from "./Header";
import ControlPanel from "./ControlPanel";
import Content from "./Content";
import useControlPanel from "../hooks/useControlPanel";
import useCardModal from "../hooks/useCardModal";
import { ControlPanelContext } from "../context/ControlPanelContext";
import { CardModalContext } from "../context/CardModalContext";

function LangBitsApp() {
    const contextValueControlPanel = useControlPanel();
    const contextValueCardModal = useCardModal(); 

    return (
        <div className="container">
            <Header/>
            <ControlPanelContext.Provider value={contextValueControlPanel}>
                <CardModalContext.Provider value={contextValueCardModal}>
                    <ControlPanel/>
                    <Content/>
                </CardModalContext.Provider>
            </ControlPanelContext.Provider>
        </div>
    );
}

export default LangBitsApp;