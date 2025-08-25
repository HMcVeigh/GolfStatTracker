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

function getCourseName(id){
    console.log(id);
}