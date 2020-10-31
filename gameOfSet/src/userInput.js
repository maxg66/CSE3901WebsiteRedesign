
// Prompts user for a new guess
function getUserGuess(boardCountUnique) {
    let potentialSet = [];
    let valResponse = "";
    let userGuess = document.getElementById("uGuess").value;

    if (userGuess === "no set") {
        potentialSet = [-1];
        valResponse = "No set is a valid response.";
        document.getElementById("validate").innerHTML = valResponse;

    } else {
        let regex = new RegExp(/[1-9]\d*(,[1-9]\d*){2}/);
        if (!regex.test(userGuess)) {
            valResponse = "Your input was in the incorrect format. Please try again.";
            document.getElementById("validate").innerHTML = valResponse;

        } else {
            // Convert user input string to an array using "," as the delimeter
            potentialSet = userGuess.split(",");

            // Convert all string in the array to integers
            potentialSet.forEach(function(elt,i,a) {
                return parseInt(elt);
            });

            // Sort the array elements from least to greatest
            potentialSet.sort(function(a,b) {return a-b;});

            // Check for duplicates
            duplicateFound = false;
            let i = 0;
            while (!duplicateFound && i < 2) {
                if (potentialSet.indexOf(potentialSet[i]) != potentialSet.lastIndexOf(potentialSet[i])) {
                    duplicateFound = true;
                }
                i++;
            }

            // Ensure that potentialSet has 3 entries
            if (potentialSet.length != 3) {
                valResponse = "You must enter 3 values. Please try again.";
                document.getElementById("validate").innerHTML = valResponse;

            // Check for entries out of numerical bounds
            } else if (potentialSet[0] < 1 || (potentialSet[potentialSet.length - 1] > 12 && boardCountUnique == 12) || (potentialSet[potentialSet.length - 1] > 15 && boardCountUnique == 15)) {
                valResponse = "One or more of your guess values are out of bounds. Please try again.";
                document.getElementById("validate").innerHTML = valResponse;
            
            // Check for duplicate entries
            } else if (duplicateFound) {
                valResponse = "Your input contains duplicate entries. Please try again.";
                document.getElementById("validate").innerHTML = valResponse;
                
            // Input is valid    
            } else {
                valResponse = "Valid response.";
                document.getElementById("validate").innerHTML = valResponse;
            }
        }
    }
    return potentialSet;
}


// Prompts the user to enter the number of players for the current game
function getNumPlayers() {

    document.getElementById("welcome").innerHTML = "Welcome to the Game of Set!\nHow many players will be playing today?\n";

    let players = document.getElementById("numPlayers").value;

    if (isNaN(players) || players <= 0) {
        document.getElementById("playerError").innerHTML = "Invalid player number";
    } else {
        document.getElementById("playerError").innerHTML = "";
    }
    
    return parseInt(players);
}

