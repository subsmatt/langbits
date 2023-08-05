import useGenCrudMethods from "../useGenCrudMethods";
import { sampleAttributesData } from "../../data/sampleAttributesData";
import MongoId from "mongoid-js";

function useEntityCardAttributes(url, errorNotificationFn) {
    const {data, error, createRecord, updateRecord, deleteRecord} =  useGenCrudMethods(url, errorNotificationFn, sampleAttributesData);

    function updateCardAttributesEntity(cardId, pinned, important){
        // check if Attributes record exists
        const cardAttributes = data.find(rec => rec.cardId === cardId);
        
        if (cardAttributes){
            if (pinned !== undefined && important !== undefined) {
                // console.log(`updateCardAttributesEntity pinned[${Number(pinned)}] important[${Number(important)}]`);
                updateRecord(cardAttributes.id, {
                    pinned: Number(pinned),
                    important: Number(important),
                    updateDate: new Date().toISOString()
                });
            }
        } else {
            createRecord(url, {
                id: MongoId.mongoid(),
                cardId: cardId,
                pinned: pinned === undefined ? 0 : Number(pinned),
                important: important === undefined ? 0 : Number(important),
                updateDate: new Date().toISOString()
            });
        }
    }

    function deleteCardAttributesEntity(id){
        data.filter(rec => rec.cardId === id)
            .forEach(rec => deleteRecord(rec.id));
    }
    
    return {data, error, updateCardAttributesEntity, deleteCardAttributesEntity};
}

export default useEntityCardAttributes;