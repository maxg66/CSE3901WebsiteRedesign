// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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
