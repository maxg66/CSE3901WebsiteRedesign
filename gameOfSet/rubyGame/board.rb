require './deck'

class Board

    def initialize(currentBoard)
        @currentBoard = currentBoard
    end

    def revealBoard
        @currentBoard
    end

    # Returns unique number of cards on the playing board
    def boardCountUnique
        @currentBoard.uniq.length
    end


    # Loads the starting playing board with 12 cards at the beginning of a new game
    def loadBoard(deck)

        index = 0
        #Takes 12 cards off of the deck and places them on the current playing board
        while index < @currentBoard.length
            @currentBoard[index] = deck.shuffle!.pop
            index = index + 1
        end  
    end


    #Prints the player's current playing board and points to the console
    def printBoard(playerPoints)

        index = 0
        puts "\n"
        while index < @currentBoard.length
            (0..2).each do |x|

                #Prints player's current playing cards
                printf("%-3d   %-40s",index+1, @currentBoard[index])
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
            @currentBoard[pos-1] = "  "
        end

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
            @currentBoard[pos-1] = @deck.pop

        end
    end


    # Adds three cards to the current playing board to create a total of 15 cards
    def addThreeCards

        (0..2).each do |x|
            @currentBoard.push(@deck.pop)
        end
    end

    #Returns a set as an array of the three cards or returns -1 if no match is found
    def findSet

        # Checks all possible card combinations of three for a valid set
        for i in 0..(@currentBoard.length-3)

            for j in i+1..(@currentBoard.length-2)

                for k in j+1..(@currentBoard.length-1)
                    foundSet = checkUserMatch [@currentBoard.at(i),@currentBoard.at(j), @currentBoard.at(k)]
                    if foundSet
                        return[@currentBoard.at(i), @currentBoard.at(j), @currentBoard.at(k)]
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
end