class Card {
  constructor(color,number,shape,fill){
    this.color = color;
    this.number = number;
    this.shape = shape;
    this.fill = fill;
  }
}

class Deck {
  constructor(){
    this.deck = new Array();
    const colors = ['Red', 'Green', 'Purple'];
    const numbers = ['One', 'Two', 'Three'];
    const shapes = ['Oval', 'Diamond','Squiggle'];
    const fills = ['Empty', 'Partial', 'Solid'];
    
    for (let color in colors){
      for (let number in numbers){
        for (let shape in shapes){
          for (let fill in fills){
            this.deck.push(new Card(colors[color],numbers[number],shapes[shape],fills[fill]));
          }
        }
      }
    }
  }//end constructor

  loadBoard(deck, currentBoard) {
    for(let i = 0; i<currentBoard.length; i++){
      var randomIndexFromDeck = Math.floor(Math.random() * deck.length);
      var cardToAdd = deck.splice(randomIndexFromDeck,1);
      currentBoard[i] = cardToAdd;
    }
  }
  
  printBoard(currentBoard, playerPoints) {
    //this function can't really be written until we figure out how we want to visually represent cards
  }
  
  removeSet(currentBoard, setArray) {
    setArray.forEach(element => {
      currentBoard[element-1] = null;
      //remove image/text from actual html page
    });
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

  replaceThreeCards(deck, setArray, currentBoard) { //When the user passes the deck, the setArray, which holds the indexs of the set to replace, and the current board,
                                                            // this function will remove those cards from the current board and add 3 new cards from the deck
    removeThreeCards(currentBoard, setArray);
    addThreeCards(deck, setArray, currentBoard);
  }

  addThreeCards(deck, indexsToAdd, currentBoard) { //When the user passes the deck, the indexs where to add cards, and the currentBoard, this function will add 3 random cards from the 
                                                            //into those spots
    for (var i = 0; i < 4; i++) {
        var randomIndexFromDeck = Math.floor(Math.random() * deck.length);
        var cardToAdd = deck.splice(randomIndexFromDeck,1);
        currentBoard[indexsToAdd[i]] = cardToAdd[0];
    }
  }

  removeThreeCards(currentBoard, indexsToRemove) { //When the user passes the currentboard and the indexs that need to be removed, this function will remove the cards at those indexs
    for (var i = 0; i < 4; i++) {
        currentBoard.splice(indexsToRemove[i],1);
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

    // Checks the number of unique values in each attribute type (color, number, shape, and fill) 
    // and if any of these attributes has 2 unique values, the potential match is not a valid set 
    let duplicateFound = false;
    function unique (elt,i,a) {
      return a.indexOf(elt) === index;
    }
    attributeCounts.push(positionSet.color.filter(unique).length);
    attributeCounts.push(positionSet.number.filter(unique).length);
    attributeCounts.push(positionSet.shape.filter(unique).length);
    attributeCounts.push(positionSet.fill.filter(unique).length);

    match = true
    if (attributeCounts.indexOf(2) >= 0) {
      match = false;
    }
    return match;
  }
}

  //DROPDOWN FUNCTIONALITY//
  
var rules = document.getElementById("myRules");
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
window.onclick = function(event) {
  if (event.target == rules) {
    rules.style.display = "none";
  }
}
