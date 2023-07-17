import useGenCrudMethods from "../useGenCrudMethods";
import { sampleTagOnCardData } from "../../data/sampleTagOnCard";
import { v4 as uuidv4 } from "uuid";

function useEntityTagOnCard(){
    const {data, error, createRecord, deleteRecord} = useGenCrudMethods(sampleTagOnCardData);
    
    function updateCardTags(tagIdsToSet, cardId){
        if(!tagIdsToSet && !cardId){
            return;
        }
        
        const tagIdsOnCard = data.filter(rec => rec.cardId === cardId).map(rec => rec.tagId);
        const tagIdsToAdd  = tagIdsToSet.filter(tagId => !tagIdsOnCard.includes(tagId));
        const tagIdsToDelete = tagIdsOnCard.filter(tagId => !tagIdsToSet.includes(tagId));
        
        tagIdsToAdd.forEach(tagId => {
            createRecord({
                id: uuidv4(),
                cardId,
                tagId,
                createdAt: new Date().toISOString()
            });
        });

        const tagOnCardRecIdsToDelete = data.filter(rec => rec.cardId === cardId && tagIdsToDelete.includes(rec.tagId)).map(rec => rec.id);
        tagOnCardRecIdsToDelete.forEach(id => deleteRecord(id));
    }

    function deleteTagOnCardByCardId(cardId){
        data.filter(rec => {
            if(rec.cardId === cardId) {
                deleteRecord(rec.id);
            }
        });
    }
    
    return {data, error, updateCardTags, deleteTagOnCardByCardId};
}

export default useEntityTagOnCard;