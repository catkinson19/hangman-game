//Todo
//Fix the resizing of the graveyard

//Element Map
let gameGraveyard = document.getElementById('graveyard');
let gameSubject = document.getElementById('subject');
let gameWordLen = document.getElementById('wordLen');
let gameTries = document.getElementById('tries');
let gameTriesRem = document.getElementById('triesRem');
let gameWins = document.getElementById('wins');
let gameLosses = document.getElementById('losses');
let gameInputSpace = document.getElementById('inputSpace');

let hangman = {

    //Globals
    wins: 0,
    losses: 0,

    //Subjects
    animals: ['bear', 'zebra', 'penguin'],
    countries: ['argentina', 'mexico', 'switzerland'],
    foods: ['quinoa', 'salad', 'cheese'],

    updateDom: function (id, newval) {
        if (id === "graveyard") {
            return gameGraveyard.innerHTML = newval;
        }
        else if (id === "subject") {
            return gameSubject.innerHTML = newval;
        }
        else if (id === "wordLen") {
            return gameWordLen.innerHTML = newval;
        }
        else if (id === "tries") {
            return gameTries.innerHTML = newval;
        }
        else if (id === "triesRem") {
            return gameTriesRem.innerHTML = newval;
        }
        else if (id === "wins") {
            return gameWins.innerHTML = newval;
        }
        else if (id === "losses") {
            return gameLosses.innerHTML = newval;
        }
        else if (id === "inputSpace") {
            return gameInputSpace.innerHTML = newval;
        }
    },

    wordToArr: function (word) {
        let wordArr = []
        for (let i = 0; i <= word.length; i++) {
            wordArr.push(word[i]);
        }
        return wordArr;
    },

    //This method is weak sauce... Could have done this better by making an array of my subjects
    pickSubject: function () {
        let rand = Math.floor(Math.random() * 3 + 1);
        console.log(rand);
        if (rand === 1) {
            return "animals"
        }
        if (rand === 2) {
            return "countries";
        }
        if (rand === 3) {
            return "foods";
        }
    },

    randWord: function (subject) {
        let min = Math.ceil(0);
        let max = Math.floor(subject.length - 1);
        let rand = subject[Math.floor(Math.random() * (max - min + 1)) + min];
        return rand;
    },

    pickWordFromSubj: function (subject) {
        if (subject === "animals") {
            return hangman.wordToArr(hangman.randWord(hangman.animals));
        }
        if (subject === "countries") {
            return hangman.wordToArr(hangman.randWord(hangman.countries));
        }
        if (subject === "foods") {
            return hangman.wordToArr(hangman.randWord(hangman.foods));
        }
    },

    buildInputArray: function (len) {
        let arr = []
        for (let i = 0; i < (len - 1); i++) {
            arr.push("_");
        }
        return arr;
    },

    renderArray: function (arr) {
        return (arr.toString().toUpperCase().replace(/,/g, ""));
    },

    updateArray: function (position, key) {
        console.log(inputSpace);
        inputSpace.splice(position, 1, key);
        hangman.updateDom("inputSpace", hangman.renderArray(inputSpace));
    },

    increaseTries() {
        tries += 1;
        triesRem -= 1;
        hangman.updateDom("tries", tries);
        hangman.updateDom("triesRem", triesRem);
        //Call method here to swap image
    },

    //Add method here to swap image

    gameWin() {
        if (inputSpace.indexOf("_") === -1) {
            alert("Congratulations, a winner is you!");
            hangman.wins++;
            hangman.updateDom("wins", hangman.wins);
            hangman.startGame();
        }
    },

    gameLose() {
        if (triesRem === 0) {
            alert("You have dishonored yourself.");
            hangman.losses++;
            hangman.updateDom("losses", hangman.losses);
            hangman.startGame();
        }
    },

    handlePickedLetter() {
        let resultMatches = [];
        let guesses = [];
        let update = 0;

        console.log("word: " + word);
        document.onkeyup = function (e) {
            if ((e.which <= 90 && e.which >= 65) && (guesses.indexOf(e.key) === -1)) {
                let letter = e.key
                guesses.push(letter);
                let ind = word.indexOf(letter);

                if (ind !== -1) {
                    while (ind !== -1) {
                        resultMatches.push(ind);
                        update = ind;
                        ind = word.indexOf(letter, ind + 1);
                        console.log(resultMatches);

                        if (resultMatches.length > 0) {
                            console.log("Good Choice");
                            resultMatches.map(function (num) {
                                hangman.updateArray(update, word[num].toUpperCase());
                            });
                            resultMatches = [];
                            hangman.gameWin()
                        }
                    }
                }
                else {
                    console.log("Bad Choice");
                    hangman.increaseTries()
                    graveyard.push(letter.toUpperCase());
                    hangman.updateDom("graveyard", hangman.renderArray(graveyard));
                    hangman.gameLose()
                }
            }
        }
    },

    startGame: function (subject) {
        console.log("Starting Game");
        subject = hangman.pickSubject();
        word = hangman.pickWordFromSubj(subject);
        wordLen = word.length;
        inputSpace = hangman.buildInputArray(wordLen);
        graveyard = [];
        tries = 0;
        triesRem = 7;

        //Initial Render
        hangman.updateDom("wins", hangman.wins);
        hangman.updateDom("losses", hangman.losses);
        hangman.updateDom("graveyard", graveyard);
        hangman.updateDom("subject", subject);
        hangman.updateDom("wordLen", wordLen);
        hangman.updateDom("tries", tries);
        hangman.updateDom("triesRem", triesRem);
        hangman.updateDom("inputSpace", hangman.renderArray(inputSpace));

        //Run game
        hangman.handlePickedLetter();
    }
}

//Initialize
window.onload = function () {
    //Override
    hangman.startGame();
}