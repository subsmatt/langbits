import Header from "./Header";
import ControlPanel from "./ControlPanel";
import Content from "./Content";
import useControlPanel from "../hooks/useControlPanel";
import { ControlPanelContext } from "../context/ControlPanelContext";

function LangBitsApp() {
    const contextValueControlPanel = useControlPanel();

    return (
        <div className="container">
            <ControlPanelContext.Provider value={contextValueControlPanel}>
                <Header/>
                <ControlPanel/>
                <Content/>
            </ControlPanelContext.Provider>
        </div>
    );
}

export default LangBitsApp;