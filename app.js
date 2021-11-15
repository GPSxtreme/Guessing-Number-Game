//Fetch HighScore
if (localStorage.getItem("HIGH_SCORE")) {
    document.querySelector(".highscore").textContent = localStorage.getItem("HIGH_SCORE")
}

//Generate a random number
const RandomNumber = Math.trunc(Math.random() * 10) + 1;


//Store the local score
let score = 20;

//Clear Input and Focus Back
const clearInput = () => {
    // Remove the User Input Guess
    document.querySelector(".guess").value = ""
    // Focus back to Guess Input
    document.querySelector(".guess").focus();
}

//Clear Input at starting of the game
clearInput()

//Show Win or Loose on Guess Input
const displayOnGuessInput = (color, message) => {
    document.querySelector("body").style.background = color
    document.querySelector(".guess").setAttribute("type", "text")
    document.querySelector(".guess").value = message
    document.querySelector(".guess").setAttribute("disabled", true)
}
//Process Guess
const processGuess = () => {
    if (score != -1) {
        //Get guess from the Input Box
        const guess = Number(document.querySelector(".guess").value);
        if (guess) {
            // When a guess input number matches random number
            if (guess === RandomNumber) {
                // Display Correct Guess in message
                document.querySelector(".message").textContent = "Correct number!!";
                // Revealing Correct Number
                document.querySelector(".number").textContent = RandomNumber;
                // Modify guess input
                displayOnGuessInput("green", "gud")
                // Store the score if it is high score
                if (localStorage.getItem("HIGH_SCORE")) {
                    prevScore = localStorage.getItem("HIGH_SCORE")
                    if (prevScore < score) {
                        localStorage.setItem("HIGH_SCORE", score)
                        // Displaying Hi Score
                        document.querySelector(".highscore").textContent = score;
                    }
                } else {
                    localStorage.setItem("HIGH_SCORE", score)
                    // Displaying Hi Score
                    document.querySelector(".highscore").textContent = score;
                }
                // Set Score -1
                score = -1
            } else if (guess >= 10 || guess < 0) {
                // Display message for wrong input
                document.querySelector(".message").textContent = "Please select a number between 1 to 10! ";
                clearInput()
            } else if (score <= 0) {
                // Display Wrong Guess in message
                document.querySelector(".message").textContent = "Press Again to try again";
                document.querySelector(".guess").setAttribute("type", "text")
                displayOnGuessInput("red", "bad")
                // Set Score -1
                score = -1
            }
            else {
                // Display Wrong Guess in message
                document.querySelector(".message").textContent = "Wrong! Guess Again.";
                // Reduce the Score
                document.querySelector(".score").textContent = --score;
                clearInput()
            }

        } else {
            document.querySelector(".message").textContent = "You have to input some number";
        }
    }
}

// Listen on Enter
document.addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        processGuess()
    }

})
//Listen Check Button Click
document.querySelector(".check").addEventListener("click", function () {
    processGuess()
});

//When Again press reload
document.querySelector(".again").addEventListener("click", function reload() {
    location.reload();
});

//When Reset High Score pressed
document.querySelector(".reset-high-score").addEventListener("click", function () {
    localStorage.removeItem("HIGH_SCORE")
    // Displaying Hi Score
    document.querySelector(".highscore").textContent = 0;
});