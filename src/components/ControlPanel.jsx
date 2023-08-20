import { useContext } from "react";
import { ControlPanelContext } from "../context/ControlPanelContext";
import CardAdd from "./CardAdd";
import WordType from "./WordType";

function ControlPanel() {
    // Get ControlPanel context
    const {searchQuery, setSearchQuery, searchType, setSearchType} = useContext(ControlPanelContext);

    return (
        <div className="langbits-controlpanel row mb-3">
            <div className="col-sm-3 mt-1">
                <WordType incShowAll={true} eventHandler={setSearchType} />
            </div>
            <div className="col-sm-6 mt-1">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon2" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
                    <span className="input-group-text" id="basic-addon2"><i className="fa fa-search"></i></span>
                </div>
            </div>
            <div className="col-sm-3 mt-1 d-flex justify-content-end">
                <CardAdd/>
            </div>
        </div>
    );
}

export default ControlPanel;