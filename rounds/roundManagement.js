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
                console.log("Club not found");
                return recordRound();
            }
            else{
                let clubID = row.id;
                // Get course id where name and club id match
                db.get(`SELECT id FROM courses WHERE course_name = ? AND club_id = ?`, [course.trim(), clubID], (err, row)=>{
                    if (err){
                        console.error("Error Getting CourseID: ", err.message);
                        return showMenu();
                    }
                    else if(!row){
                        console.log("Course not found - change spelling or add course in admin menu");
                        return recordRound();
                    }
                    else{
                        let courseID = row.id;
                        getScore(clubID, courseID)
                    }
                })
            }
        });
    })
}

function getScore(clubID, courseID){
    // Get score and do some verification
    rl.question("Enter your numeric score after 18 holes (e.g. 75): ", (score) =>{
        if (!score || score.trim() == ''){
            console.log("Please enter a score\n");
            return getScore(clubID, courseID);
        }
        const numScore = parseInt(score.trim());
        if (!isNaN(numScore)){
            saveRound(clubID, courseID, numScore);
        }
        else{
            console.log("Enter a valid number between 50 and 160\n");
            return getScore(clubID, courseID);
        }
    })
}

function saveRound(clubID, courseID, numScore){
    const tempPlayerID = 1;
    db.run(`INSERT INTO rounds (club_id, course_id, player_id, score) VALUES (?,?,?,?)`,
        [clubID, courseID, tempPlayerID, numScore], (err)=>{
            if (err){
                console.error("Error adding round: ", err.message);
            }
            else{
                console.log(`Successfully added round`);
            }
            showMenu();
        }
    )
}