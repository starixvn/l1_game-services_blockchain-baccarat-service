import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { socketOptions } from "./stubs/test-data";
import { initUserSession } from "./init-user-session";
import gameSettings from "../../src/game-settings";

export const rebetTest = () => {
    describe("rebet", () => {
        const getTimeOutToBet = (remainingTime, durations) => {
            let timeout = 0;
            if (remainingTime <= durations.lockingBet) {
                timeout = durations.wholeRound - durations.placingBets + remainingTime + 2;
            } else if (remainingTime >= durations.placingBets) {
                timeout = remainingTime - durations.placingBets + 2;
            }

            return timeout;
        };

        describe("when rebet", () => {
            it("should return rebet data", (done) => {
                // Arrange
                const client = new GameClientDriver(socketOptions, initUserSession(normalUser));
                client.handleSignedInEvent(() => {
                    client.sendInGameEvent();
                });
                let receivedRemainingTime = false;

                // Act
                client.on(socketOptions.gameName, (inGameData) => {
                    if (inGameData.remainingTime && !receivedRemainingTime) {
                        receivedRemainingTime = true;
                        setTimeout(() => {
                            client.emit("rebet", { m: 1 });
                        }, getTimeOutToBet(inGameData.remainingTime, gameSettings.durations) * 1000);
                    }
                });

                // Assert
                client.on(socketOptions.gameName, (data) => {
                    if (data.rebet) {
                        expect(data.rebet).toEqual({ banker: { 10: 1 }, big: { 10: 2 }, tie: { 1: 1 } });
                        expect(data.endBet).toEqual(31);
                        expect(data.ownBets).toEqual({ banker: 10, big: 20, tie: 1 });

                        setTimeout(() => {
                            client.close();
                            done();
                        }, 30000); // delay this test to finish so that the next test will not be effected by this bet
                    }
                });
            });
        });
    });
};
