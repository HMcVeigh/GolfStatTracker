import db from './connection.js';

export function setupDatabase(){
    // Create players table
    db.run(`CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        handicap REAL DEFAULT 36
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS clubs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        location TEXT NOT NULL
    )`);

    console.log("Database tables created");
}