#!/usr/bin/env node
import ViteExpress from "vite-express";
import { db, createApp } from "./src/server";
import { Verbosity } from "vite-express";
import { getInstalledPath } from 'get-installed-path';

const dbPath = process.argv[2];

if (!dbPath) {
    console.error("DB path is required\n");
    console.log("   npx llm-web-ui $(llm logs path)\n\n");
    process.exit(1);
}

const app = await createApp({ db: db('file:' + dbPath) });

let distPath = null;
try {
    const installedPath = await getInstalledPath('llm-web-ui');
    distPath = installedPath + "/dist";
} catch (e) {
  console.log("could not determine path to app assets")
  console.error(e)

}

ViteExpress.config({
    mode: process.env.NODE_ENV || 'production',
    //verbosity: process.env.NODE_ENV === 'development' ? Verbosity.Normal : Verbosity.Silent
    inlineViteConfig: distPath ? {
        build: { outDir: distPath }
    } : undefined
})

ViteExpress.listen(app, 3000, () => {
    console.log("Server is listening…\n");
    console.log("   http://localhost:3000");
    console.log("   DB file: " + dbPath);
});