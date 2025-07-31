import readline from 'readline';

// An interface is a set of method signatures that a class must implement
// Maybe switch to inquirer later
export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});