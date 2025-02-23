#!/usr/bin/env node



import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'client');

// console.log({ publicDir: publicDir })
// console.log({ __dirname })

import ViteExpress from "vite-express";
import { db, createApp } from "./src/server";

const dbPath = process.argv[2];

if (!dbPath) {
    console.error("DB path is required\n");
    console.log("   npx llm-web-ui $(llm logs path)\n\n");
    process.exit(1);
}

const app = await createApp({
    db: db('file:' + dbPath),
    publicPath: publicDir
});

ViteExpress.config({
    mode: process.env.NODE_ENV || 'production',
    verbosity: process.env.NODE_ENV === 'development' ? ViteExpress.Verbosity.Normal : ViteExpress.Verbosity.Silent,
    inlineViteConfig: publicDir ? {
        build: { outDir: publicDir }
    } : undefined
})

const PORT = 3044

ViteExpress.listen(app, PORT, () => {
    console.log("Server is listening…\n");
    console.log("   http://localhost:" + PORT + "/conversations");
    //console.log("   DB file: " + dbPath);
});