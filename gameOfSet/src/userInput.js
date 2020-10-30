
function getUserGuess(boardCountUnique) {
    let potentialSet = [];
    let userGuess = document.getElementById("uGuess").value;
    let correctFormat = false;
    valResponse = "";

    while (!correctFormat) {

        if (userGuess == "no set") {
            correctFormat = true;
            potentialSet = [-1];
    
        } else {
            let regex = new RegExp("/[1-9]\d*(,[1-9]\d*){2}/")
            if (!regex.test(userGuess)) {
                valResponse = "Your input was in the incorrect format. Please try again."
                document.getElementById("validate").innerHTML = valResponse;
                userGuess = document.getElementById("uGuess").value;

            } else {
                potentialSet = userGuess.split(",");
                potentialSet.sort(function)
            }
    }
}


def getUserGuess(boardCountUnique)

    potentialSet = []
    print "Please enter your guess separated by commas (Ex: 1,2,3) or no set: "
    userGuess = gets.chomp

    if (userGuess == "no set") 
        potentialSet = [-1]

    else 
        # Converts user input to an array of string values using "," as the delimeter 
        userGuess = userGuess.split ","

        # Maps userGuess to an array (called potentialSet) of numerically sorted values
        potentialSet = userGuess.map {|value| value.to_i}.sort

        # Continues to prompt fo new user input until valid (user input must contain 3 
        # unique values between 1 and 12 or 1 and 15 depending on number of cards on playing board
        while (potentialSet.uniq.length != 3) || (potentialSet[0] < 1) || 
            ((potentialSet[(potentialSet.length) -1] > 12) && (boardCountUnique == 12)) ||
            ((potentialSet[(potentialSet.length) -1] > 15) && (boardCountUnique == 15))
            
            print "Your input was in the incorrect format.\nPlease try again: "
            userGuess = gets.chomp

            if (userGuess == "no set") 
                potentialSet = [-1]
                break
            else
                userGuess = gets.split ","
                potentialSet = userGuess.map {|value| value.to_i}.sort
            end
        end

    end
    potentialSet
    #print "\n"
end