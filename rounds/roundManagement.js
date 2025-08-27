import db from '../database/connection.js';
import { showMenu } from '../index.js';
import { rl } from '../utils/readline.js';

export function recordRound(){
    console.log("\n--- Record New Round ---\n")
    rl.question("Enter Golf Club: ", (club) =>{
        // Check if entered club exists
        db.get(`SELECT COUNT(*) as count FROM clubs WHERE name = ?`, [club], (err, row)=>{
            if (err || row.count == 0){
                console.log("Entered club does not exist - have admin register club and try again");
                showMenu();
            }
            else{
                getCourse(club);
            }
        })
    })
}

function getCourse(club){
    rl.question(`Enter Course at ${club}: `, (course)=>{
        // Check that given course at location exists
        ;
    })
}