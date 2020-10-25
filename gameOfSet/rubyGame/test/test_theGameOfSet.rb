require 'stringio'
require 'minitest/autorun'
require './theGameOfSet'

class TestGame < Minitest::Test

    def setup
        @string_io = StringIO.new
        @deckSize = 81
        @stdBoardSize = 12
        @extraBoardSize = 15
        @game = DeckOfCards.new()
        @deck = @game.deck
        @card = DeckOfCards::Card.new("green","two", "oval", "partial")
        @board = @deck.shuffle.first(@stdBoardSize)
    end

    def test_card_init
        assert_equal "green", @card.color
        assert_equal "two", @card.number
        assert_equal "oval", @card.shape
        assert_equal "partial", @card.fill
    end

    def test_deck_init
        assert_equal @deckSize, @deck.length
    end

    def test_deck_has_cards
        assert @deck.all? {|x| x.instance_of? DeckOfCards::Card}
    end

    def test_addThreeCards_size
        assert_equal @stdBoardSize, @game.currentBoard.length
        @game.addThreeCards
        assert_equal @extraBoardSize, @game.currentBoard.length
    end

    def test_addThreeCards_deckSize
        assert_equal @deckSize, @game.deck.length
        @game.addThreeCards
        assert_equal @deckSize-3, @game.deck.length
    end

    def test_getUserGuess_noSet
        @string_io.puts "no set" #puts a string to mock input
        @string_io.rewind       #reset the stream to line 0
        $stdin = @string_io     #override stdin to our string io

        output = @game.getuserGuess
        $stdin = STDIN          #reset stdin
        assert_equal [-1], output
    end

    def test_getUserGuess_proper_input
        @string_io.puts "1,2,3" #puts a string to mock input
        @string_io.rewind       #reset the stream to line 0
        $stdin = @string_io     #override stdin to our string io

        output = @game.getuserGuess
        $stdin = STDIN          #reset stdin
        assert_equal [1,2,3], output
    end

    def test_checkUserMatch_setFound
        c1 = DeckOfCards::Card.new("green","two", "oval", "partial")
        c2 = DeckOfCards::Card.new("red","two", "oval", "partial")
        c3 = DeckOfCards::Card.new("purple","two", "oval", "partial")
        set = [c1, c2, c3]
        result = @game.checkUserMatch(set)
        assert_equal true, result
    end

    def test_checkUserMatch_NoSetFound
        c1 = DeckOfCards::Card.new("green","two", "oval", "partial")
        c2 = DeckOfCards::Card.new("red","two", "oval", "solid")
        c3 = DeckOfCards::Card.new("purple","two", "oval", "partial")
        set = [c1, c2, c3]
        result = @game.checkUserMatch(set)
        assert_equal false, result
    end
    
    # #def test_findSet
    # def test_hint_properOutput
    #     card = @game.hint
    #     inDeck = @board.include? card
    #     assert_equal true, inDeck #a card that is on the board, unit test doesn't test functionality of findSet
    # end

end