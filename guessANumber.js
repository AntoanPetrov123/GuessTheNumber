let colors = require('colors');

colors.enable()

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let basicNumber = 100;
let basicGuessTries = 14;

function guessTheNumber(maxNumber, guessTries) {
    let addPoints = 100;
    let computerGuess = Number(Math.floor(Math.random() * maxNumber));

    let recursiveAcyncreadLine = (guessTries) => {
        readline.question(`You have ${guessTries + 1} moves left \nGuess the number (0 - ${maxNumber}): `, number => {

            let guess = Number(number);

            if (guessTries > 0) {

                if (guess >= 0 && guess <= maxNumber) {
                    if (guess === computerGuess) {
                        console.log('You guess it!'.bold.yellow);

                        readline.question('Start next level y/n: ', answer => {
                            if (answer === 'y') {
                                maxNumber += addPoints;
                                basicGuessTries -= 2;
                                guessTheNumber(maxNumber, basicGuessTries);
                            } else {
                                return readline.close();
                            }
                        });
                    } else if (guess < computerGuess) {
                        console.log('Too Low!'.bold.green);
                        recursiveAcyncreadLine(--guessTries);
                    } else if (guess > computerGuess) {
                        console.log('Too High!'.bold.red);
                        recursiveAcyncreadLine(--guessTries);
                    }
                } else {
                    console.log('Invalid input! Try again...'.bold.underline.red);
                    recursiveAcyncreadLine(guessTries);
                }
            } else {
                console.log('Oops, you are out of moves...'.bold.underline.red);
                readline.question('Start again y/n: '.bold.underline.green, answer => {
                    if (answer === 'y') {
                        maxNumber = basicNumber;
                        guessTheNumber(maxNumber, basicGuessTries);
                    } else {
                        return readline.close();
                    }
                });
            }
        });
    }

    recursiveAcyncreadLine(guessTries);
}
guessTheNumber(basicNumber, basicGuessTries);
