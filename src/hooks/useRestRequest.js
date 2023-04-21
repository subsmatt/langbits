import { useState, useEffect } from "react";
import { sampleData } from "../data/sampleData";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
};

function useRestRequest() {
    const [data, setData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                // Get data from a file
                const result = {
                    data: sampleData
                };
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setData(result.data);
            }
            catch (e){
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        }
        
        loadData();
    }, []);

    function insertRecord(aoRec){
        const lsFuncName = "useRestRequst>insertRecord";
        
        // Check if records is in correct format
        if(aoRec && (aoRec.word && aoRec.desc)) {
            const originalRecords = [...data];

            // Set newId to be max id among existing records + 1
            const newId = data.reduce((acc, cur) => {
                const curId = parseInt(cur.id);
                return curId > acc ? curId : acc;
            }, 0) + 1;

            // Check if new Id generated okay
            if (!newId) {
                console.log(`ERROR:${lsFuncName} - Cannot create new Id.`);
                setRequestStatus(REQUEST_STATUS.FAILURE);
                return;
            }

            const newRecord = {
                "id": newId.toString(),
                "lang": "es",
                "word": aoRec.word ? aoRec.word : "word(new)",
                "desc_lang": "en",
                "desc": aoRec.desc ? aoRec.desc : "desc(new)",
                "tags": [],
                "type": "noun",
                "hits": 0,
                "examples": [],
                "familiar": false,
                "iknowthis": false
            };

            async function handleInsert(aoNewRec) {
                try {
                    setData([...originalRecords, aoNewRec]);
                    setRequestStatus(REQUEST_STATUS.SUCCESS);
                } catch (err) {
                    console.log(`ERROR:${lsFuncName}`, err);
                    setRequestStatus(REQUEST_STATUS.FAILURE);
                    setData(originalRecords);
                }
            }

            handleInsert(newRecord);
        } else {
            console.log(`ERROR:${lsFuncName} - Malformed record`);
            setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }

    function updateRecord(aoRec){
        const lsFuncName = "useRestRequst>updateRecord";

        if (aoRec && aoRec.id) {
            const originalRecords = [...data];

            const originalRecord = originalRecords.find(function (rec){
                return rec.id == aoRec.id;
            });

            const updatedRecord = {...originalRecord, word: aoRec.word, desc: aoRec.desc};

            try {
                setData(function(){
                    return originalRecords.map(function (rec) {
                        return rec.id != aoRec.id ? rec : updatedRecord;
                    });
                });
            } catch (err) {
                console.log(`ERROR:${lsFuncName}`, err);
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setData(originalRecords);
            }
        } else {
            console.log(`ERROR:${lsFuncName} - Invalid Reocrd/Id`);
            setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }

    function deleteRecord(asId){
        const lsFuncName = "useRestRequst>deleteRecord";
        
        // Check if Id is valid
        if(asId) {
            const originalRecords = [...data];
            const newRecords = data.filter(function(rec){
                return rec.id != asId;
            });

            async function handleDelete() {
                try {
                    setData(newRecords);
                    setRequestStatus(REQUEST_STATUS.SUCCESS);
                } catch (err) {
                    console.log(`ERROR:${lsFuncName}`, err);
                    setRequestStatus(REQUEST_STATUS.FAILURE);
                    setData(originalRecords);
                }
            }

            handleDelete();
        } else {
            console.log(`ERROR:${lsFuncName} - Invalid Id`);
            setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }

    return {data, requestStatus, error, insertRecord, updateRecord, deleteRecord};
}

export default useRestRequest;