import { integer, sqliteTable, text, blob, } from "drizzle-orm/sqlite-core";
import { relations } from 'drizzle-orm';


export const migrations = sqliteTable("_llm_migrations", {
    name: text("name").primaryKey(),
    appliedAt: text("applied_at"),
});

export const conversations = sqliteTable("conversations", {
    id: text("id").primaryKey(),
    name: text("name"),
    model: text("model"),
});

export const conversationsRelations = relations(conversations, ({ many }) => ({
    responses: many(responses),
}));

export const responses = sqliteTable("responses", {
    id: text("id").primaryKey(),
    model: text("model"),
    prompt: text("prompt"),
    system: text("system"),
    promptJson: text("prompt_json"),
    optionsJson: text("options_json"),
    response: text("response"),
    responseJson: text("response_json"),
    conversationId: text("conversation_id").references(() => conversations.id),
    durationMs: integer("duration_ms"),
    datetimeUtc: text("datetime_utc"),
    inputTokens: integer("input_tokens"),
    outputTokens: integer("output_tokens"),
    tokenDetails: text("token_details"),
});

export const responsesRelations = relations(responses, ({ one }) => ({
    author: one(conversations, {
        fields: [responses.conversationId],
        references: [conversations.id],
    }),
}));

export const attachments = sqliteTable("attachments", {
    id: text("id").primaryKey(),
    type: text("type"),
    path: text("path"),
    url: text("url"),
    content: blob("content"),
});

// export const promptAttachmentsTable = sqliteTable("prompt_attachments", {
//     responseId: text("response_id").references(() => responsesTable.id),
//     attachmentId: text("attachment_id").references(() => attachmentsTable.id),
//     order: integer("order"),
// }, (table) => ({
//     pk: primaryKey(table.responseId, table.attachmentId),
// }));