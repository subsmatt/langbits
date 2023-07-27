import {PrismaClient} from "@prisma/client";

export const errorFormat = function (errorMessage) {
    const str = process.env.NODE_ENV === "production" ? "try refreshing page (prisma)" : errorMessage;
    console.log(str);
    return str;
};

let prisma;

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient({
            log: ["query", "warn", "info", "error"]
        });
    }

    prisma = global.prisma;
}

/*
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

export default prisma;