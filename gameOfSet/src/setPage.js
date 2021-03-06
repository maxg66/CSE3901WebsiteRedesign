//Declare Card Class
class Card {
  constructor(color,number,shape,fill){
    this.color = color;
    this.number = number;
    this.shape = shape;
    this.fill = fill;
    this.image = "setImages/"+color+number+shape+fill+".JPG"
  }
  printCard() {
    return this.number + " " + this.color + " " + this.shape + " with a fill of " + this.fill;
  }

}

//Declare Deck Class
class Deck {
  constructor() {
    this.deck = new Array();
    this.currentBoard = new Array(12);
  }

//Method to populate deck
  generateDeck() {
    const colors = ['red', 'green', 'purple']; //Define Color
    const numbers = ['one', 'two', 'three']; //Define Numbers
    const shapes = ['oval', 'diamond','squiggle']; //Define Shapes
    const fills = ['empty', 'partial', 'full']; //Define Fills
    
    // Create all cards in deck
    for (let color in colors){
      for (let number in numbers){
        for (let shape in shapes){
          for (let fill in fills){
            this.deck.push(new Card(colors[color],numbers[number],shapes[shape],fills[fill]));
          }
        }
      }
    }
  }

  // Shuffles the deck of cards at the beginning of the game
  shuffle() {
    for (let i = this.deck.length-1; i >= 0; i--) {
      let tempValue = this.deck[i];
      let randomDeckIndex = Math.floor(Math.random() * this.deck.length);

      // Ensure that current index i and randomly generated index are not the same (a swap occurs
      // on every iteration through for loop)
      while (randomDeckIndex == i) {
        randomDeckIndex = Math.floor(Math.random() * this.deck.length);
      }

      this.deck[i] = this.deck[randomDeckIndex];  // replace pos i value with random pos value
      this.deck[randomDeckIndex] = tempValue;  // replace random pos value with pos i
    }
  }


  // Loads 12 cards onto the playing board at the beginning of each game
  loadBoard() {
    for(let i = 0; i < this.currentBoard.length; i++){
      this.currentBoard[i] = this.deck.pop();
    }
  }


  // Prints the current board of cards (12 or 15 cards depending on state of game)
  printBoard() {
    for( let i = 0; i < this.currentBoard.length; i++) {
      document.getElementById("card "+i).innerHTML = "<img src=\"" + this.currentBoard[i].image + "\">";
      document.getElementsByTagName("td")[i].addEventListener("click", clickCard);
      document.getElementsByTagName("td")[i].addEventListener("click", addCardBorder);
    }  
  }

  // Clears the current cards, borders, and event listeners from the current board
  clearBoard() {
    for(let i = 0; i < document.getElementsByTagName("td").length - 1; i++) {
      document.getElementById("card "+i).innerHTML = "";
      document.getElementsByTagName("td")[i].removeEventListener("click", clickCard);
      document.getElementsByTagName("td")[i].removeEventListener("click", addCardBorder);
      document.getElementById("card "+i).classList.remove("cardBorder");
    }
  }


  // When a set is found, this method prints a message to the user, removes the set from the current
  // board, and replaces those three cards with 3 new cards from the deck if the deck has at least 3 
  // remaining cards; If no set is found, a message is simply printed in the browser.
  // Returns true if user guess is a set and false otherwise.
  handleUserGuess(positionSet) {

    // Remove border around selected cards
    this.clearBoard();

    let guessIsSet = this.checkUserMatch(positionSet);

    // Handle found set if user's guess is a set
    if (guessIsSet) {
      document.getElementById("setMessage").innerHTML = "Set found!";

      // Remove three cards in set from board and replace them with three new cards from deck                                                        
      if (this.deck.length > 3 && this.currentBoard.length == 12) {
        for (let i = 0; i < 3; i++) {
          this.currentBoard.splice(positionSet[i],1,this.deck.pop());
        }

      // Simply remove cards in found set if no more cards or set found on board of 15 cards
      } else {
        for (let i = 0; i < 3; i++) {
          this.currentBoard.splice(positionSet[i],1);
        }

        // End game if no more cards on deck
        if (this.findSet().length == 1) {
          this.gameOver();
        }
      }

      // Print message to browser if the user's guess is not a set
    } else {
      document.getElementById("setMessage").innerHTML = "That is not a set. Please try again.";
    }

    return guessIsSet;
  }

  // Disables all buttons and cards and displays an "end game" popuup
  gameOver() {
    // Disable all cards
    let cards = document.getElementsByTagName("td");
    for (let i = 0; i < cards.length; i++) {
      cards[i].disabled = true;
    }

    // Disable all buttons
    let buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }

    // Contains div for end of game message popup
    let endOfGame = document.getElementById("end");
    endOfGame.style.display = "block";

    // Get the <span> element that closes the end game
    var endSpan = document.getElementById("endClose");

    // When the user clicks on <span> (x), close the end game popup
    endSpan.addEventListener("click", function() {
      endOfGame.style.display = "none";
    });

    // When the user clicks anywhere outside of the end game popup, close it
    window.addEventListener("click", function(event) {
      if (event.target == endOfGame) {
        endOfGame.style.display = "none";
      }
    });
  }

  // Adds three cards to the deck when no set can be found on current playing board
  addThreeCards() { 
    for (let i = 0; i < 3; i++) {
        this.currentBoard.push(this.deck.pop());
    }
  }

  // This method returns a position array of the first found set on the current board 
  // or [-1] if no set exists on the current board
  findSet() {                         
    for (let i = 0; i < this.currentBoard.length-3; i++) {
      for (let j = i +1; j < this.currentBoard.length-2; j++) {
        for (let k = j+1; k < this.currentBoard.length-1;k++) {
            let potenSet = [i, j, k];
            let foundSet = this.checkUserMatch(potenSet);
            if (foundSet) {
              return potenSet;
            }
        }
      }
    }
    return [-1];
  }

  // Provides hint to user about one of the cards in a set on the current playing board if a set exists, 
  // otherwise
  hint () {
    let set = this.findSet();

    if (set.length > 1) {
      document.getElementById("hintAnswer").innerText = "Hint: The card with a light green border is part of a set.";
      let cardInHint = document.getElementById("card " + set[0]);
      cardInHint.classList.add("hintBorder");
      setTimeout(function() {
        cardInHint.classList.remove("hintBorder");
        document.getElementById("hintAnswer").innerText = "";
      }, 4000)
      
    } else {
      document.getElementById("hintAnswer").innerText = "There are no sets on the board. Press the \"No Set\" button to add three cards to the board.";
    }
  }

  // Returns true if the user's guess is a set; otherwise, returns false
  checkUserMatch(positionSet) {
    let attributeCounts = [];

    let cardSet = [];
    for (let i = 0; i < positionSet.length; i++) {
      cardSet.push(this.currentBoard[positionSet[i]]);
    }

    // Color check
    let temp = [];
    for (let i = 0; i < cardSet.length; i++) {
      if (!temp.includes(cardSet[i].color)) {
        temp.push(cardSet[i].color);
      }
    }
    attributeCounts.push(temp.length);

    // Number check
    temp = [];
    for (let i = 0; i < cardSet.length; i++) {
      if (!temp.includes(cardSet[i].number)) {
        temp.push(cardSet[i].number);
      }
    }
    attributeCounts.push(temp.length);

    // Shape check
    temp = [];
    for (let i = 0; i < cardSet.length; i++) {
      if (!temp.includes(cardSet[i].shape)) {
        temp.push(cardSet[i].shape);
      }
    }
    attributeCounts.push(temp.length);

    // Fill check
    temp = [];
    for (let i = 0; i < cardSet.length; i++) {
      if (!temp.includes(cardSet[i].fill)) {
        temp.push(cardSet[i].fill);
      }
    }
    attributeCounts.push(temp.length);

    if (attributeCounts.indexOf(2) < 0) {
      return true;
    } else {
     return false;
    }
  }
}




/*------------ CODE OUTSIDE OF THE CARD AND DECK CLASSES ---------------*/
// Initialize a new deck
let fullDeck = new Deck();

fullDeck.generateDeck();
fullDeck.shuffle();
fullDeck.loadBoard();
fullDeck.printBoard();
let numClickedCards = 0;  // keeps track of number of cards clicked
let potentialSet = [];  // keeps track of user's clicks 
let userScore = 0;  // keeps track of user score
let setFound = false;  // set to true when set is found
let hintClicked = false;  // used to allot proper number of points to user based on if hint is clicked or not


// Displays a hint to the user when the hint button is clicked
let hintButton = document.getElementById("hintBtn");
hintButton.addEventListener("click", function() {
  fullDeck.hint();
  hintClicked = true;
})

// Adds a border around the calling object (a card in this program)
function addCardBorder() {
  this.classList.add("cardBorder");
}

// Processes a user guess when user selects three cards on the current board (**all card selections
// must be unique to be processed**)
function clickCard() {
  if (numClickedCards == 0) {
    numClickedCards++;
    potentialSet[0] = parseInt(this.id.substring(5, this.id.length));

  } else if (numClickedCards == 1 && !(potentialSet.includes(parseInt(this.id.substring(5, this.id.length))))) {
    numClickedCards++;
    potentialSet[1] = parseInt(this.id.substring(5, this.id.length));

  } else if (numClickedCards == 2 && !(potentialSet.includes(parseInt(this.id.substring(5, this.id.length))))) {
    numClickedCards = 0;  // reset number of clicked cards to zero
    potentialSet[2] = parseInt(this.id.substring(5, this.id.length));
    setFound = fullDeck.handleUserGuess(potentialSet);

    // Update user's score if set is found
    if (setFound) {
      if (hintClicked) {
        userScore++;  // add 1 point if player used a hint
        hintClicked = false;
      } else {
        userScore = userScore + 3;  // add 3 points of player didn't use a hint    
      }
      document.getElementById("score").innerHTML = "Score: " + userScore;
    } 

    potentialSet = [];
    fullDeck.printBoard();
  } 
}


// Checks if no set exists on current board and adds three cards if cards exist in the deck
function checkNoSet() {

  if (fullDeck.findSet().length > 1) {
    document.getElementById("setMessage").innerHTML = "Incorrect. There is a set on the current board.";

  } else {
    potentialSet = [];
    numClickedCards = 0;
    document.getElementById("setMessage").innerHTML = "Correct! Let's deal three more cards.";
    fullDeck.addThreeCards();
    fullDeck.printBoard();
  }
}

// Add event listener to check if no set exists on current board when user clicks the "No Set" button 
let noSetButton = document.getElementById("noSetBtn");
noSetButton.addEventListener("click", checkNoSet);


// Reset game
let resetButton = document.getElementById("resetBtn");
resetButton.addEventListener("click", function() {
  window.location.reload();
});


//MODAL FUNCTIONALITY//
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementById("spanClose");

// When the user clicks on the button, open the modal
btn.addEventListener("click", function() {
  modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.addEventListener("click", function() {
    modal.style.display = "none";
  });

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});


