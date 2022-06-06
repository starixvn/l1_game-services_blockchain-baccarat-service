import { generateResult, getSettlementResult } from "../../../src/helpers/result-helper";
import { Helpers } from "sc-card-game-base";
import gameSettings from "../../../src/game-settings";
import Chance from "chance";

const randomModes = [1, 2, 3];
describe("Result statistic: 100000 times", () => {
    randomModes.forEach((mode) => {
        it(`should generate results statistically correct with mode ${mode}`, () => {
            // Arrange
            let statisticResult = {
                player: 0,
                banker: 0,
                tie: 0,
                big: 0,
                small: 0,
                playerPair: 0,
                bankerPair: 0,
                natural: 0,
            };
            let totalRounds = 0;

            // Act
            for (let i = 0; i < 500; i++) {
                const blockchain = buildBlockchain(mode);

                while (blockchain.currentIndex + 6 < blockchain.cutCardIndex) {
                    const { result, usedCardsCount } = generateResult(blockchain);
                    blockchain.currentIndex = blockchain.currentIndex + usedCardsCount;
                    const settlementResult = getSettlementResult(result);

                    statisticResult.player += settlementResult.player >> 0;
                    statisticResult.banker += settlementResult.banker >> 0;
                    statisticResult.tie += settlementResult.tie >> 0;
                    statisticResult.big += settlementResult.big >> 0;
                    statisticResult.small += settlementResult.small >> 0;
                    statisticResult.playerPair += settlementResult.playerPair >> 0;
                    statisticResult.bankerPair += settlementResult.bankerPair >> 0;
                    statisticResult.natural += settlementResult.natural >> 0;
                    totalRounds += 1;
                }
            }

            // Assert
            const resultPercentage = Object.keys(statisticResult).reduce((percentage, key) => {
                percentage[key] = +parseFloat((statisticResult[key] / totalRounds) * 100).toFixed(2);

                return percentage;
            }, {});
            console.log(
                `Mode:${mode}, total rounds: ${totalRounds} countResult: ${JSON.stringify(
                    statisticResult
                )}, percentageResult: ${JSON.stringify(resultPercentage)}`
            );

            expect(resultPercentage.player).toBeGreaterThanOrEqual(43.5);
            expect(resultPercentage.banker).toBeGreaterThanOrEqual(44.5);
            expect(resultPercentage.tie).toBeGreaterThanOrEqual(9);
            expect(resultPercentage.big).toBeGreaterThanOrEqual(61);
            expect(resultPercentage.small).toBeGreaterThanOrEqual(37);
            expect(resultPercentage.playerPair).toBeGreaterThanOrEqual(7);
            expect(resultPercentage.bankerPair).toBeGreaterThanOrEqual(7);
            expect(resultPercentage.natural).toBeGreaterThanOrEqual(33.5);
        });
    });
});

const buildBlockchain = (mode) => {
    const cardChain = Helpers.CardChain.generateChain(gameSettings.numberOfDecks, [], mode);
    const burnedCards = calculateBurnedCards(cardChain.chain);
    const currentIndex = burnedCards;
    const chance = new Chance();
    const cutCardIndex = chance.integer({ min: gameSettings.minCutCardIndex, max: gameSettings.maxCutCardIndex });

    return {
        currentIndex: currentIndex,
        cutCardIndex: cutCardIndex,
        burnedCards: burnedCards,
        chain: cardChain.chain,
    };
};

const calculateBurnedCards = (cardChain) => {
    const firstCard = JSON.parse(Helpers.CryptoHelper.decrypt(cardChain[0].encryptedResult));
    const cardValue = firstCard.rank >= 10 ? 10 : firstCard.rank + 1;
    return cardValue + 1;
};
