require './card'
require './deck'
require './board'

# This class allows users to play The Game of Set by manipulating the cards
# in the deck and what's on the playing board based on the user's input.
#
#Authors: Lauren Saggar, Abha Naik, Max Giffin, and Tejas Venkatachalam


# Prompts for user input needed to evaluate a potential set and returns an array
# of three sorted numeric values representing card board positions
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


# Returns true if player's chosen group of three cards is a set; returns false otherwise
def checkUserMatch(positionSet)

    attributeCounts = []
    # Checks the number of unique values in each attribute type (color, number, shape, and fill) 
    # and if any of these attributes has 2 unique values, the potential match is not a valid set 
    attributeCounts << positionSet.uniq {|x| x.color}.size
    attributeCounts << positionSet.uniq {|x| x.number}.size
    attributeCounts << positionSet.uniq {|x| x.shape}.size
    attributeCounts << positionSet.uniq {|x| x.fill}.size

    match = true
    if attributeCounts.include? 2 
        match = false
    else
        match = true
    end
end


# Prints the game rules for the player to view in the console
def printRules
    
    puts "\nThe objective of this game is create a set of 3 cards from the 12 on the board.\n\n", "Each card has 4 properties:","Color - Red, Green, or Purple", "Number of Shapes - 1, 2, or 3",
    "Shape - Oval, Squiggle, or Diamond", "Shading - Solid, Partial, Outlined","\nEx: green | one | oval | empty \nThis would be a card with the properties of green for color, \n1 for number of shapes, oval for shape, and empty for shading.", 
    "\nA Set consists of 3 cards in which each of the card's properties is the same on each card or different on each card","\nThe Play", "\nThe deck of 81 cards is shuffled and then 12 are displayed.\nThere are no turns - any player can then call out a set when they find one.",
    "\nIf correct, the Set is removed and 1 point is awarded to the player that found the set.\nThe player that found the sent would then enter their Player Number when prompted", 
    "\nThen, 3 new cards from the deck replace the cards just removed.",
    "If incorrect, the cards remain on the board.",
    "\nIf all players agree that a set cannot be found, 3 new cards are added to the board creating a board of 15 cards total.", 
    "\nOnce a set is found from 15 cards, no new cards are dealt and the game countines with the remaining 12 cards on the board",
    "\nThe game ends when the deck has been depleted. The player with the most points at this time wins!\n\n"

end


# Displays a thank you and player's end game results in the console
def printEnd(startTime, playerPoints)
    puts "\nThanks for playing The Game of Set.\n\n"
    index = 0
    while index < playerPoints.length
        # Prints player's points
        if playerPoints[index] == 1
            puts "Player #{index + 1} has #{playerPoints[index]} point\n\n"
        else
            puts "Player #{index + 1} has #{playerPoints[index]} points\n\n"
        end     

        index = index + 1
        
    end
    $elapsedTime =  Time.now - $startTime
    puts "Game Duration:  #{Time.at($elapsedTime).utc.strftime("%M:%S")}\n"
    puts "\nGoodbye!"        
end

# Prompts the user to enter the number of players for the current game
def getNumPlayers
    puts "Welcome to the Game of Set!\n "
    print "How many players will be playing today?: "
    numPlayers = gets.chomp
    while (numPlayers.to_i.to_s != numPlayers )
        print "That is not a valid option.\nPlease enter your choice again: "
        numPlayers = gets.chomp     
    end

    return numPlayers
end



#MAIN STARTS HERE -----------
currentDeck = Deck.new

# Create current board
currentBoard = Board.new(Array.new(12))

#Get number of players for game
numPlayers = getNumPlayers

#Create array for player points
playerPoints = Array.new(numPlayers.to_i,0)


print "Welcome to The Game of Set!\n\n"
currentBoard.loadBoard(currentDeck.deck)

# Displays game introduction
puts "The game will start in...."
sleep 1
puts "3"
sleep 1
puts "2"
sleep 1
puts "1"
sleep 1
puts "Begin!\n\n"
sleep 1

$startTime = Time.now

playAgain = true
# Continue playing The Game of Set until the user does not want to play anymore
while playAgain

    gameOver = false
    # The game continues until the deck runs out of cards
    while !gameOver

        puts "\nHit any key to continue playing or Type 'M' to view the Menu"
        userChoice = gets.chomp
        if userChoice == "m" || userChoice ==  "M"

            puts("\nPlease enter the option number that best fits your query: \n")
            puts("1. Continue playing\n2. View Rules\n3. View Time Elapsed\n4. Start Over\n5. Quit the Game\n")
            
            print("\nOption Number: ")
            userInput = gets.chomp
            while (userInput.to_i.to_s != userInput || userInput.to_i < 1 || userInput.to_i > 5) 
                print "That is not a valid option.\nPlease enter your choice again: "
                userInput = gets.chomp     
                puts "\n"  
            end
        else 
            userInput = "1"
        end


        if userInput == "1"
            currentBoard.printBoard(playerPoints)
            potentialSet = getUserGuess(currentBoard.boardCountUnique)

            # Runs if player entered a set guess
            if potentialSet.length == 3
                foundSet = checkUserMatch([currentBoard.revealBoard.at(potentialSet[0]-1), currentBoard.revealBoard.at(potentialSet[1]-1), currentBoard.revealBoard.at(potentialSet[2]-1)])

                # If the player finds a set, new cards are dealt if they exist in the deck and the
                # set is found in a group of 12 cards. If the deck is out of cards, the game is over.
                if foundSet
                    puts "Good job! You found a set!\n"
                    currentBoard.removeSet(potentialSet,playerPoints)
                    
                    # Finds another set on playing board before adding 3 cards if it exists
                    additionalSet = foundSet 

                    # Deals three more cards if they exist in the deck and set was found 
                    # in group of 12 cards (3 more cards are not dealt when set found on 15-card board)
                    if (currentDeck.deckCount == 0 && additionalSet.length == 1)
                        gameOver = true

                    elsif currentBoard.boardCountUnique == 10
                        currentBoard.replaceThreeCards(potentialSet)

                    end

                # If player enters an incorrect set sequence, they are asked whether or not they 
                # would like a hint and continue playing.
                else
                    print "\nThat is not a set. Would you like a hint? (Y or N): "
                    answer = gets.chomp
                    if (answer == "Y") || (answer == "y")
                        puts currentBoard.hint
                    end

                    puts "\nPlease try again: "
                end
            
            # Runs if player entered "no set". If there is indeed no set on the playing board,
            # three more cards are dealt. If the player was wrong, they are asked to try again.
            else 
                if potentialSet.length == 1
                    knownSet = currentBoard.findSet

                    if (knownSet.length == 1) #set does not exist

                        puts "Correct! The board does not contain a set.\n"
                        if currentBoard.deckCount >= 3
                            puts "Let's deal 3 more cards...\n\n"
                            currentBoard.addThreeCards
                        else
                            gameOver = true
                        end

                    else #set exists
                        puts "That is incorrect. A set does exist on this board.\n\n"
                        print "Would you like a hint? (Y or N): "
                        answer = gets.chomp
                        if (answer == "Y") || (answer == "y")
                            puts currentBoard.hint
                        end

                        puts "\nPlease try again: "

                    end

                end

            end

        elsif userInput == "2"
            printRules

        elsif userInput == "3"
            $elapsedTime =  Time.now - $startTime
            puts "Elapsed Time:  #{Time.at($elapsedTime).utc.strftime("%M:%S")}\n"
        
        elsif userInput == "4"
            gameOver = true
            
        else userInput == "5"
            gameOver = true
            playAgain = false
        end

    end

    # Prints end of game message to console and asks user if they want to play again
    if playAgain == true
        puts("\n\nWould you like to play again? (Y or N): ")
        answer = gets.chomp
        if (answer == "N") || (answer == "n")
            playAgain = false
        end
    end
end

currentBoard.printEnd($startTime, $playerPoints)

#MAIN ENDS HERE -------------
