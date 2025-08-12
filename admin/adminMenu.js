import { rl } from '../utils/readline.js';
import { newClub } from './manageClub.js';
import { showMenu } from '../index.js';

export function adminMenu(){
    console.log("\n---Admin Menu---\n");
    console.log("1. Add New Golf Club\n");
    console.log("2. Back\n")

    rl.question('\nChoose an option (1-...): ', (answer) =>{
        switch(answer){
            case '1':
                newClub();
                break;
            case '2':
                showMenu();
                break;
            default:
                console.log("Invalid Option, Try Again");
                adminMenu();
        }
    });
}