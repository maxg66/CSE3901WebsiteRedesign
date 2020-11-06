# foodies_project5
Faculty Page Redesign
Due: 11/05
The Foodies: Lauren Saggar, Abha Naik, Maxwell Giffin, Tejas Venkatachalam

Summary: This project creates an interactive website for users to play the "Game of Set" card game. The page creates a deck of all 81 possible cards and shuffles it. Next, 12 cards are drawn from the deck and displayed on the board, and the player can begin finding a set. Players select three cards by clicking on them, and if these three cards are a set, the three cards are replaced and points are awarded to the player that found the set. The player is notified if the cards they selected are not a set. Players can also ask for a hint when looking for a set that will tell them what one of the cards in the set is, leaving the player only needing to find the other two cards.

To create this site, we used HTML to set up the skeleton of the page, and styled it with CSS. The 'Cards are represented as javascript objects, which include the properties of the card, as well as an image to represent the card on the board. All of the game logic is also done in Javascript.


Instructions:

1. To build the program, enter the following into the terminal from the src directory:

        $ firefox setPage.html

2. This command will open the Firefox browser and the user will be prompted near the top of the page to enter the number of players. Then the game will begin.

3. To select cards you believe are a set, click on the image for each card. Once three cards have been selected, you will be notified if the cards you selected are a set and if they are, they will be replaced with three new random remaining cards from the deck. To get help finding a set, you can press the hint button to see one of the cards in the set. The game completes when all cards are depleted from the deck and no matches exist on the current playing board. For more information aobut the rules of the game, press the rules button.

4. Have fun playing the Game of Set!