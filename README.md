# foodies_project5
Game of Set - JavaScript
Due: 11/10
The Foodies: Lauren Saggar, Abha Naik, Maxwell Giffin, Tejas Venkatachalam

Summary: This project creates an interactive website for users to play the "Game of Set" card game. The page creates a deck of all 81 possible cards and shuffles it. Next, 12 cards are drawn from the deck and displayed on the board, and the player can begin finding a set. Players select three cards by clicking on them, and if these three cards are a set, the three cards are replaced and points are awarded to the player that found the set. The player is notified if the cards they selected are not a set. Players can also ask for a hint when looking for a set that will tell them what one of the cards in the set is, leaving the player only needing to find the other two cards. If the player cannot find a set, the player should select "No Set" and 3 new cards are added to the board creating a total of 15 cards. Once a set is found from 15 cards, no new cards are dealt and the game continues with the remaining 12 cards on the board. The game ends when the deck has been depleted and no sets remain on the board!

Moreover, the program keeps track of the user's points and allows the user to reset the game at any time. The point system works as follows: If a user guess is correct and no hint is used, the Set is removed and 3 points are awarded to the player that found the set. If the player presses the hint button, the player may only receive 1 point for the next set found.

To create this site, we used HTML to set up the skeleton of the page, and styled it with CSS. The 'Cards are represented as javascript objects, which include the properties of the card, as well as an image to represent the card on the board. All of the game logic is also done in Javascript.

The testing portion of this was done using Jest. Some issues arose with Jest due to unfamiliarity with JavaScript testing and an error that we were not able to debug (that did not effect the game play) did prevent our test cases from passing. The team spoke with Charlie about this and he asked us to specify this in our ReadMe. 


Instructions:

1. To build the program, enter the following into the terminal from the src directory:

        $ firefox setPage.html

2. This command will open the Firefox browser and the user will be prompted near the top of the page to enter the number of players. Then the game will begin.

3. To select cards you believe are a set, click on the image for each card. Once three cards have been selected, you will be notified if the cards you selected are a set and if they are, they will be replaced with three new random remaining cards from the deck. To get help finding a set, you can press the hint button to see one of the cards in the set. The game completes when all cards are depleted from the deck and no matches exist on the current playing board. For more information aobut the rules of the game, press the rules button.

4. Have fun playing the Game of Set!

For testing:
This project uses jest for unit testing. If jest is not yet installed, run 'npm i --save-dev jest' in the command line. Then you will be able to run 'npm test' to run the test suite.