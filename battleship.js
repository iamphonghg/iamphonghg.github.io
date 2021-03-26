var view = {
    displayMessage: function(message) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = message;
    },
    displayHit: function(position) {
        var positionHit = document.getElementById(position);
        positionHit.setAttribute("class", "hit");
    },
    displayMiss: function(position) {
        var positionMiss = document.getElementById(position);
        positionMiss.setAttribute("class", "miss");
    }
};

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [{ positions: ["06", "16", "26"], hits: ["", "", ""] }, 
            { positions: ["24", "34", "44"], hits: ["", "", ""] },
            { positions: ["10", "11", "12"], hits: ["", "", ""] }],
    fire: function(guess) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            var index = ship.positions.indexOf(guess);
            if (index >= 0) {
                if (ship.hits[index] != "hit") {
                    ship.hits[index] = "hit";
                    view.displayHit(guess);
                    view.displayMessage("HIT!");
                    if (this.isSunk(ship)) {
                        view.displayMessage("YOU SANK MY BATTLESHIP!");
                        this.shipsSunk++;
                    }
                    return true;
                } else {
                    view.displayMiss(guess);
                    view.displayMessage("You missed.")
                    return false;
                }
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You missed.")
        return false;
    },
    isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++) {
            if (ship.hits[i] !== "hit") {
                return false;
            }
        }
        return true;
    }
};

var controller = {
    guesses: 0,

    processGuess: function(guess) {
        var position = parseGuess(guess);
        if (position) {
            this.guesses++;
            var hit = model.fire(position);
            if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses.");
            }
        }
    }
};

function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    
    if (guess === null || guess.length !== 2) {
        alert("Oops, please enter a letter and a number on the board.");
    } else {
        var firstChar = guess.charAt(0).toUpperCase();
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);
        
        if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
        } else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
            alert("Oops, that's off the board!");
        } else {
            return row + column;
        }
    }
    return null;
}

controller.processGuess("a6");
controller.processGuess("b6");
controller.processGuess("C6");
controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");
controller.processGuess("B0");
controller.processGuess("B1");
controller.processGuess("B2");

