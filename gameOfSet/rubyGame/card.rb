class Card

    def initialize(color, number, shape, fill)
        @color = color
        @number = number
        @shape = shape
        @fill = fill
    end

    def color
        @color
    end

    def number
        @number
    end

    def shape
        @shape
    end

    def fill
        @fill
    end

    def to_s #cannot be inside the Deck Class!
        "#{@color} | #{@number} | #{@shape} | #{@fill}"
    end

end