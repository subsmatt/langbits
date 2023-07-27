import { processGetAndPost } from "../../../src/lib/restUtils";
import prisma from "../../../src/lib/prisma";

export default async function handle(req, res) {
    //console.log(`sms>api/cards/index.js call processGetAndPost...`);
    await processGetAndPost(prisma.ChangeLogs, req, res);
}