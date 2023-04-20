import Card from "./Card";
import CardAdd from "./CardAdd";
import useRestRequest, {REQUEST_STATUS} from "../hooks/useRestRequest";
import CardModal from "./CardModal/CardModal";

function CardList() {
    // Load data
    const {data, requestStatus, error, deleteRecord, insertRecord, updateRecord} = useRestRequest();

    // Show Error and abort if loading failed
    if (requestStatus === REQUEST_STATUS.FAILURE || data === undefined || data.length === 0) {
        return (
            <div className="text-center text-danger my-5">
                ERROR: <b>Cannot load data. {error}</b>
            </div>
        );
    }

    return (
        <>
            <CardAdd insertRecord={insertRecord}/>
            <CardModal/>
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