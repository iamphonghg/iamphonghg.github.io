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

