import db from "../database/connection.js";
import { rl } from "../utils/readline.js";
import { adminMenu } from "./adminMenu.js"

export function newClub(){
    console.log("\n--- Add new golf club ---\n");
    getClubName();
}

function getClubName(){
    rl.question('\nEnter Golf Club Name: ', (name)=>{
        if (!name || name.trim()===''){
            console.log("Please enter a valid golf club name");
            return getClubName();
        }
        getClubLocation(name.trim());
    })
}

function getClubLocation(name){
    rl.question('\nEnter Golf Club Location: ', (location)=>{
        if (!location || location.trim()===''){
            console.log("Please Enter a Valid Location");
            return getClubLocation(name);
        }
        saveClub(name, location.trim());
    })
}

function saveClub(name, location){
    db.run(`INSERT INTO clubs (name, location) VALUES (?, ?)`, [name, location],
    function(err){
        if(err){
            console.error('Error adding club: ', err.message);
        } else{
            console.log(`Successfully added: ${name} in ${location} (ID: ${this.lastID})`);
        }
        adminMenu();
    })
}