import useGenCrudMethods from "../useGenCrudMethods";
import { sampleChangeLogs } from "../../data/sampleChangeLog";
import { v4 as uuidv4 } from "uuid";
import MongoId from "mongoid-js";

function useEntityChangeLogs(url, errorNotificationFn) {
    const {data, error, createRecord} = useGenCrudMethods(url, errorNotificationFn);
    
    function createCardChangeLogEntity(cardId, operation){
        createRecord("/api/changelogs", {
            id: MongoId.mongoid(), //uuidv4(),
            cardId,
            operation,
            changeDate: new Date().toISOString()
        });
    }

    return {data, error, createCardChangeLogEntity};
}

export default useEntityChangeLogs;