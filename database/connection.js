import sqlite3  from 'sqlite3';
import { fileURLToPath } from 'node:url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create database given path and handle errors
const dbpath = path.join(__dirname, 'golf.db');
const db = new sqlite3.Database(dbpath, (err) => {
    if(err){
        console.error("Error opening database: ", err.message);
    } else{
        console.log("Connected to SQLite database");
    }
});

export default db;