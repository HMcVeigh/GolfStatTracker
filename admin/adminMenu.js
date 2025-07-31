import { rl } from '../utils/readline.js';

export function adminMenu(showMainMenu){
    console.log("\n---Admin Menu---\n");
    console.log("1. Add New Golf Club\n");
    console.log("2. Back\n")

    rl.question('\nChoose an option (1-...): ', (answer) =>{
        switch(answer){
            case '1':
                newClub();
                break;
            case '2':
                showMainMenu();
                break;
            default:
                console.log("Invalid Option, Try Again");
                adminMenu();
        }
    });
}