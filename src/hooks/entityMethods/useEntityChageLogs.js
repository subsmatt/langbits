import useGenCrudMethods from "../useGenCrudMethods";
import MongoId from "mongoid-js";

function useEntityChangeLogs(url, errorNotificationFn) {
    const {data, error, createRecord} = useGenCrudMethods(url, errorNotificationFn);
    
    function createCardChangeLogEntity(cardId, operation){
        createRecord("/api/changelogs", {
            id: MongoId.mongoid(),
            cardId,
            operation,
            changeDate: new Date().toISOString()
        });
    }

    return {data, error, createCardChangeLogEntity};
}

export default useEntityChangeLogs;