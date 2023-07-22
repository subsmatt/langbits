import useGenCrudMethods from "../useGenCrudMethods";
import { sampleData } from "../../data/sampleData";
import { v4 as uuidv4 } from "uuid";

function useEntityCards() {
    const schemaRecord = {
        "id": "0",
        "lang": "es",
        "word": "empty word",
        "desc_lang": "en",
        "desc": "empty desc",
        "tags": [],
        "type": "unknown",
        "hits": 0,
        "examples": [],
        "createDate": "DefaultDate"
    };
    
    const {
        data,
        error,
        createRecord,
        updateRecord,
        deleteRecord,
    } = useGenCrudMethods(sampleData);

    function createCardEntity(aoRecord) {
        const cardId = uuidv4();
        const newRecord = {...schemaRecord, 
            id: cardId,
            word: aoRecord.word ? aoRecord.word : "unknown word",
            desc: aoRecord.desc ? aoRecord.desc : "unknown desc",
            type: aoRecord.type ? aoRecord.type : "unknown",
            createDate: new Date().toISOString()
        };

        createRecord(newRecord);
        return cardId;
    }

    function updateCardEntity(aoRecord, important, pinned) {
        const updatedRecord = {...schemaRecord, 
            id: aoRecord.id,
            word: aoRecord.word ? aoRecord.word : "unknown word",
            desc: aoRecord.desc ? aoRecord.desc : "unknown desc",
            type: aoRecord.type ? aoRecord.type : "unknown",
            familiar: aoRecord.familiar === undefined ? false : aoRecord.familiar 
        };

        updateRecord(aoRecord.id, updatedRecord);
    }

    function deleteCardEntity(asId) {
        deleteRecord(asId);
    }

    return {data, error, createCardEntity, updateCardEntity, deleteCardEntity};
}

export default useEntityCards;