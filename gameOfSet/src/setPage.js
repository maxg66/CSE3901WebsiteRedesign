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
    this.deck[];
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
