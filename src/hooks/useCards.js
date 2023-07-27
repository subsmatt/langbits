import useEntityCards from "./entityMethods/useEntityCards";
import useEntityCardAttributes from "./entityMethods/useEntityCardAttributes";
import useEntityChangeLogs from "./entityMethods/useEntityChageLogs";
import useEntityTags from "./entityMethods/useEntityTags";
import useEntityTagOnCard from "./entityMethods/useEntityTagOnCard";

function useCards(errorNotificationFn) {
    const {
        data: cardsData,
        error: cardsDataError,
        createCardEntity,
        updateCardEntity,
        deleteCardEntity,
    } = useEntityCards("/api/cards", errorNotificationFn);

    const {
        data: cardAttributesData,
        error: cardAttributesDataError,
        updateCardAttributesEntity,
        deleteCardAttributesEntity,
    } = useEntityCardAttributes("/api/cardattributes", errorNotificationFn);

    const {
        data: cardChangeLogsData,
        error: cardChangeLogsError,
        createCardChangeLogEntity
    } = useEntityChangeLogs("/api/changelogs", errorNotificationFn);

    const {
        data: tagsData,
        error: tagsDataError,
        createTagsAndMerge
    } = useEntityTags("/api/tags", errorNotificationFn);

    const {
        data: tagOnCardData,
        error: tagOnCardDataError,
        updateCardTags,
        deleteTagOnCardByCardId
    } = useEntityTagOnCard("/api/tagoncard", errorNotificationFn);

    function createCard(aoRec, tagIdsIn, tagNamesIn, doneCallback){
        const lsFuncName = "useCard>createCard";
        
        // Check if records is in correct format
        if(aoRec && (aoRec.word && aoRec.desc)) {
            const cardId = createCardEntity(aoRec);
            createCardChangeLogEntity(cardId, "CREATE");

            const tagIds = createTagsAndMerge(tagIdsIn, tagNamesIn);

            updateCardTags(tagIds, cardId);
        } else {
            console.log(`ERROR:${lsFuncName} - Malformed record`);
        }
    }

    function updateCard(aoRec, doneCallback, pinned, important, tagIdsIn, tagNamesIn){
        const lsFuncName = "useCard>updateCard";
        
        if (aoRec && aoRec.id) {
            updateCardEntity(aoRec);
            updateCardAttributesEntity(aoRec.id, pinned, important);
            createCardChangeLogEntity(aoRec.id, "UPDATE");

            // Only update tag info if either tagIdsIn or tagNamesIn is provided
            if (tagIdsIn || tagNamesIn) {
                const tagIds = createTagsAndMerge(tagIdsIn, tagNamesIn);
                
                updateCardTags(tagIds, aoRec.id);
            }

            if (doneCallback) {
                doneCallback();
            }
        } else {
            console.log(`ERROR:${lsFuncName} - Invalid Reocrd/Id`);
        }
    }

    function deleteCard(asId, doneCallback){
        const lsFuncName = "useCard>deleteCard";
        console.log(`${lsFuncName} asId[${asId}]`);
        // Check if Id is valid
        if(asId) {
            deleteCardEntity(asId);
            deleteCardAttributesEntity(asId);
            deleteTagOnCardByCardId(asId);
        } else {
            console.log(`ERROR:${lsFuncName} - Invalid Id`);
        }
    }

    return {
        cardsData, 
        cardsDataError, 
        cardAttributesData, 
        cardAttributesDataError, 
        cardChangeLogsData,
        cardChangeLogsError,
        tagsData,
        tagsDataError,
        tagOnCardData,
        tagOnCardDataError,
        createCard, 
        updateCard, 
        deleteCard
    };
}

export default useCards;