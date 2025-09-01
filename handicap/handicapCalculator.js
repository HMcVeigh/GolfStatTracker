import db from '../database/connection.js';
import { rl } from '../utils/readline.js';
import { showMenu } from '../index.js';

export function handicap(){
    console.log("\n--- Calculate Handicap ---\n");
    rl.question("Enter Player Name: ", (name) =>{
        if (!name || name.trim() === ''){
            console.log("Please enter a valid name");
            return handicap();
        }

        // Check if player exists
        db.get(`SELECT id FROM players WHERE name = ?`, [name.trim()], (err, row) =>{
            if (err){
                console.error("Error getting player: ", err.message);
                return showMenu();
            }
            else if (!row){
                console.log("Player not found - try again or add new player in admin menu");
                return handicap();
            }
            else{
                let playerID = row.id;
                calculateHandicap(playerID);
            }
        })
    })
}

function calculateHandicap(playerID){
    console.log("Calculating Handicap...");
    // Count rounds to check if player has enough for a handicap
    // if less than 5 rounds, inform user not enough rounds
    // if 5 rounds, get differentials from last 2 rounds
    // if 6-9 available, get best 3
    // if more get best 8
    db.get(`SELECT COUNT(*) as count FROM rounds WHERE player_id = ?`, [playerID], (err, row) =>{
        if (err){
            console.error("Error counting rounds: ", err.message);
            return showMenu();
        }
        else if (row.count < 5){
            console.log("Not enough rounds to calculate a handicap - minimum 5 rounds required");
            return showMenu();
        }
        else if (row.count == 5){
            getDifferentials(playerID, 2);
        }
        else if (row.count >=6 && row.count <=9){
            getDifferentials(playerID, 3);
        }
        else{
            getDifferentials(playerID, 8);
        }
    })
}

function getDifferentials(playerID, numScores){
    // Get the last numScores of rounds for the player
    db.all(`SELECT r.score, c.par_score, c.slope_rating 
            FROM rounds r 
            JOIN courses c ON r.course_id = c.id 
            WHERE r.player_id = ? 
            ORDER BY r.date DESC 
            LIMIT ?`, [playerID, numScores], (err, rows) =>{
        if (err){
            console.error("Error getting differentials: ", err.message);
            return showMenu();
        }
        else if (rows.length === 0){
            console.log("No rounds found for player");
            return showMenu();
        }
        else{
            let differentials = rows.map(row => {
                return ((row.score - row.par_score) * 113) / row.slope_rating;
            });
            let avgDifferential = differentials.reduce((a,b) => a + b, 0) / differentials.length;
            let handicapIndex = avgDifferential * 0.96;
            console.log(`\n${numScores} Round Handicap Index for Player: ${handicapIndex.toFixed(2)}\n`);
            return showMenu();
        }
    })
}
