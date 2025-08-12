#!/usr/bin/env node

import { exit } from 'node:process';
import { rl } from './utils/readline.js';
import { setupDatabase } from './database/setup.js';
import { adminMenu } from './admin/adminMenu.js'

setupDatabase();

export function showMenu(){
    console.log("\n--- My Golf Tracker ---\n");
    console.log("1. Input New Round");
    console.log("2. View Past Round");
    console.log("3. Calculate Handicap");
    console.log("4. Admin Menu");
    console.log("5. Exit");

    rl.question('\nChoose an Option (1-4): ', (answer) => {
        switch(answer){
            case '1': 
                recordRound();
                break;
            case '2':
                viewRound();
                break;
            case '3':
                viewHandicap();
                break;
            case '4':
                adminMenu();
                break;
            case '5':
                console.log("Goodbye!")
                exit();
            default:
                console.log("Invalid Option, Try again");
                showMenu();
        }
    });
}

function recordRound(){
    console.log("\nRecording Round...");
    showMenu();
}

function viewRound(){
    console.log("\nViewing Round...");
    showMenu();
}

function viewHandicap(){
    console.log("\nViewing Handicap...");
    showMenu();
}

showMenu();