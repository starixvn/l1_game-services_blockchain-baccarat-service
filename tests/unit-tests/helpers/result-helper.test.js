import { generateResult, getSettlementResult } from "../../../src/helpers/result-helper";
import { Helpers } from "sc-card-game-base";

jest.mock("sc-card-game-base");

describe("generateResult", () => {
    it.each([
        [[3, 3], 2],
        [[3, 4], 2],
    ])("when player is natural (%p) - should return %p cards for player and banker", (cardValues) => {
        // Arrange
        const card1 = { rank: cardValues[0], suit: 0 };
        const card2 = { rank: 1, suit: 0 };
        const card3 = { rank: cardValues[1], suit: 0 };
        const card4 = { rank: 2, suit: 0 };
        const card5 = { rank: 5, suit: 0 };
        const card6 = { rank: 6, suit: 0 };
        const cards = [card1, card2, card3, card4, card5, card6];

        Helpers.ResultHelper = {
            getCards: jest.fn(() => cards),
        };

        // Act
        const result = generateResult();

        // Assert
        expect(result.result.player.card1).toEqual(card1);
        expect(result.result.player.card2).toEqual(card3);
        expect(result.result.player.card3).toEqual(null);
        expect(result.result.banker.card1).toEqual(card2);
        expect(result.result.banker.card2).toEqual(card4);
        expect(result.result.banker.card3).toEqual(null);
    });

    it.each([
        [[3, 3], 2],
        [[3, 4], 2],
    ])("when banker is natural (%p) - should return %p cards for player and banker", (cardValues) => {
        // Arrange
        const card1 = { rank: 1, suit: 0 };
        const card2 = { rank: cardValues[0], suit: 0 };
        const card3 = { rank: 2, suit: 0 };
        const card4 = { rank: cardValues[1], suit: 0 };
        const card5 = { rank: 5, suit: 0 };
        const card6 = { rank: 6, suit: 0 };
        const cards = [card1, card2, card3, card4, card5, card6];

        Helpers.ResultHelper = {
            getCards: jest.fn(() => cards),
        };

        // Act
        const result = generateResult();

        // Assert
        expect(result.result.player.card1).toEqual(card1);
        expect(result.result.player.card2).toEqual(card3);
        expect(result.result.player.card3).toEqual(null);
        expect(result.result.banker.card1).toEqual(card2);
        expect(result.result.banker.card2).toEqual(card4);
        expect(result.result.banker.card3).toEqual(null);
    });

    it.each([[[10, 10]], [[10, 0]], [[10, 1]], [[10, 2]], [[10, 3]], [[10, 4]]])(
        "when the first two cards of player is (%p) - should return 3 cards for player",
        (cardValues) => {
            // Arrange
            const card1 = { rank: cardValues[0], suit: 0 };
            const card2 = { rank: 1, suit: 0 };
            const card3 = { rank: cardValues[1], suit: 0 };
            const card4 = { rank: 2, suit: 0 };
            const card5 = { rank: 5, suit: 0 };
            const card6 = { rank: 6, suit: 0 };
            const cards = [card1, card2, card3, card4, card5, card6];

            Helpers.ResultHelper = {
                getCards: jest.fn(() => cards),
            };

            // Act
            const result = generateResult();

            // Assert
            expect(result.result.player.card1).toEqual(card1);
            expect(result.result.player.card2).toEqual(card3);
            expect(result.result.player.card3).toEqual(card5);
        }
    );

    it.each([
        [[2, 2], 6],
        [[2, 3], 7],
    ])("when the first two cards of player is (%p)(%p) - should return 2 cards for player", (cardValues) => {
        // Arrange
        const card1 = { rank: cardValues[0], suit: 0 };
        const card2 = { rank: 1, suit: 0 };
        const card3 = { rank: cardValues[1], suit: 0 };
        const card4 = { rank: 2, suit: 0 };
        const card5 = { rank: 5, suit: 0 };
        const card6 = { rank: 6, suit: 0 };
        const cards = [card1, card2, card3, card4, card5, card6];

        Helpers.ResultHelper = {
            getCards: jest.fn(() => cards),
        };

        // Act
        const result = generateResult();

        // Assert
        expect(result.result.player.card1).toEqual(card1);
        expect(result.result.player.card2).toEqual(card3);
        expect(result.result.player.card3).toEqual(null);
    });

    describe("when the first 2 cards of player is 6 or 7", () => {
        it.each([
            [[2, 2], 6],
            [[2, 3], 7],
        ])("when the first two cards of banker is (%p)(%p) - should return 2 cards for banker", (cardValues) => {
            // Arrange
            const card1 = { rank: 2, suit: 0 };
            const card2 = { rank: cardValues[0], suit: 0 };
            const card3 = { rank: 2, suit: 0 };
            const card4 = { rank: cardValues[1], suit: 0 };
            const card5 = { rank: 5, suit: 0 };
            const card6 = { rank: 6, suit: 0 };
            const cards = [card1, card2, card3, card4, card5, card6];

            Helpers.ResultHelper = {
                getCards: jest.fn(() => cards),
            };

            // Act
            const result = generateResult();

            // Assert
            expect(result.result.banker.card1).toEqual(card2);
            expect(result.result.banker.card2).toEqual(card4);
            expect(result.result.banker.card3).toEqual(null);
        });

        it.each([
            [[10, 10], 0],
            [[10, 0], 1],
            [[10, 1], 2],
            [[10, 2], 3],
            [[10, 3], 4],
            [[10, 4], 5],
        ])("when the first two cards of banker is (%p)(%p) - should return 3 cards for banker", (cardValues) => {
            // Arrange
            const card1 = { rank: 2, suit: 0 };
            const card2 = { rank: cardValues[0], suit: 0 };
            const card3 = { rank: 2, suit: 0 };
            const card4 = { rank: cardValues[1], suit: 0 };
            const card5 = { rank: 5, suit: 0 };
            const card6 = { rank: 6, suit: 0 };
            const cards = [card1, card2, card3, card4, card5, card6];

            Helpers.ResultHelper = {
                getCards: jest.fn(() => cards),
            };

            // Act
            const result = generateResult();

            // Assert
            expect(result.result.banker.card1).toEqual(card2);
            expect(result.result.banker.card2).toEqual(card4);
            expect(result.result.banker.card3).toEqual(card5);
        });
    });

    describe("when player has 3 cards", () => {
        it.each([
            [[10, 10], 0],
            [[10, 0], 1],
            [[10, 1], 2],
        ])("when the first 2 cards of banker is (%p)(%p) - should return 3 cards for banker", (cardValues) => {
            // Arrange
            const card1 = { rank: 0, suit: 0 };
            const card2 = { rank: cardValues[0], suit: 0 };
            const card3 = { rank: 1, suit: 0 };
            const card4 = { rank: cardValues[1], suit: 0 };
            const card5 = { rank: 1, suit: 0 };
            const card6 = { rank: 6, suit: 0 };
            const cards = [card1, card2, card3, card4, card5, card6];

            Helpers.ResultHelper = {
                getCards: jest.fn(() => cards),
            };

            // Act
            const result = generateResult();

            // Assert
            expect(result.result.banker.card1).toEqual(card2);
            expect(result.result.banker.card2).toEqual(card4);
            expect(result.result.banker.card3).toEqual(card6);
        });

        describe("when the first 2 cards of banker is 3", () => {
            it.each([
                [[10], 0],
                [[0], 1],
                [[1], 2],
                [[2], 3],
                [[3], 4],
                [[4], 5],
                [[5], 6],
                [[6], 7],
                [[8], 9],
            ])("when the third card of player is (%p)(%p) - should return 3 cards for banker", (cardValue) => {
                // Arrange
                const card1 = { rank: 0, suit: 0 };
                const card2 = { rank: 0, suit: 0 };
                const card3 = { rank: 1, suit: 0 };
                const card4 = { rank: 1, suit: 0 };
                const card5 = { rank: cardValue, suit: 0 };
                const card6 = { rank: 6, suit: 0 };
                const cards = [card1, card2, card3, card4, card5, card6];

                Helpers.ResultHelper = {
                    getCards: jest.fn(() => cards),
                };

                // Act
                const result = generateResult();

                // Assert
                expect(result.result.banker.card1).toEqual(card2);
                expect(result.result.banker.card2).toEqual(card4);
                expect(result.result.banker.card3).toEqual(card6);
            });
        });

        describe("when the first 2 cards of banker is 4", () => {
            it.each([
                [[1], 2],
                [[2], 3],
                [[3], 4],
                [[4], 5],
                [[5], 6],
                [[6], 7],
            ])("when the third card of player is (%p)(%p) - should return 3 cards for banker", (cardValues) => {
                // Arrange
                const card1 = { rank: 0, suit: 0 };
                const card2 = { rank: 0, suit: 0 };
                const card3 = { rank: 1, suit: 0 };
                const card4 = { rank: 2, suit: 0 };
                const card5 = { rank: cardValues[0], suit: 0 };
                const card6 = { rank: 6, suit: 0 };
                const cards = [card1, card2, card3, card4, card5, card6];

                Helpers.ResultHelper = {
                    getCards: jest.fn(() => cards),
                };

                // Act
                const result = generateResult();

                // Assert
                expect(result.result.banker.card1).toEqual(card2);
                expect(result.result.banker.card2).toEqual(card4);
                expect(result.result.banker.card3).toEqual(card6);
            });
        });

        describe("when the first 2 cards of banker is 5", () => {
            it.each([
                [[3], 4],
                [[4], 5],
                [[5], 6],
                [[6], 7],
            ])("when the third card of player is (%p)(%p) - should return 3 cards for banker", (cardValues) => {
                // Arrange
                const card1 = { rank: 0, suit: 0 };
                const card2 = { rank: 0, suit: 0 };
                const card3 = { rank: 1, suit: 0 };
                const card4 = { rank: 3, suit: 0 };
                const card5 = { rank: cardValues[0], suit: 0 };
                const card6 = { rank: 6, suit: 0 };
                const cards = [card1, card2, card3, card4, card5, card6];

                Helpers.ResultHelper = {
                    getCards: jest.fn(() => cards),
                };

                // Act
                const result = generateResult();

                // Assert
                expect(result.result.banker.card1).toEqual(card2);
                expect(result.result.banker.card2).toEqual(card4);
                expect(result.result.banker.card3).toEqual(card6);
            });
        });

        describe("when the first 2 cards of banker is 6", () => {
            it.each([
                [[5], 6],
                [[6], 7],
            ])("when the third card of player is (%p)(%p) - should return 3 cards for banker", (cardValues) => {
                // Arrange
                const card1 = { rank: 0, suit: 0 };
                const card2 = { rank: 0, suit: 0 };
                const card3 = { rank: 1, suit: 0 };
                const card4 = { rank: 4, suit: 0 };
                const card5 = { rank: cardValues[0], suit: 0 };
                const card6 = { rank: 6, suit: 0 };
                const cards = [card1, card2, card3, card4, card5, card6];

                Helpers.ResultHelper = {
                    getCards: jest.fn(() => cards),
                };

                // Act
                const result = generateResult();

                // Assert
                expect(result.result.banker.card1).toEqual(card2);
                expect(result.result.banker.card2).toEqual(card4);
                expect(result.result.banker.card3).toEqual(card6);
            });
        });

        it("when the first 2 cards of banker is 7 - should return 2 cards for banker", () => {
            // Arrange
            const card1 = { rank: 0, suit: 0 };
            const card2 = { rank: 0, suit: 0 };
            const card3 = { rank: 1, suit: 0 };
            const card4 = { rank: 5, suit: 0 };
            const card5 = { rank: 3, suit: 0 };
            const card6 = { rank: 6, suit: 0 };
            const cards = [card1, card2, card3, card4, card5, card6];

            Helpers.ResultHelper = {
                getCards: jest.fn(() => cards),
            };

            // Act
            const result = generateResult();

            // Assert
            expect(result.result.banker.card1).toEqual(card2);
            expect(result.result.banker.card2).toEqual(card4);
            expect(result.result.banker.card3).toEqual(null);
        });
    });
});

describe("getSettlementResult", () => {
    it("when player wins - should return player true", () => {
        // Arrange
        const card1 = { rank: 3, suit: 0 };
        const card2 = { rank: 1, suit: 0 };
        const card3 = { rank: 3, suit: 0 };
        const card4 = { rank: 1, suit: 0 };
        const card5 = { rank: 5, suit: 0 };
        const card6 = { rank: 6, suit: 0 };
        const cards = [card1, card2, card3, card4, card5, card6];

        Helpers.ResultHelper = {
            getCards: jest.fn(() => cards),
        };

        // Act
        const roundResult = generateResult();
        const settlementResult = getSettlementResult(roundResult.result);

        // Assert
        expect(settlementResult.player).toBe(true);
        expect(settlementResult.banker).toBe(false);
    });

    it("when banker wins - should return player true", () => {
        // Arrange
        const card1 = { rank: 1, suit: 0 };
        const card2 = { rank: 2, suit: 0 };
        const card3 = { rank: 1, suit: 0 };
        const card4 = { rank: 4, suit: 0 };
        const card5 = { rank: 5, suit: 0 };
        const card6 = { rank: 6, suit: 0 };
        const cards = [card1, card2, card3, card4, card5, card6];

        Helpers.ResultHelper = {
            getCards: jest.fn(() => cards),
        };

        // Act
        const roundResult = generateResult();
        const settlementResult = getSettlementResult(roundResult.result);

        // Assert
        expect(settlementResult.player).toBe(false);
        expect(settlementResult.banker).toBe(true);
    });

    it("when player = banker - should return tie true", () => {
        // Arrange
        const card1 = { rank: 1, suit: 0 };
        const card2 = { rank: 10, suit: 0 };
        const card3 = { rank: 2, suit: 0 };
        const card4 = { rank: 10, suit: 0 };
        const card5 = { rank: 1, suit: 0 };
        const card6 = { rank: 6, suit: 0 };
        const cards = [card1, card2, card3, card4, card5, card6];

        Helpers.ResultHelper = {
            getCards: jest.fn(() => cards),
        };

        // Act
        const roundResult = generateResult();
        const settlementResult = getSettlementResult(roundResult.result);

        // Assert
        expect(settlementResult.player).toBe(false);
        expect(settlementResult.banker).toBe(false);
        expect(settlementResult.tie).toBe(true);
    });

    it("when 5 or 6 cards - should return big true", () => {
        // Arrange
        const card1 = { rank: 1, suit: 0 };
        const card2 = { rank: 2, suit: 0 };
        const card3 = { rank: 1, suit: 0 };
        const card4 = { rank: 2, suit: 0 };
        const card5 = { rank: 2, suit: 0 };
        const card6 = { rank: 2, suit: 0 };
        const cards = [card1, card2, card3, card4, card5, card6];

        Helpers.ResultHelper = {
            getCards: jest.fn(() => cards),
        };

        // Act
        const roundResult = generateResult();
        const settlementResult = getSettlementResult(roundResult.result);

        // Assert
        expect(settlementResult.big).toBe(true);
    });

    it("when player pair - should return playerPair true", () => {
        // Arrange
        const card1 = { rank: 3, suit: 0 };
        const card2 = { rank: 2, suit: 0 };
        const card3 = { rank: 3, suit: 0 };
        const card4 = { rank: 2, suit: 0 };
        const card5 = { rank: 2, suit: 0 };
        const card6 = { rank: 2, suit: 0 };
        const cards = [card1, card2, card3, card4, card5, card6];

        Helpers.ResultHelper = {
            getCards: jest.fn(() => cards),
        };

        // Act
        const roundResult = generateResult();
        const settlementResult = getSettlementResult(roundResult.result);

        // Assert
        expect(settlementResult.playerPair).toBe(true);
    });

    it("when banker pair - should return bankerPair true", () => {
        // Arrange
        const card1 = { rank: 3, suit: 0 };
        const card2 = { rank: 2, suit: 0 };
        const card3 = { rank: 3, suit: 0 };
        const card4 = { rank: 2, suit: 0 };
        const card5 = { rank: 2, suit: 0 };
        const card6 = { rank: 2, suit: 0 };
        const cards = [card1, card2, card3, card4, card5, card6];

        Helpers.ResultHelper = {
            getCards: jest.fn(() => cards),
        };

        // Act
        const roundResult = generateResult();
        const settlementResult = getSettlementResult(roundResult.result);

        // Assert
        expect(settlementResult.bankerPair).toBe(true);
    });

    it("when natural - should return natural true", () => {
        // Arrange
        const card1 = { rank: 3, suit: 0 };
        const card2 = { rank: 2, suit: 0 };
        const card3 = { rank: 3, suit: 0 };
        const card4 = { rank: 2, suit: 0 };
        const card5 = { rank: 2, suit: 0 };
        const card6 = { rank: 2, suit: 0 };
        const cards = [card1, card2, card3, card4, card5, card6];

        Helpers.ResultHelper = {
            getCards: jest.fn(() => cards),
        };

        // Act
        const roundResult = generateResult();
        const settlementResult = getSettlementResult(roundResult.result);

        // Assert
        expect(settlementResult.natural).toBe(true);
    });
});
