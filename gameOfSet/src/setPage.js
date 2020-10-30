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
  }
  function loadBoard(deck, currentBoard) {
    for(let i = 0; i<currentBoard.length; i++){
      var randomIndexFromDeck = Math.floor(Math.random() * deck.length);
      var cardToAdd = deck.splice(randomIndexFromDeck,1);
      currentBoard[i] = cardToAdd;
    }
  }
  
  function printBoard(currentBoard, playerPoints) {
    //this function can't really be written until we figure out how we want to visually represent cards
  }
  
  function removeSet(currentBoard, setArray) {
    setArray.forEach(element => {
      currentBoard[element-1] = null;
      //remove image/text from actual html page
    });
  }
  
  function addPoints(playerPoints){
    if(playerPoints.length>1){
      //prompt for which player found the set
      //playerNum = input
    } else {
      playerNum = 1;
    }
    playerPoints[playerNum-1]++;
  
  }

function replaceThreeCards(deck, setArray, currentBoard) { //When the user passes the deck, the setArray, which holds the indexs of the set to replace, and the current board,
                                                          // this function will remove those cards from the current board and add 3 new cards from the deck
  removeThreeCards(currentBoard, setArray);
  addThreeCards(deck, setArray, currentBoard);
}

function addThreeCards(deck, indexsToAdd, currentBoard) { //When the user passes the deck, the indexs where to add cards, and the currentBoard, this function will add 3 random cards from the 
                                                          //into those spots
  for (var i = 0; i < 4; i++) {
      var randomIndexFromDeck = Math.floor(Math.random() * deck.length);
      var cardToAdd = deck.splice(randomIndexFromDeck,1);
      currentBoard[indexsToAdd[i]] = cardToAdd[0];
  }
}

function removeThreeCards(currentBoard, indexsToRemove) { //When the user passes the currentboard and the indexs that need to be removed, this function will remove the cards at those indexs
  for (var i = 0; i < 4; i++) {
      currentBoard.splice(indexsToRemove[i],1);
  }
}

function findSet (currentBoard) { 
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

function hint (currentBoard) {
  var set = findSet(currentBoard);
  if (set.length > 1) {
    //document.getElementById("hintAnswer").innerText = "One of the cards in the set is " + set[0];
  } else {
    //document.getElementById("hintAnswer").innerText = "There are no sets on the board, Press the button to add 3 more cards";
  }
}

  //DROPDOWN FUNCTIONALITY//
  
  var coll = document.getElementsByClassName("collapsible");

  for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }