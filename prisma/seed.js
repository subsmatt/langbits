const {PrismaClient} = require("@prisma/client");

//const cards = require("../src/data/seed.json");

const prisma = new PrismaClient();

async function main() {
    console.log("Start seeding...");
    const cards = [
        {
        "id": "1003",
        "word": "naranja",
        "desc": "Orange"
        },
        {
        "id": "1005",
        "word": "fresa",
        "desc": "strawberry"
        }
    ];

    for (const rec of cards) {
        await prisma.Card.create({data: rec,});
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});