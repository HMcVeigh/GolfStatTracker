import { rl } from '../utils/readline.js';
import { newClub } from './manageClub.js';
import { showMenu } from '../index.js';
import { newCourse } from './manageCourse.js';

export function adminMenu(){
    console.log("\n---Admin Menu---\n");
    console.log("1. Add New Golf Club");
    console.log("2. Add New Golf Course");
    console.log("3. Back to Main Menu");

    rl.question('\nChoose an option (1-...): ', (answer) =>{
        switch(answer){
            case '1':
                newClub();
                break;
            case '2':
                newCourse();
                break;
            case '3':
                showMenu();
                break;
            default:
                console.log("Invalid Option, Try Again");
                adminMenu();
        }
    });
}