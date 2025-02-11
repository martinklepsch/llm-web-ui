import type { APIRoute } from 'astro'
import * as schema from '@/db/schema';
import { drizzle } from 'drizzle-orm/libsql';
const db = drizzle({
    schema,
    connection: {
        url: import.meta.env.DB_FILE_NAME!
    }
});

export const GET: APIRoute = async () => {
    // const users = await db.select().from(conversationsTable).leftJoin(responsesTable,
    //     eq(conversationsTable.id,
    //         responsesTable.conversationId));
    const conversations = await db.query.conversations.findMany({
        with: {
            responses: true
        },
    });
    console.log('Getting all conversations from the database: ', conversations)
    return new Response(
        JSON.stringify({
            greeting: 'Hello',
        }),
    )
}