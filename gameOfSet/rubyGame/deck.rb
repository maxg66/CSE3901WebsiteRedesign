require './card'

class Deck

    def initialize
        @deck = []
        colors = %w{green red purple}
        numbers = %w{one two three}
        shapes = %w{oval diamond squiggle}
        fills = %w{empty partial solid}

        colors.each do |color|
            numbers.each do |number|
                shapes.each do |shape|
                    fills.each do |fill|
                        @deck.push(Card.new(color,number, shape, fill))
                    end
                end
            end
        end
    end

    def deck
        @deck
    end

    # Returns number of cards remaining in the deck
    def deckCount
        @deck.length
    end

    def shuffle

    end

end