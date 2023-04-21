import {ControlPanelContext} from "../context/ControlPanelContext";
import { useContext } from "react";
import Card from "./Card";
import CardAdd from "./CardAdd";
import useRestRequest, {REQUEST_STATUS} from "../hooks/useRestRequest";
import CardModal from "./CardModal/CardModal";

function CardList() {
    const {searchQuery} = useContext(ControlPanelContext);

    // Load data
    const {data, requestStatus, error, deleteRecord, insertRecord, updateRecord} = useRestRequest();

    // Show Error and abort if loading failed
    if (requestStatus === REQUEST_STATUS.FAILURE) {
        return (
            <div className="text-center text-danger my-5">
                ERROR: <b>Cannot load data. {error}</b>
            </div>
        );
    }

    // Show Error and abort if loading failed
    if (data === undefined || data.length === 0) {
        return (
            <div className="text-center text-info my-5">
                INFO: <b>No data found.</b>
            </div>
        );
    }

    return (
        <>
            <CardModal insertRecord={insertRecord} updateRecord={updateRecord}/>
            <CardAdd/>
            <div className="row">
                {data.filter(function(rec){
                        if (Object.hasOwn(rec, "word") && rec.word !== null && Object.hasOwn(rec, "desc") && rec.desc !== null) {
                            return rec.word.toLowerCase().includes(searchQuery) || rec.desc.toLowerCase().includes(searchQuery);
                        } else {
                            console.log("ERROR: malformed data, check that both 'word' and 'desc' properties are defined.");
                            return false;
                        }
                    }).map(function(rec){                        
                        return (
                            <Card key={rec.id} rec={rec} updateRecord={updateRecord} insertRecord={insertRecord} deleteRecord={deleteRecord}/>
                        );
                    }
                )}
            </div>
        </>
    );
}

export default CardList;