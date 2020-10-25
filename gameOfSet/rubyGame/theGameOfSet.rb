# This class allows users to play The Game of Set by manipulating the cards
# in the deck and what's on the playing board based on the user's input.
#
#Authors: Lauren Saggar, Abha Naik, Max Giffin, and Tejas Venkatachalam

class DeckOfCards

    #mutable class variables
    @@currentBoard = Array.new(12) #4 rows, 3 columns
    @@points = 0

    def initialize
        @deck = []
        colors = %w{green red purple}
        numbers = %w{one two three}
        shapes = %w{oval diamond squiggle}
        fills = %w{empty partial solid}

        colors.each do |color|
            numbers.each do |number|
                shapes.each do |shape|
                    fills.each do |fill|
                        @deck.push(Card.new(color,number, shape, fill))
                    end
                end
            end
        end
    end

    def deck
        @deck
    end

    def currentBoard
        @@currentBoard
    end
    
    class Card

        def initialize(color, number, shape, fill)
            @color = color
            @number = number
            @shape = shape
            @fill = fill
        end

        def color
            @color
        end

        def number
            @number
        end

        def shape
            @shape
        end

        def fill
            @fill
        end
    end


    # Returns number of cards remaining in the deck
    def deckCount
        @deck.length
    end


    # Returns unique number of cards on the playing board
    def boardCountUnique
        @@currentBoard.uniq.length
    end


    # Loads the starting playing board with 12 cards at the beginning of a new game
    def loadBoard

        index = 0
        #Takes 12 cards off of the deck and places them on the current playing board
        while index < @@currentBoard.length
            @@currentBoard[index] = @deck.shuffle!.pop
            index = index + 1
        end  
    end


    #Prints the player's current playing board and points to the console
    def printBoard(playerPoints)

        index = 0
        puts "\n"
        while index < @@currentBoard.length
            (0..2).each do |x|

                #Prints player's current playing cards
                printf("%-3d   %-40s",index+1, @@currentBoard[index])
                index = index + 1
            end
            puts "\n\n"
        end

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
    end


    # Removes three cards forming a set from the current board (setArray holds positions
    # of cards forming a match)
    def removeSet(setArray,playerPoints)

        setArray.each do |pos|
            @@currentBoard[pos-1] = "  "
        end

        givePoints(playerPoints)
        
    end

    def givePoints(playerPoints)
        #Give points to the player that found the set
        #only asks which player if there is more than one player
        if(playerPoints.length>1)
            puts "Which Player found the Set?"
            playerNum = gets.chomp
        else
            playerNum = "1"
        end
        while (playerNum.to_i.to_s != playerNum || playerNum.to_i < 1 || playerNum.to_i > playerPoints.length) 
            print "That is not a valid option.\nPlease enter your choice again: "
            playerNum = gets.chomp     
        end
        playerPoints[playerNum.to_i-1] = playerPoints[playerNum.to_i-1] + 1
    end


    # Replaces three cards on the playing board with three new cards when a set is found
    def replaceThreeCards(setArray)
        
        setArray.each do |pos|
            @@currentBoard[pos-1] = @deck.pop

        end
    end


    # Adds three cards to the current playing board to create a total of 15 cards
    def addThreeCards

        (0..2).each do |x|
            @@currentBoard.push(@deck.pop)
        end
    end


   # Prompts for user input needed to evaluate a potential set and returns an array
   # of three sorted numeric values representing card board positions
    def getuserGuess

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


    #Returns a set as an array of the three cards or returns -1 if no match is found
    def findSet

        # Checks all possible card combinations of three for a valid set
        for i in 0..(@@currentBoard.length-3)

            for j in i+1..(@@currentBoard.length-2)

                for k in j+1..(@@currentBoard.length-1)
                    foundSet = checkUserMatch [@@currentBoard.at(i),@@currentBoard.at(j), @@currentBoard.at(k)]
                    if foundSet
                        return[@@currentBoard.at(i), @@currentBoard.at(j), @@currentBoard.at(k)]
                    end

                end
            end

        end 
        return [-1]
    end


    # Provides a hint to the player if triggered by the player
    def hint
        match = findSet
        if match.length > 1
            hintCard = match[0]
            print "\n***ONE OF THE CARDS IN THE MATCH IS: "
            puts hintCard
        else
            print "\n***THERE IS NO SET ON THE BOARD\n***ENTER NO SET ON YOUR NEXT TURN"
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

end
        

def to_s #cannot be inside the Deck Class!
    "#{@color} | #{@number} | #{@shape} | #{@fill}"
end



#MAIN STARTS HERE -----------
game = DeckOfCards.new

#Get number of players for game
numPlayers = game.getNumPlayers

#Create array for player points
$playerPoints = Array.new(numPlayers.to_i,0)


print "Welcome to The Game of Set!\n\n"
game.loadBoard

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
            game.printBoard($playerPoints)
            potentialSet = game.getuserGuess

            # Runs if player entered a set guess
            if potentialSet.length == 3
                foundSet = game.checkUserMatch([game.currentBoard.at(potentialSet[0]-1), game.currentBoard.at(potentialSet[1]-1), game.currentBoard.at(potentialSet[2]-1)])

                # If the player finds a set, new cards are dealt if they exist in the deck and the
                # set is found in a group of 12 cards. If the deck is out of cards, the game is over.
                if foundSet
                    puts "Good job! You found a set!\n"
                    game.removeSet(potentialSet,$playerPoints)
                    
                    # Finds another set on playing board before adding 3 cards if it exists
                    additionalSet = foundSet 

                    # Deals three more cards if they exist in the deck and set was found 
                    # in group of 12 cards (3 more cards are not dealt when set found on 15-card board)
                    if (game.deckCount == 0 && additionalSet.length == 1)
                        gameOver = true

                    elsif game.boardCountUnique == 10
                        game.replaceThreeCards(potentialSet)

                    end

                # If player enters an incorrect set sequence, they are asked whether or not they 
                # would like a hint and continue playing.
                else
                    print "\nThat is not a set. Would you like a hint? (Y or N): "
                    answer = gets.chomp
                    if (answer == "Y") || (answer == "y")
                        puts game.hint
                    end

                    puts "\nPlease try again: "
                end
            
            # Runs if player entered "no set". If there is indeed no set on the playing board,
            # three more cards are dealt. If the player was wrong, they are asked to try again.
            else 
                if potentialSet.length == 1
                    knownSet = game.findSet

                    if (knownSet.length == 1) #set does not exist

                        puts "Correct! The board does not contain a set.\n"
                        if game.deckCount >= 3
                            puts "Let's deal 3 more cards...\n\n"
                            game.addThreeCards
                        else
                            gameOver = true
                        end

                    else #set exists
                        puts "That is incorrect. A set does exist on this board.\n\n"
                        print "Would you like a hint? (Y or N): "
                        answer = gets.chomp
                        if (answer == "Y") || (answer == "y")
                            puts game.hint
                        end

                        puts "\nPlease try again: "

                    end

                end

            end

        elsif userInput == "2"
            game.printRules

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

game.printEnd($startTime, $playerPoints)

#MAIN ENDS HERE -------------
