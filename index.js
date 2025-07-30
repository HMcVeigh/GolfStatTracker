#!/usr/bin/env node

import { exit } from 'node:process';
import readline from 'node:readline';
import { setupDatabase } from './database/setup.js';

setupDatabase();

// An interface is a set of method signatures that a class must implement
// Maybe switch to inquirer later
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu(){
    console.log("\n--- My Golf Tracker ---\n");
    console.log("1. Input New Round");
    console.log("2. View Past Round");
    console.log("3. Calculate Handicap");
    console.log("4. Exit");

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