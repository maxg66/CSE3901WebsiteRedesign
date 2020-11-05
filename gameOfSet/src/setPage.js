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
    
    for (let color in colors){
      for (let number in numbers){
        for (let shape in shapes){
          for (let fill in fills){
            this.deck.push(new Card(colors[color],numbers[number],shapes[shape],fills[fill])); //create ind
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
    for(let i = 0; i < this.currentBoard.length; i++) {
      document.getElementById("card "+i).innerHTML = "<img src=\"" + this.currentBoard[i].image + "\">";
    }
  }

  addPoints(playerPoints) {
    if(playerPoints.length>1){
      //prompt for which player found the set
      //playerNum = input
    } else {
      playerNum = 1;
    }
    playerPoints[playerNum-1]++;
  }


  // When a set is found, this method removes the set from the current board and replaces
  // those three cards with 3 new cards from the deck if the deck has at least 3 remaining cards
  handleSet(foundSet) { 
    
    // Remove three cards in set from board and replace them with three new cards from deck                                                        
    if (this.deck.length > 3) {
      for (let i = 0; i < 3; i++) {
        this.currentBoard.splice(foundSet[i],1,this.deck.pop());
      }

      // Simply remove cards in found set if no more cards in deck to deal
    } else {
      for (let i = 0; i < 3; i++) {
        this.currentBoard.splice(foundSet[i],1);
      }
    }
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
            let foundSet = this.checkMatch(potenSet);
            if (foundSet) {
              return potenSet;
            }
        }
      }
    }
    return [-1];
  }

  hint () {
    var set = this.findSet();
    if (set.length > 1) {
      document.getElementById("hintAnswer").innerText = "One of the cards in the set is the one with " + this.currentBoard[set[0]].printCard();
    } else {
      document.getElementById("hintAnswer").innerText = "There are no sets on the board, Press the button to add 3 more cards";
    }
  }

  // Checks if the user's guess is a set and executes appropriate actions of removing and replacing the found
  // set if the user guess is indeed a match
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
      document.getElementById("setMessage").innerHTML = "Set found!";
      this.handleSet(positionSet);
    } else {
      document.getElementById("setMessage").innerHTML = "That is not a set. Please try again.";
    }
  }

  checkMatch(positionSet) {
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






// CODE OUTSIDE OF THE CARD AND DECK CLASSES
let fullDeck = new Deck();

fullDeck.generateDeck();
fullDeck.shuffle();
fullDeck.loadBoard();
fullDeck.printBoard();
let lockBoard = false;

let playerNum = 1;  // holds number of players
let players = document.getElementById("numPlayers");

let hintButton = document.getElementById("hintBtn");

hintButton.addEventListener("click", function() {
  fullDeck.hint();
})

// Prompts the user to enter the number of players for the current game
players.addEventListener("keypress", function (e) {

  if (e.key == 'Enter') {
    let players = document.getElementById("numPlayers").value;

    if (isNaN(players) || players <= 0) {
      document.getElementById("playerError").innerHTML = "Invalid player number";
      
    } else {
      if (players == 1) {
        document.getElementById("playerError").innerHTML = "This game will have " + players + " player.";
      } else {
        document.getElementById("playerError").innerHTML = "This game will have " + players + " players.";
      }
      document.getElementById("numPlayers").disabled = true;
      document.getElementById("welcome").innerHTML = "";
      playerNum = players;
    }

    return parseInt(players);
  }
  
}, false);


// Adds a border around cards when clicked
for (let i = 0; i < fullDeck.currentBoard.length; i++) {
  document.getElementsByTagName("td")[i].addEventListener("click", function() {
    this.classList.add("cardBorder");
  });
}


let numClickedCards = 0;
let potentialSet = [];
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
    numClickedCards++;  // reset number of clicked cards to zero
    potentialSet[2] = parseInt(this.id.substring(5, this.id.length));
    fullDeck.checkUserMatch(potentialSet);
    
    for (let i = 0; i < potentialSet.length; i++) {
      let cardInSet = document.getElementById("card " + potentialSet[i]);
      cardInSet.classList.remove("cardBorder");
    }
    potentialSet = [];
    fullDeck.printBoard();
    numClickedCards = 0;
  } 
}

// Adds event listener for processing a user guess on the current board
for (let i = 0; i < fullDeck.currentBoard.length; i++) {
  document.getElementsByTagName("td")[i].addEventListener("click", clickCard);
}


// Checks if no set exists on current board
function checkNoSet() {
  if (fullDeck.findSet().length > 1) {
    document.getElementById("setMessage").innerHTML = "Incorrect. There is a set on the current board.";

  } else {
    document.getElementById("setMessage").innerHTML = "Correct! Let's deal three more cards.";
    fullDeck.addThreeCards();
    fullDeck.printBoard();
  }
}

// Add event listener to check if no set exists on current board when user clicks the "No Set" button 
let noSetButton = document.getElementById("noSetBtn");
noSetButton.addEventListener("click", checkNoSet);



//MODAL FUNCTIONALITY//
  
//var rules = document.getElementById("myRules");
var btn = document.getElementById("rulesBtn"); 

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  rules.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  rules.style.display = "none";
}

