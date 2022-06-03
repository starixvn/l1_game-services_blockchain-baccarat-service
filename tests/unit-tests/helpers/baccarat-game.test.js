import BaccaratGame from "../../../src/helpers/baccarat-game";

describe("receiveTwoCards", () => {
    it("should set player, banker cards correctly", () => {
        // Arrange
        const card1 = { rank: 1, suit: 0 };
        const card2 = { rank: 2, suit: 0 };
        const card3 = { rank: 3, suit: 0 };
        const card4 = { rank: 4, suit: 0 };
        const card5 = { rank: 5, suit: 0 };
        const card6 = { rank: 6, suit: 0 };
        const cards = [card1, card2, card3, card4, card5, card6];
        const baccaratGame = new BaccaratGame(cards);

        // Act
        baccaratGame.receiveTwoCards();

        // Assert
        expect(baccaratGame.cards.length).toBe(2);
        expect(baccaratGame.player.card1).toEqual(card1);
        expect(baccaratGame.player.card2).toEqual(card3);
        expect(baccaratGame.banker.card1).toEqual(card2);
        expect(baccaratGame.banker.card2).toEqual(card4);
    });
});

describe("playerReceiveThirdCard", () => {
    it("should set player third card correctly", () => {
        // Arrange
        const card5 = { rank: 5, suit: 0 };
        const card6 = { rank: 6, suit: 0 };
        const cards = [card5, card6];
        const baccaratGame = new BaccaratGame(cards);

        // Act
        baccaratGame.playerReceiveThirdCard();

        // Assert
        expect(baccaratGame.cards.length).toBe(1);
        expect(baccaratGame.player.card3).toEqual(card5);
    });
});

describe("bankerReceiveThirdCard", () => {
    it("should set banker third card correctly", () => {
        // Arrange
        const card6 = { rank: 6, suit: 0 };
        const cards = [card6];
        const baccaratGame = new BaccaratGame(cards);

        // Act
        baccaratGame.bankerReceiveThirdCard();

        // Assert
        expect(baccaratGame.cards.length).toBe(0);
        expect(baccaratGame.banker.card3).toEqual(card6);
    });
});
