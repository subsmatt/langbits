import { processGetOnePutAndDelete } from "../../../src/lib/restUtils";
import prisma from "../../../src/lib/prisma";

export default async function handle(req, res) {
    await processGetOnePutAndDelete(prisma.CardAttributes, req, res);
}