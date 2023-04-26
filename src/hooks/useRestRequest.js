import { useState, useEffect } from "react";
import { sampleData } from "../data/sampleData";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
};

const restUrl = "api/cards";

function useRestRequest() {
    const [data, setData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadData() {
            try {
                // Get data from a file
                // const result = {
                //     data: sampleData
                // };
                const result = await axios.get(restUrl);
                setRequestStatus(REQUEST_STATUS.SUCCESS);
                setData(result.data);
            }
            catch (e){
                console.log(`sms:error: `, e);
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        }
        
        loadData();
    }, []);

    function insertRecord(aoRec, doneCallback){
        const lsFuncName = "useRestRequst>insertRecord";
        
        // Check if records is in correct format
        if(aoRec && (aoRec.word && aoRec.desc)) {
            const originalRecords = [...data];

            // // Set newId to be max id among existing records + 1
            // const newId = data.reduce((acc, cur) => {
            //     const curId = parseInt(cur.id);
            //     return curId > acc ? curId : acc;
            // }, 0) + 1;

            const newId = uuidv4();

            // Check if new Id generated okay
            if (!newId) {
                console.log(`ERROR:${lsFuncName} - Cannot create new Id.`);
                setRequestStatus(REQUEST_STATUS.FAILURE);
                return;
            }

            const newRecord = {
                "id": newId,
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

            // async function handleInsert(aoNewRec) {
            //     try {
            //         setData([...originalRecords, aoNewRec]);
            //         setRequestStatus(REQUEST_STATUS.SUCCESS);
            //     } catch (err) {
            //         console.log(`ERROR:${lsFuncName}`, err);
            //         setRequestStatus(REQUEST_STATUS.FAILURE);
            //         setData(originalRecords);
            //     }
            // }

            // handleInsert(newRecord);

            const newRecords = [newRecord, ...data];

            async function delayFunction(){
                try {
                    setData(newRecords);
                    await axios.post(`${restUrl}/99999`, newRecord);
                    if (doneCallback){
                        doneCallback();
                    }
                } catch (err) {
                    console.log("error thrown inside delayFunciton: ", err);
                    if (doneCallback){
                        doneCallback();
                    }
                    setData(originalRecords);
                }
            }
    
            delayFunction();
        } else {
            console.log(`ERROR:${lsFuncName} - Malformed record`);
            setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }

    function updateRecord(aoRec, doneCallback){
        const lsFuncName = "useRestRequst>updateRecord";

        if (aoRec && aoRec.id) {
            const originalRecords = [...data];

            const originalRecord = originalRecords.find(function (rec){
                return rec.id === aoRec.id;
            });

            const updatedRecord = {...originalRecord, ...aoRec};
            
            const newRecords = data.map(function(rec){
                return rec.id === updatedRecord.id ? updatedRecord : rec;
            });

            async function delayFunction(){
                try {
                    setData(newRecords);
                    await axios.put(`${restUrl}/${updatedRecord.id}`, updatedRecord);
                    if (doneCallback){
                        doneCallback();
                    }
                } catch (err) {
                    console.log("error thrown inside delayFunciton: ", err);
                    if (doneCallback){
                        doneCallback();
                    }
                    setData(originalRecords);
                }
            }
    
            delayFunction();

            // setTimeout(function(){
            //     try {
            //         setData(function(){
            //             return originalRecords.map(function (rec) {
            //                 return rec.id !== aoRec.id ? rec : updatedRecord;
            //             });
            //         });
    
            //         if (doneCallback){
            //             doneCallback();
            //         }
            //     } catch (err) {
            //         console.log(`ERROR:${lsFuncName}`, err);
            //         setRequestStatus(REQUEST_STATUS.FAILURE);
            //         setData(originalRecords);
            //     }

            // }, 1000);
        } else {
            console.log(`ERROR:${lsFuncName} - Invalid Reocrd/Id`);
            setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }

    function deleteRecord(asId, doneCallback){
        const lsFuncName = "useRestRequst>deleteRecord";
        
        // Check if Id is valid
        if(asId) {
            const originalRecords = [...data];
            const newRecords = data.filter(function(rec){
                return rec.id !== asId;
            });

            const originalRecord = originalRecords.find(function (rec){
                return rec.id === asId;
            });
            // async function handleDelete() {
            //     try {
            //         setData(newRecords);
            //         setRequestStatus(REQUEST_STATUS.SUCCESS);
            //     } catch (err) {
            //         console.log(`ERROR:${lsFuncName}`, err);
            //         setRequestStatus(REQUEST_STATUS.FAILURE);
            //         setData(originalRecords);
            //     }
            // }

            // handleDelete();

            async function delayFunction(){
                try {
                    setData(newRecords);
                    await axios.delete(`${restUrl}/${asId}`, originalRecord);
                    if (doneCallback){
                        doneCallback();
                    }
                } catch (err) {
                    console.log("error thrown inside delayFunciton: ", err);
                    if (doneCallback){
                        doneCallback();
                    }
                    setData(originalRecords);
                }
            }
    
            delayFunction();
        } else {
            console.log(`ERROR:${lsFuncName} - Invalid Id`);
            setRequestStatus(REQUEST_STATUS.FAILURE);
        }
    }

    return {data, requestStatus, error, insertRecord, updateRecord, deleteRecord};
}

export default useRestRequest;