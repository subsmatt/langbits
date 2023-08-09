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

export default prisma;