import useGenCrudMethods from "../useGenCrudMethods";
import { sampleAttributesData } from "../../data/sampleAttributesData";
import { v4 as uuidv4 } from "uuid";

function useEntityCardAttributes() {
    const {data, error, createRecord, updateRecord, deleteRecord} =  useGenCrudMethods(sampleAttributesData);

    function updateCardAttributesEntity(cardId, pinned, important){
        // check if Attributes record exists
        const cardAttributes = data.find(rec => rec.cardId === cardId);
        if (cardAttributes){
            updateRecord(cardAttributes.id, {
                pinned: pinned === undefined ? undefined : Number(pinned),
                important: important === undefined ? undefined : Number(important),
                updateDate: new Date().toISOString()
            });
        } else {
            createRecord({
                id: uuidv4(),
                cardId: cardId,
                pinned: pinned === undefined ? undefined : Number(pinned),
                important: important === undefined ? undefined : Number(important),
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