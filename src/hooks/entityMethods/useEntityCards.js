import useGenCrudMethods from "../useGenCrudMethods";
import MongoId from "mongoid-js";

function useEntityCards(url, errorNotificationFn) {
    // id String @id @default(auto()) @map("_id") @db.ObjectId
    // lang String
    // word String
    // desc_lang String
    // desc String
    // type String
    // hits Int
    // examples String[]
    // iknowthis Boolean
    // createDate String?

    const schemaRecord = {
        "id": "0",
        "lang": "es",
        "word": "empty word",
        "desc_lang": "en",
        "desc": "empty desc",
        "type": "unknown",
        "hits": 0,
        "examples": [],
        "iknowthis": false
        //"createDate": "DefaultDate"
    };
    
    const {
        data,
        error,
        createRecord,
        updateRecord,
        deleteRecord,
    } = useGenCrudMethods(url, errorNotificationFn);

    function createCardEntity(aoRecord) {
        const cardId = MongoId.mongoid();
        const newRecord = {...schemaRecord, 
            id: cardId,
            word: aoRecord.word ? aoRecord.word : "unknown word",
            desc: aoRecord.desc ? aoRecord.desc : "unknown desc",
            type: aoRecord.type ? aoRecord.type : "unknown"
            //createDate: new Date().toISOString()
        };

        createRecord("/api/cards", newRecord);
        return cardId;
    }

    function updateCardEntity(aoRecord, important, pinned) {
        const updatedRecord = {...aoRecord};

        updateRecord(aoRecord.id, updatedRecord);
    }

    function deleteCardEntity(asId) {
        deleteRecord(asId);
    }

    return {data, error, createCardEntity, updateCardEntity, deleteCardEntity};
}

export default useEntityCards;