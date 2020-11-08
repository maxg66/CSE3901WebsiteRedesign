const { TestScheduler } = require('jest');
const setPage = require('./src/setPage.js').default;

test('initialize card', () => {
    var card = new Card('red,', 'one', 'oval', 'empty');
    expect(card.printCard).toBe('one red oval with a fill of empty');
})