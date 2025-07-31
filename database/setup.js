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

    db.run(`CREATE TABLE IF NOT EXISTS courses(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        club_id INTEGER,
        course_name TEXT NOT NULL,
        par_score INTEGER NOT NULL,
        FOREIGN KEY (club_id) REFERENCES clubs (id)
    )`)

    db.run(`CREATE TABLE IF NOT EXISTS rounds(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        club_id INTEGER,
        course_id INTEGER,
        player_id INTEGER,
        score INTEGER NOT NULL, 
        FOREIGN KEY (club_id) REFERENCES clubs (id),
        FOREIGN KEY (course_id) REFERENCES courses (id),
        FOREIGN KEY (player_id) REFERENCES players (id)
    )`)
}