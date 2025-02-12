import express from "express";
import ViteExpress from "vite-express";
import * as schema from '@/db/schema';
import { drizzle } from 'drizzle-orm/libsql';
import { count, sql } from 'drizzle-orm';
import { and, asc, desc, eq, gt, inArray, isNotNull, isNull, like } from 'drizzle-orm/expressions';


export const db = (path) => {
    return drizzle({
        schema,
        connection: {
            url: path
        }
    });
}


const createApp = async ({ db }) => {
    const app = express();

    app.get("/api/stats", async (req, res) => {

    })

    app.get("/api/query", async (req, res) => {
        // read the query params
        const { limit, offset, type, model } = req.query;
        const limitInt = parseInt(limit);

        if (type === 'conversations') {
            const conversations = await db.query.conversations.findMany({
                with: {
                    responses: true
                },
                // where: model ? eq(schema.conversations.model, model) : undefined,
                // orderBy: [desc(sql`responses.datetime_utc`)],
                //orderBy: (conversations, { desc, asc }) => [asc(conversations.id)],
                limit: limitInt
            });
            res.json({ conversations });
        }

        if (type === 'responses') {
            const responses = await db.query.responses.findMany({
                // with: {
                //     conversation: true
                // },
                where: model ? eq(responses.model, model) : undefined,
                orderBy: (responses, { desc, asc }) => [desc(responses.datetimeUtc)],
                limit: limitInt
            });
            res.json({ responses });
        }

        // if (type === 'models') {
        //     const conversations = await db.query.conversations.findMany({
        //         distinct: [schema.conversations.model],
        //         orderBy: [asc(schema.conversations.model)]
        //     });
        //     const models = [...new Set(conversations.map(conversation => conversation.model))]
        //     res.json({ models });
        // }
    });
    return app;
}

export { createApp };