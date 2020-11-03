class Card {
  constructor(color,number,shape,fill){
    this.color = color;
    this.number = number;
    this.shape = shape;
    this.fill = fill;
    this.image = "setImages/"+color+number+shape+fill+".JPG"
  }
}

class Deck {

  constructor() {
    this.deck = new Array();
    this.currentBoard = new Array(12);
  }

  generateDeck() {
    const colors = ['red', 'green', 'purple'];
    const numbers = ['one', 'two', 'three'];
    const shapes = ['oval', 'diamond','squiggle'];
    const fills = ['empty', 'partial', 'full'];
    
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

  handleSet(foundSet) { //When the user passes the deck, the setArray, which holds the indexs of the set to replace, and the current board,
                                                            // this function will remove those cards from the current board and add 3 new cards from the deck
    
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

  addThreeCards(deck, indexsToAdd, currentBoard) { //When the user passes the deck, the indexs where to add cards, and the currentBoard, this function will add 3 random cards from the 
                                                            //into those spots
    for (var i = 0; i < 4; i++) {
        var randomIndexFromDeck = Math.floor(Math.random() * deck.deck.length);
        var cardToAdd = deck.deck.splice(randomIndexFromDeck,1);
        currentBoard[indexsToAdd[i]] = cardToAdd[0];
    }
  }

  findSet (currentBoard) { 
                          //This method finds a set on the current Board                            
                          //returns an array with a Set on the board, or an array with -1 at the first index                         
    for (var i = 0; i < currentBoard.length-3; i++) {
      for (var j = i +1; j < currentBoard.length-2; j++) {
        for (var k = j+1;k<currentBoard.length-1;k++) {
            var potenSet = [currentBoard[i], currentBoard[j], currentBoard[k]];
            var foundSet = checkUserMatch(potenSet);
            if (foundSet) {
              return potenSet;
            }
        }
      }
    }
    return [-1];
  }

  hint (currentBoard) {
    var set = findSet(currentBoard);
    if (set.length > 1) {
      //document.getElementById("hintAnswer").innerText = "One of the cards in the set is " + set[0];
    } else {
      //document.getElementById("hintAnswer").innerText = "There are no sets on the board, Press the button to add 3 more cards";
    }
  }

  // Returns true if player's chosen group of three cards is a set; returns false otherwise
  checkUserMatch(positionSet) {
    let attributeCounts = [];
    console.log(positionSet[0]);

    let cardSet = [];
    for (let i = 0; i < positionSet.length; i++) {
      cardSet.push(this.currentBoard[positionSet[i]]);
      console.log(cardSet[i]);
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
}

  //DROPDOWN FUNCTIONALITY//
  
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

// When the user clicks anywhere outside of the modal, close it
/*window.onclick = function(event) {
  if (event.target == rules) {
    rules.style.display = "none";
  }
}*/





// MAIN 
let fullDeck = new Deck();

fullDeck.generateDeck();
fullDeck.shuffle();
fullDeck.loadBoard();
fullDeck.printBoard();
let lockBoard = false;

let playerNum = 1;  // holds number of players
let players = document.getElementById("numPlayers");

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

    // document.getElementById("welcome").innerHTML = "DONE";
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
function clickCard() {
  if (numClickedCards == 0) {
    numClickedCards++;
    potentialSet[0] = parseInt(this.id.substring(5, this.id.length));

  } else if (numClickedCards == 1) {
    numClickedCards++;
    potentialSet[1] = parseInt(this.id.substring(5, this.id.length));

  } else if (numClickedCards == 2) {
    numClickedCards++;  // reset number of clicked cards to zero
    potentialSet[2] = parseInt(this.id.substring(5, this.id.length));
    console.log(potentialSet[0]);
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

// Adds event listener for user guessing to each of the cards on the current board (table cells)
for (let i = 0; i < fullDeck.currentBoard.length; i++) {
  document.getElementsByTagName("td")[i].addEventListener("click", clickCard);
}


//while (fullDeck.deck.length > 0) {
  
//}
