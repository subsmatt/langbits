import { useState, useEffect } from "react";
import axios from "axios";

function useGenCrudMethods(url, errorNotificationFn, initData) {
    const lsFuncName = "useGenCrudMethods";
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [validateDate, setValidateDate] = useState(new Date());

    if((!url || url.length === 0) && !initData) {
        throw "useGenCrudMethods NO URL passed in";
    }

    function validate() {
        setValidateDate(new Date());
    }

    function formatErrorString(e, url){
        const errorString = e?.response?.status === 404 ?
            e?.message + " url " + url
            : e?.message + e?.response.data;
        console.log(errorString);
        return errorString;
    }

    useEffect(() => {
        async function getData() {
            try {
                if (url && url !== "skip") {
                    const results = await axios.get(url);                    
                    setData(results.data);
                } else {
                    setData(initData);
                }
            }
            catch (e){
                console.log(`ERROR:${lsFuncName} `, e);
                setError(e);
            }
        }
        
        getData();
    }, [url, validateDate, initData]);

    function createRecord(url, createObject) {
        async function addData(){
            try {
                await axios.post(url, createObject);
                setData(function(originalData){
                    return [...originalData, createObject];
                });                

            } catch(e) {
                const errorString = formatErrorString(e, url);
                errorNotificationFn?.(errorString);
                validate();
            }
        }

        addData();
    }

    function updateRecord(id, updateObject) {
        async function updateData(){
            try {
                await axios.put(`${url}/${id}`, updateObject);

                setData(function(originalData){
                    const dataRecord = originalData.find(rec => rec.id === id);
    
                    for(const [key, value] of Object.entries(updateObject)){
                        dataRecord[key] = value === undefined ? dataRecord[key] : value;
                    }
                    return originalData.map(rec => rec.id === id ? dataRecord : rec);
                });          
            } catch (e) {
                const errorString = formatErrorString(e, url);
                errorNotificationFn?.(errorString);
                validate();
            }
        }

        updateData();
    }

    function deleteRecord(id) {
        async function deleteData(){
            try {
                await axios.delete(`${url}/${id}`);

                setData(function(originalData){
                    return originalData.filter(rec => rec.id !== id);
                });                
            }  catch (e) {
                const errorString = formatErrorString(e, url);
                errorNotificationFn?.(errorString);
                validate();
            }
        }

        deleteData();
    }

    return {data, error, createRecord, updateRecord, deleteRecord};
}

export default useGenCrudMethods;