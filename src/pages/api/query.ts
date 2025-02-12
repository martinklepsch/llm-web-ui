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
    const conversations = await db.query.conversations.findMany({
        with: {
            responses: true
        },
    });
    return new Response(
        JSON.stringify({ conversations }),
    )
}