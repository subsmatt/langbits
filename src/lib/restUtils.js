import prisma, {errorFormat} from "./prisma";

export async function processGetAndPost(dbEntity, req, res) {
    const { method} = req;

    switch(method) {
        case "GET":
            await handleGet(dbEntity, res);
            break;
        case "POST":
            await handlePost(dbEntity, req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export async function handleGet(dbEntity, res) {
    try {
        const data = await dbEntity.findMany();
        
        res.end(JSON.stringify(data ?? [], null, "\t"));
    } catch(e) {
        res.status(400).end(errorFormat(e.message));
    }
}

export async function handlePost(dbEntity, req, res) {
    try {
        const data = await dbEntity.create({data: {...req.body}});

        res.setHeader("Content-Type", "application/json");
        res.status(200).end(JSON.stringify(data, null, "\t"));
    } catch(e) {
        res.status(400).end(errorFormat(e.message));
    }
}

// processGetOnePutAndDelete
export async function processGetOnePutAndDelete(dbEntity, req, res){
    const { method } = req;

    switch(method) {
        case "GET":
            await handleGetOne(dbEntity, req, res);
            break;
        case "PUT":
            await handlePut(dbEntity, req, res);
            break;
        case "DELETE":
            await handleDelete(dbEntity, req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export async function handleGetOne(dbEntity, req, res) {
    try {
        const primaryKeyId = req?.query?.id ?? "ID-REQUIRED-NOT-FOUND";
        const data = await dbEntity.findMany({
            where: {id: primaryKeyId}
        });

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({id: primaryKeyId, title: "handleGetOne title"}, null, "\t"));
    } catch (e) {
        res.status(400).end(errorFormat(e?.message));
    }
}

export async function handlePut(dbEntity, req, res) {
    try {
        const primaryKeyId = req?.query?.id ?? "ID-REQUIRED-NOT-FOUND";
        let loReqBody = {...req.body};
        delete loReqBody.id;

        const data = await dbEntity.update({
            where: {id: primaryKeyId},
            data: {...loReqBody}
        });

        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({id: primaryKeyId, title: "handlePut title"}, null, "\t"));
    } catch (e) {
        res.status(400).end(errorFormat(e?.message));
    }
}

export async function handleDelete(dbEntity, req, res) {
    try {
        const primaryKeyId = req?.query?.id ?? "ID-REQUIRED-NOT-FOUND";        
        const data = await dbEntity.delete({
            where: { id: primaryKeyId }
        });

        res.setHeader("Content-Type", "application/json");
        res.status(200).end(JSON.stringify(data, null, "\t"));
    } catch (e) {
        res.status(400).end(errorFormat(e?.message));
    }
}