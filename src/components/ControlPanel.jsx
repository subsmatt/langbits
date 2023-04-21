import { useContext } from "react";
import { ControlPanelContext } from "../context/ControlPanelContext";

function ControlPanel() {
    // Get ControlPanel context
    const {searchQuery, setSearchQuery} = useContext(ControlPanelContext);

    return (
        <div className="d-flex justify-content-around">
            <ul className="my-2 px-0">
                <li className="d-flex flex-column flex-md-row ml-sm-5">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon2" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
                        <span className="input-group-text" id="basic-addon2"><i className="fa fa-search"></i></span>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default ControlPanel;