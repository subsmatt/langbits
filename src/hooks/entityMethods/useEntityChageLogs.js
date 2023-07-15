import useGenCrudMethods from "../useGenCrudMethods";
import { sampleChangeLogs } from "../../data/sampleChangeLog";
import { v4 as uuidv4 } from "uuid";

function useEntityChangeLogs() {
    const {data, error, createRecord} = useGenCrudMethods(sampleChangeLogs);
    console.log(`useEntityChangeLogs: data[${sampleChangeLogs.length}]`);
    function createCardChangeLogEntity(cardId, operation){
        createRecord({
            id: uuidv4(),
            cardId,
            operation,
            changeDate: new Date().toISOString()
        });
    }

    return {data, error, createCardChangeLogEntity};
}

export default useEntityChangeLogs;