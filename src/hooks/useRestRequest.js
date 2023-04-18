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
        alert('useRestRequest> insertRecord...');
    }

    function updateRecord(aoRec){
        alert(`useRestRequest> updateRecord id[${aoRec.id}]...`);
    }

    function deleteRecord(asId){
        alert(`useRestRequest> deleteRecord id[${asId}]...`);
    }

    return {data, requestStatus, error, insertRecord, updateRecord, deleteRecord};
}

export default useRestRequest;