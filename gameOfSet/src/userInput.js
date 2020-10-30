
function getUserGuess(boardCountUnique) {
    let potentialSet = [];
    let userGuess = document.getElementById("uGuess").value;
    let correctFormat = false;
    valResponse = "";

    while (!correctFormat) {

        correctFormat = true; // The cases below could invalidate the correct format

        if (userGuess == "no set") {
            potentialSet = [-1];
    
        } else {
            let regex = new RegExp("/[1-9]\d*(,[1-9]\d*){2}/")
            if (!regex.test(userGuess)) {
                valResponse = "Your input was in the incorrect format. Please try again."
                document.getElementById("validate").innerHTML = valResponse;
                correctFormat = false;

            } else {
                // Convert user input string to an array using "," as the delimeter
                potentialSet = userGuess.split(",");

                // Convert all string in the array to integers
                potentialSet.foreach(function(elt,i,a) {
                    return parseInt(elt);
                });

                // Sort the array elements from least to greatest
                potentialSet.sort(function(a,b) {return a-b;});

                // Check for correct number of entries
                if (potentialSet.length > 3) {
                    valResponse = "You entered more than three values. Please try again."
                    document.getElementById("validate").innerHTML = valResponse;
                    correctFormat = false;
                
                // Check for entries out of numerical bounds
                } else if (potentialSet[0] < 1 || (potentialSet[potentialSet.length - 1] > 12 && boardCountUnique == 12) || (potentialSet[potentialSet.length - 1] > 15 && boardCountUnique == 15)) {
                    valResponse = "One or more of your guess values are out of bounds. Please try again."
                    document.getElementById("validate").innerHTML = valResponse;
                    correctFormat = false;
                
                // Check for duplicate entries
                } else {
                    duplicateFound = false;
                    let i = 0;
                    while (!duplicateFound && i < 2) {
                        if (potentialSet.indexOf(potentialSet[i]) != potentialSet.lastIndexOf(potentialSet[i])) {
                            duplicateFound = true;
                            valResponse = "Your input contains duplicate entries. Please try again."
                            document.getElementById("validate").innerHTML = valResponse;
                            correctFormat = false;
                        }
                    }
                    
                }
                if (correctFormat === false) {
                    getUserGuess = document.getElementById("uGuess").value;
                } else {
                    valResponse = "Valid response."
                    document.getElementById("validate").innerHTML = valResponse;
                }
            }
        }
    }
    return potentialSet;
}


