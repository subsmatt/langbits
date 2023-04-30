import { useState, useEffect } from "react";

function useGenCrudMethods(initialData, delayMs=1000) {
    const lsFuncName = "useGenCrudMethods";
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        async function getData() {
            await new Promise((resolve) => 
                setTimeout(resolve, delayMs)
            );
            try {
                setData(initialData);
            }
            catch (e){
                console.log(`ERROR:${lsFuncName} `, e);
                setError(e);
            }
        }
        
        getData();
    }, [initialData, delayMs]);

    function createRecord(createObject) {
        async function addData(){
            await new Promise((resolve) => 
                setTimeout(resolve, delayMs)
            );

            setData(function(originalData){
                return [...originalData, createObject];
            });                
        }

        addData();
    }

    function updateRecord(id, updateObject) {
        async function updateData(){
            await new Promise((resolve) => 
                setTimeout(resolve, delayMs)
            );

            setData(function(originalData){
                const dataRecord = originalData.find(rec => rec.id === id);

                for(const [key, value] of Object.entries(updateObject)){
                    dataRecord[key] = value === undefined ? dataRecord[key] : value;
                }
                return originalData.map(rec => rec.id === id ? dataRecord : rec);
            });                
        }

        updateData();
    }

    function deleteRecord(id) {
        async function deleteData(){
            await new Promise((resolve) => 
                setTimeout(resolve, delayMs)
            );

            setData(function(originalData){
                return originalData.filter(rec => rec.id !== id);
            });                
        }

        deleteData();
    }

    return {data, error, createRecord, updateRecord, deleteRecord};
}

export default useGenCrudMethods;