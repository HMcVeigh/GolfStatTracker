import db from "../database/connection.js";
import { rl } from "../utils/readline.js";
import { adminMenu } from "./adminMenu.js";

export function newCourse(){
    console.log("\n--- Add new golf course ---\n");
    getClubName();
}

function getClubName(){
    rl.question("Enter Name of golf club your new course belongs to: ", (name)=>{
        if (!name || name.trim() ===''){
            console.log("Please enter a valid golf club name.");
            return getClubName();
        }

        // Search for the club in the database
        db.get(`SELECT id, name, location FROM clubs WHERE name = ?`, [name.trim()], (err, row) =>{
            if (err){
                console.error('Error searching for club:', err.message);
                return getClubName();
            }

            if (row){
                // Club Found, continue with given club id
                console.log(`${row.name} in ${row.location}`);
                getCourseName(row.id);
            }
            else{
                console.log("\nClub not found. Please try again or add the club in admin menu\n");
                adminMenu();
            }
        })
    })
}

function getCourseName(clubId){
    rl.question("Enter Course Name: ", (courseName)=>{
        if (!courseName || courseName.trim() === ''){
            console.log("Please enter a valid course name");
            return getCourseName(clubId);
        }
        getPar(clubId, courseName.trim());
    })
}

function getPar(clubId, courseName){
    rl.question("Enter Par Score: ", (par)=>{
        if (!par || par.trim() === ''){
            console.log("Please enter a valid number");
            return getPar(clubId, courseName);
        }
        saveCourse(clubId, courseName, parseInt(par));
    })
}

function saveCourse(clubId, courseName, scoreToPar){
    db.run(`INSERT INTO courses (club_id, course_name, par_score) VALUES (?, ?, ?)`, [clubId, courseName, scoreToPar],
    function(err){
        if(err){
            console.error('Error adding course: ', err.message);
        } else{
            console.log(`Successfully added: ${courseName} (ID: ${this.lastID})`);
        }
        adminMenu();
    })
}