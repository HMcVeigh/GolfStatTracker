import db from '../database/connection.js';
import { showMenu } from '../index.js';
import { rl } from '../utils/readline.js';

export function recordRound(){
    console.log("\n--- Record New Round ---\n")
    rl.question("Enter Golf Club: ", (club) =>{
        // Check if entered club exists
        db.get(`SELECT COUNT(*) as count FROM clubs WHERE name = ?`, [club.trim()], (err, row)=>{
            if (err){
                console.error("Error Getting Club: ", err.message);
                return showMenu();
            }
            else if (row.count == 0){
                console.log("Club not found - try again or add new club in admin menu");
                return recordRound();
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
        db.get(`SELECT id FROM clubs WHERE name = ?`, [club.trim()], (err, row)=>{
            if (err){
                console.error("Error Getting ClubID: ", err.message);
                return showMenu();
            }
            else if (!row){
                console.log("Course not found - try again or add new course in admin menu");
                return recordRound();
            }
            else{
                let clubID = row.id;
                // Get course id where name and club id match
                db.get(`SELECT id FROM courses WHERE name = ? AND club_id = ?`, [course.trim(), clubID], (err, row)=>{
                    if (err){
                        console.error("Error Getting CourseID: ", err.message);
                        return showMenu();
                    }
                    else{
                        let courseID = row.id;
                    }
                })
            }
        });
    })
}