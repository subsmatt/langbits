import { processGetAndPost } from "../../../src/lib/restUtils";
import prisma from "../../../src/lib/prisma";

export default async function handle(req, res) {
    await processGetAndPost(prisma.TagOnCard, req, res);
}