import express from "express";
import ViteExpress from "vite-express";
import * as schema from '@/db/schema';
import { drizzle } from 'drizzle-orm/libsql';

const app = express();

const db = drizzle({
    schema,
    connection: {
        url: process.env.DB_FILE_NAME
    }
});

app.get("/api/stats", async (req, res) => {

})

app.get("/api/query", async (req, res) => {
    // read the query params
    const { limit, offset, type } = req.query;
    let results;

    if (type === 'conversations') {
        results = await db.query.conversations.findMany({
            with: {
                responses: true
            },
            orderBy: (conversations, { desc, asc }) => [asc(conversations.id)],
            limit: limit
        });
    }

    if (type === 'responses') {
        results = await db.query.responses.findMany({
            with: {
                conversation: true
            },
            limit: limit
        });
    }

    res.json({ results });
});

ViteExpress.listen(app, 3000, () => console.log("Server is listening..."));
