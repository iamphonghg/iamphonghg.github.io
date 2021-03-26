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
    ships: [{ positions: ["", "", ""], hits: ["", "", ""] }, 
            { positions: ["", "", ""], hits: ["", "", ""] },
            { positions: ["", "", ""], hits: ["", "", ""] }],
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
                        view.displayMessage("CÁI ĐJT CMN ẢO THẬT ĐẤY!");
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
    },
    generateShipPositions: function() {
        var positions;
        for (var i = 0; i < this.numShips; i++) {
            do {
                positions = this.generateShip();
            } while (this.collision(positions));
            this.ships[i].positions = positions;
        } 
    },
    generateShip: function() {
        var direction = Math.floor(Math.random() * 2);
        var row, col;
        if (direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
        } else {
            col = Math.floor(Math.random() * this.boardSize);
            row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
        }

        var newShipPositions = [];
        for (var i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipPositions.push(row + "" + (col + i));
            } else {
                newShipPositions.push((row + i) + "" + col);
            }
        }
        return newShipPositions;
    },
    collision: function(positions) {
        for (var i = 0; i < this.numShips; i++) {
            var ship = this.ships[i];
            for (var j = 0; j < positions.length; j++) {
                if (ship.positions.indexOf(positions[j]) >= 0) {
                    return true;
                }
            }
        }
        return false;   
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

function init() {
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;
    model.generateShipPositions();
}

function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value;
    controller.processGuess(guess);
    guessInput.value = "";
}

function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
}

window.onload = init;


