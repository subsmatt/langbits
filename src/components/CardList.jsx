import Card from "./Card";
import CardAdd from "./CardAdd";
import useRestRequest, {REQUEST_STATUS} from "../hooks/useRestRequest";
import CardModal from "./CardModal/CardModal";

function CardList() {
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
                {data.map(
                    function(rec) {
                        return(
                            <Card key={rec.id} rec={rec} deleteRecord={deleteRecord} updateRecord={updateRecord}/>
                        );
                    }
                )}
            </div>
        </>
    );
}

export default CardList;