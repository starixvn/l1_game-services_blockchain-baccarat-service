import BaccaratPlayer from "../.././../src/helpers/baccarat-player";

describe("getTotalScore", () => {
    describe("when total < 10", () => {
        it("should calculate total correctly", () => {
            // Arrange
            var baccaratPlayer = new BaccaratPlayer();
            baccaratPlayer.card1 = {
                value: 1,
                suit: 0,
            };
            baccaratPlayer.card2 = {
                value: 2,
                suit: 0,
            };
            baccaratPlayer.card3 = {
                value: 3,
                suit: 0,
            };

            // Act
            const result = baccaratPlayer.getTotalScore();

            // Assert
            expect(result).toBe(9);
        });
    });

    describe("when total > 10", () => {
        it("should calculate total correctly", () => {
            // Arrange
            var baccaratPlayer = new BaccaratPlayer();
            baccaratPlayer.card1 = {
                value: 5,
                suit: 0,
            };
            baccaratPlayer.card2 = {
                value: 6,
                suit: 0,
            };
            baccaratPlayer.card3 = {
                value: 7,
                suit: 0,
            };

            // Act
            const result = baccaratPlayer.getTotalScore();

            // Assert
            expect(result).toBe(1);
        });
    });
});

describe("getThirdCardValue", () => {
    it("should return third card value", () => {
        // Arrange
        var baccaratPlayer = new BaccaratPlayer();
        baccaratPlayer.card1 = {
            value: 1,
            suit: 0,
        };
        baccaratPlayer.card2 = {
            value: 2,
            suit: 0,
        };
        baccaratPlayer.card3 = {
            value: 3,
            suit: 0,
        };

        // Act
        const result = baccaratPlayer.getThirdCardValue();

        // Assert
        expect(result).toBe(4);
    });
});

describe("getNumberOfCards", () => {
    describe("when 2 cards", () => {
        it("should return 2", () => {
            // Arrange
            var baccaratPlayer = new BaccaratPlayer();
            baccaratPlayer.card1 = {
                value: 1,
                suit: 0,
            };
            baccaratPlayer.card2 = {
                value: 2,
                suit: 0,
            };

            // Act
            const result = baccaratPlayer.getNumberOfCards();

            // Assert
            expect(result).toBe(2);
        });
    });

    describe("when 3 cards", () => {
        it("should return 3", () => {
            // Arrange
            var baccaratPlayer = new BaccaratPlayer();
            baccaratPlayer.card1 = {
                value: 1,
                suit: 0,
            };
            baccaratPlayer.card2 = {
                value: 2,
                suit: 0,
            };
            baccaratPlayer.card3 = {
                value: 3,
                suit: 0,
            };

            // Act
            const result = baccaratPlayer.getNumberOfCards();

            // Assert
            expect(result).toBe(3);
        });
    });
});

describe("hasPair", () => {
    describe("when card1.value equals card2.value", () => {
        it("should return true", () => {
            // Arrange
            var baccaratPlayer = new BaccaratPlayer();
            baccaratPlayer.card1 = {
                value: 1,
                suit: 0,
            };
            baccaratPlayer.card2 = {
                value: 1,
                suit: 0,
            };
            baccaratPlayer.card3 = {
                value: 3,
                suit: 0,
            };

            // Act
            const result = baccaratPlayer.hasPair();

            // Assert
            expect(result).toBe(true);
        });
    });

    describe("when card1.value not equal card2.value", () => {
        it("should return false", () => {
            // Arrange
            var baccaratPlayer = new BaccaratPlayer();
            baccaratPlayer.card1 = {
                value: 1,
                suit: 0,
            };
            baccaratPlayer.card2 = {
                value: 2,
                suit: 0,
            };
            baccaratPlayer.card3 = {
                value: 3,
                suit: 0,
            };

            // Act
            const result = baccaratPlayer.hasPair();

            // Assert
            expect(result).toBe(false);
        });
    });
});

describe("getCards", () => {
    describe("when 3 cards", () => {
        it("should return 3 cards", () => {
            // Arrange
            var baccaratPlayer = new BaccaratPlayer();
            baccaratPlayer.card1 = {
                value: 1,
                suit: 0,
            };
            baccaratPlayer.card2 = {
                value: 2,
                suit: 0,
            };
            baccaratPlayer.card3 = {
                value: 3,
                suit: 0,
            };

            // Act
            const result = baccaratPlayer.getCards();

            // Assert
            expect(result).toEqual([baccaratPlayer.card1, baccaratPlayer.card2, baccaratPlayer.card3]);
        });
    });

    describe("when 2 cards", () => {
        it("should return 2 cards", () => {
            // Arrange
            var baccaratPlayer = new BaccaratPlayer();
            baccaratPlayer.card1 = {
                value: 1,
                suit: 0,
            };
            baccaratPlayer.card2 = {
                value: 2,
                suit: 0,
            };

            // Act
            const result = baccaratPlayer.getCards();

            // Assert
            expect(result).toEqual([baccaratPlayer.card1, baccaratPlayer.card2]);
        });
    });
});
