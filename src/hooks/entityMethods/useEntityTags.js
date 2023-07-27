import useGenCrudMethods from "../useGenCrudMethods";
import { sampleTagsData } from "../../data/sampleTags";
import MongoId from "mongoid-js";

function useEntityTags(url, errorNotificationFn){
    const {data, error, createRecord} = useGenCrudMethods(url, errorNotificationFn, sampleTagsData);

    function createTagsAndMerge(tagIdsIn, tagNamesInString){
        if(!tagIdsIn && !tagNamesInString) return [];

        const tagNamesIn = tagNamesInString ? tagNamesInString.split(",").filter(t => t && t.length > 0) : [];
        const tagIds = tagIdsIn ? [...tagIdsIn] : [];
        const tagNamesAllUppercase = data?.map(r => r.tagName.toUpperCase());

        tagNamesIn.filter(rec => {
            return !(!rec || rec.trim().length ===0);
        }).forEach(function(tag){
            if(tagNamesAllUppercase.includes(tag.toUpperCase())){
                const tagNameValue = tagNamesAllUppercase.find(r => r === tag.toUpperCase());
                const id = data?.find(r => r.tagName.toUpperCase() === tagNameValue).id;
                if(!tagIds.includes(id)) {
                    tagIds.push(id);
                }
            } else {
                const tagIdNew = MongoId.mongoid();
                createRecord(url, {
                    id: tagIdNew, tagName: tag
                });
                tagIds.push(tagIdNew);
            }
        });

        return tagIds;
    }

    return {data, error, createTagsAndMerge};
}

export default useEntityTags;