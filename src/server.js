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


const createApp = async ({ db, publicPath }) => {
    const app = express();

    if (publicPath) {
        app.use(express.static(publicPath))
    }

    app.get("/api/stats", async (req, res) => {

    })

    app.get("/api/query", async (req, res) => {
        // read the query params
        const { limit, offset, type, model, conversation } = req.query;
        const query = req.query;
        const limitInt = parseInt(limit) || 100;
        const offsetInt = parseInt(offset) || 0;

        if (type !== 'conversations' && type !== 'responses') {
            res.json({ error: 'Invalid type' });
        }

        if (type === 'conversations') {
            const conversationMetrics = await db.select({
                id: schema.conversations.id,
                name: schema.conversations.name,
                model: schema.conversations.model,
                response_count: sql`cast(count(${schema.responses.id}) as int)`,
                total_input_tokens: sql`cast(sum(${schema.responses.inputTokens}) as int)`,
                total_output_tokens: sql`cast(sum(${schema.responses.outputTokens}) as int)`,
                last_response_timestamp: sql`max(${schema.responses.datetimeUtc})`
            })
                .from(schema.conversations)
                .leftJoin(schema.responses, eq(schema.conversations.id, schema.responses.conversationId))
                .groupBy(schema.conversations.id)
                .orderBy(({ last_response_timestamp }) => desc(last_response_timestamp))
                .limit(limitInt)
                .offset(offsetInt);
            res.json({ conversations: conversationMetrics });
        }

        if (type === 'responses') {
            const responses = await db.query.responses.findMany({
                // with: {
                //     conversation: true
                // },
                where: and(
                    query.model ? eq(responses.model, query.model) : undefined,
                    query.conversation ? eq(schema.responses.conversationId, query.conversation) : undefined
                ),
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