import path from "path";
import fs from "fs";

const {promisify} = require("util");
const readFile = promisify(fs.readFile);
const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });

export default async function handler(req, res) {
    //res.status(200).send(JSON.stringify(sampleData, null, 2));
    const jsonFile = path.resolve("./src/data", "db.json");
    
    try {
        const readFileData = await readFile(jsonFile);
        await delay(1000);
        const sampleData = JSON.parse(readFileData).cards;

        if (sampleData){
            res.setHeader("Content-Type", "application/json");
            res.status(200).send(JSON.stringify(sampleData, null, 2));
            console.log("GET /api/cards status: 200");
        }
    } catch(err) {
        console.log("GET /api/cards Error: ", err);
        res.status(404).send("File not found");
    }
}