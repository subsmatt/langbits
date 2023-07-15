import useEntityCards from "./entityMethods/useEntityCards";
import useEntityCardAttributes from "./entityMethods/useEntityCardAttributes";
import useEntityChangeLogs from "./entityMethods/useEntityChageLogs";
import useEntityTags from "./entityMethods/useEntityTags";
import useEntityTagOnCard from "./entityMethods/useEntityTagOnCard";

function useCards() {
    const {
        data: cardsData,
        error: cardsDataError,
        createCardEntity,
        updateCardEntity,
        deleteCardEntity,
    } = useEntityCards();

    const {
        data: cardAttributesData,
        error: cardAttributesDataError,
        updateCardAttributesEntity,
        deleteCardAttributesEntity,
    } = useEntityCardAttributes();

    const {
        data: cardChangeLogsData,
        error: cardChangeLogsError,
        createCardChangeLogEntity
    } = useEntityChangeLogs();

    const {
        data: tagsData,
        error: tagsDataError,
        createTagsAndMerge
    } = useEntityTags();

    const {
        data: tagOnCardData,
        error: tagOnCardDataError,
        updateCardTags,
        deleteTagOnCardByCardId
    } = useEntityTagOnCard();

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
            //setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }

    function updateCard(aoRec, doneCallback, pinned, important, tagIdsIn, tagNamesIn){
        const lsFuncName = "useCard>updateCard";
        console.log(`${lsFuncName}: aoRec[${aoRec}] doneCallback[${doneCallback}] pinned[${pinned}] important[${important}] tagIdsIn[${tagIdsIn}] tagNamesIn[${tagNamesIn}]`);
        if (aoRec && aoRec.id) {
            //console.log(`${lsFuncName}: call updateCardEntity id[${aoRec.id}]`);
            updateCardEntity(aoRec);
            updateCardAttributesEntity(aoRec.id, pinned, important);
            createCardChangeLogEntity(aoRec.id, "UPDATE");

            console.log(`call createTagsAndMerge(${tagIdsIn}, ${tagNamesIn})...`);
            const tagIds = createTagsAndMerge(tagIdsIn, tagNamesIn);
            console.log(`call updateCardTags(${tagIds}, ${aoRec.id})...`);
            updateCardTags(tagIds, aoRec.id);

            if (doneCallback) {
                doneCallback();
            }
        } else {
            console.log(`ERROR:${lsFuncName} - Invalid Reocrd/Id`);
            //setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }

    function deleteCard(asId, doneCallback){
        const lsFuncName = "useCard>deleteCard";
        
        // Check if Id is valid
        if(asId) {
            deleteCardEntity(asId);
            deleteCardAttributesEntity(asId);
            deleteTagOnCardByCardId(asId);
        } else {
            console.log(`ERROR:${lsFuncName} - Invalid Id`);
            //setRequestStatus(REQUEST_STATUS.FAILURE);
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