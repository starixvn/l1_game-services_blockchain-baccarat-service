import { getCardValue } from "../../../src/helpers/card-helper";

describe("getCardValue", () => {
    it("when card is null - return 0", () => {
        // Arrange
        const card = null;

        // Act
        const result = getCardValue(card);

        // Assert
        expect(result).toBe(0);
    });

    it("when card is not null - return card.value + 1", () => {
        // Arrange
        const card = { rank: 1 };

        // Act
        const result = getCardValue(card);

        // Assert
        expect(result).toBe(2);
    });

    it("when card value greater than 10 - return 0", () => {
        // Arrange
        const card = { rank: 9 };

        // Act
        const result = getCardValue(card);

        // Assert
        expect(result).toBe(0);
    });
});
