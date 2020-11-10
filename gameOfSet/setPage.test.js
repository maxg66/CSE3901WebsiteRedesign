const { TestScheduler } = require('jest');
const setPage = require('./src/setPage.js').default;

test('no set deck', () => {
    fullDeck.printBoard()
    expect(Deck.length).toBe(15);
})

test('print board', () => {
    fullDeck.addThreeCards()
    expect(Deck.length).toBe(12);
})

test('initialize card', () => {
    var card = new Card('red,', 'one', 'oval', 'empty');
    expect(card.printCard).toBe('one red oval with a fill of empty');
})

