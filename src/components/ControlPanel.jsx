import { useContext } from "react";
import { ControlPanelContext } from "../context/ControlPanelContext";

function ControlPanel() {
    // Get ControlPanel context
    const {searchQuery, setSearchQuery, searchType, setSearchType} = useContext(ControlPanelContext);

    return (
        <div className="langbits-controlpanel">
            <ul className="d-flex p-0">
                <li className="d-flex flex-column col-3">
                    <select className="form-select" aria-label="Word type" onChange={(event) => setSearchType(event.target.value)}>
                        <option defaultValue={""} value="">All words</option>
                        <option value="noun">Nouns</option>
                        <option value="verb">Verbs</option>
                        <option value="adjective">Adjectives</option>
                        <option value="pronoun">Pronouns</option>
                        <option value="adverb">Adverbs</option>
                    </select>
                </li>
                <li className="d-flex flex-column col-6 mx-3">
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