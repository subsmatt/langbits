import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const {promisify} = require("util");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

export default async function handler(req, res) {
    const method = req?.method;
    const id = req?.query.id;
    const recordFromBody = req?.body;

    switch (method) {
        case "POST":
            await postMethod();
            break;
        case "PUT":
            await putMethod();
            break;
        case "DELETE":
            deleteMethod();
            break;
        default:
            res.status(501).send(`Method ${method} not implemented`);
            console.log(`Method ${method} not implemented`);
    }

    //const jsonFile = path.resolve("./", "db.json");

    async function putMethod() {
        try {
            const jsonFile = path.resolve("./src/data", "db.json");
            const readFileData = await readFile(jsonFile);
            await delay(1000);
            const sampleData = JSON.parse(readFileData).cards;
    
            if (sampleData){
                const newCardsArray = sampleData.map(function (rec){
                    return rec.id == id ? recordFromBody : rec;
                });
                writeFile(jsonFile, JSON.stringify({cards: newCardsArray}, null, 2));

                res.setHeader("Content-Type", "application/json");
                res.status(200).send(JSON.stringify(recordFromBody, null, 2));
                console.log(`PUT /api/cards/${id} status: 200`);
            }
        } catch(err) {
            res.status(500).send(`PUT /api/cards/${id} Status: 500`);
            console.log(`PUT /api/cards/${id} Error: `, err);
        }
    }
 
    async function deleteMethod() {
        try {
            const jsonFile = path.resolve("./src/data", "db.json");
            const readFileData = await readFile(jsonFile);
            await delay(1000);
            const sampleData = JSON.parse(readFileData).cards;
    
            if (sampleData){
                const newCardsArray = sampleData.filter(function (rec){
                    return rec.id != id;
                });
                writeFile(jsonFile, JSON.stringify({cards: newCardsArray}, null, 2));

                res.setHeader("Content-Type", "application/json");
                res.status(200).send(JSON.stringify(sampleData.find(rec => rec.id == id), null, 2));
                console.log(`DELETE /api/cards/${id} status: 200`);
            }
        } catch(err) {
            res.status(500).send(`DELETE /api/cards/${id} Status: 500`);
            console.log(`DELETE /api/cards/${id} Error: `, err);
        }
    }

    async function postMethod() {
        try {
            const jsonFile = path.resolve("./src/data", "db.json");
            const readFileData = await readFile(jsonFile);
            await delay(1000);
            const sampleData = JSON.parse(readFileData).cards;

            if (sampleData){
                // const idNew = sampleData.reduce((accumulator, currentValue) => {
                //     const idCurrent = parseInt(currentValue.id);
                //     return idCurrent > accumulator ? idCurrent : accumulator;
                // }, 0) + 1;
                // const newCardRec = {...recordFromBody, id: idNew.toString()};

                const newId = uuidv4();
                const newCardRec = {...recordFromBody, id: newId};
                const newCardsArray = [newCardRec, ...sampleData];

                writeFile(jsonFile, JSON.stringify({cards: newCardsArray}, null, 2));

                res.setHeader("Content-Type", "application/json");
                res.status(200).send(JSON.stringify(newCardRec, null, 2));
                console.log(`POST /api/cards/${idNew} status: 200`);
            }
        } catch(err) {
            res.status(500).send(`POST /api/cards/${id} Status: 500`);
            console.log(`POST /api/cards/${id} Error: `, err);
        }
    }
}