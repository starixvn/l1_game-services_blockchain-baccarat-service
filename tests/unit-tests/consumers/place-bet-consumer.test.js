import PlaceBetConsumer from "../../../src/consumers/place-bet-consumer";

describe("composeBettingTimeValidationCriteria", () => {
    describe("when config disable", () => {
        it("should return placeBetNextRound error", () => {
            // Arrange
            const consumer = new PlaceBetConsumer();
            const roundId = 1;
            consumer.gameData = {
                gameConfigs: {
                    enabled: false,
                },
            };
            consumer.definition = {
                durations: {
                    placingBets: 2,
                    dealCards: 1,
                },
            };

            // Act
            const result = consumer.composeBettingTimeValidationCriteria(roundId);

            // Assert
            expect(result[0]).toEqual({ failure: true, notice: { errorCode: "SB1905" } });
        });
    });

    describe("when different roundId", () => {
        it("should return invalid bet error", () => {
            // Arrange
            const consumer = new PlaceBetConsumer();
            const roundId = 1;
            consumer.gameData = {
                gameConfigs: {
                    enabled: true,
                },
            };
            consumer.definition = {
                durations: {
                    placingBets: 2,
                    dealCards: 1,
                },
            };

            // Act
            const result = consumer.composeBettingTimeValidationCriteria(roundId);

            // Assert
            expect(result[0].failure).toBe(false);
            expect(result[1]).toEqual({ failure: true, notice: { errorCode: "SB1935", gameRoundId: 1 } });
        });
    });

    describe("when remainingTime between placingBets and dealCardsTime", () => {
        it("should return cannotPlaceBet error", () => {
            // Arrange
            const consumer = new PlaceBetConsumer();
            const roundId = 1;
            consumer.gameData = {
                gameConfigs: {
                    enabled: true,
                },
                remainingTime: 3,
                roundId: 1,
            };
            consumer.definition = {
                durations: {
                    placingBets: 2,
                    dealCards: 1,
                },
            };

            // Act
            const result = consumer.composeBettingTimeValidationCriteria(roundId);

            // Assert
            expect(result[0].failure).toBe(false);
            expect(result[1].failure).toBe(false);
            expect(result[2]).toEqual({ failure: true, notice: { errorCode: "SB1906" } });
        });
    });

    describe("when remainingTime < locking bet", () => {
        it("should return placeBetNextRound error", () => {
            // Arrange
            const consumer = new PlaceBetConsumer();
            const roundId = 1;
            consumer.gameData = {
                gameConfigs: {
                    enabled: true,
                },
                remainingTime: 1,
                roundId: 1,
            };
            consumer.definition = {
                durations: {
                    placingBets: 4,
                    dealCards: 1,
                    lockingBet: 2,
                },
            };

            // Act
            const result = consumer.composeBettingTimeValidationCriteria(roundId);

            // Assert
            expect(result[0].failure).toBe(false);
            expect(result[1].failure).toBe(false);
            expect(result[2].failure).toBe(false);
            expect(result[3]).toEqual({ failure: true, notice: { errorCode: "SB1905" } });
        });
    });

    describe("when valid bet", () => {
        it("should return no error", () => {
            // Arrange
            const consumer = new PlaceBetConsumer();
            const roundId = 1;
            consumer.gameData = {
                gameConfigs: {
                    enabled: true,
                },
                remainingTime: 3,
                roundId: 1,
            };
            consumer.definition = {
                durations: {
                    placingBets: 4,
                    dealCards: 1,
                    lockingBet: 2,
                },
            };

            // Act
            const result = consumer.composeBettingTimeValidationCriteria(roundId);

            // Assert
            expect(result[0].failure).toBe(false);
            expect(result[1].failure).toBe(false);
            expect(result[2].failure).toBe(false);
            expect(result[3].failure).toBe(false);
        });
    });
});
