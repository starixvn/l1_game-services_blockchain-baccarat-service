import { Core, Table } from "sc-game-base";
import { initAPIStub } from "sc-game-service-integration-utils";

import appConfigs from "../../../src//app-configs.IGT";
import gameSettings from "../../../src/game-settings";
import { generateResult, getSettlementResult } from "../../../src/helpers/result-helper";
import GameServiceContainerRegistry from "./game-service-container-registry";
import { GameDefinition } from "sc-card-game-base";

gameSettings.durations = {
    wholeRound: 6,
    placingBets: 5,
    lockingBet: 2,
    dealCards: 1,
    changingDeck: 1,
};

export const run = async () => {
    initAPIStub(appConfigs.apiSettings.apiUrl);
    const definition = new GameDefinition(gameSettings, generateResult, getSettlementResult);
    const gameData = new Table.TableGameData(gameSettings.durations.wholeRound + gameSettings.durations.changingDeck);
    const container = new GameServiceContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp("BlockchainBaccarat", appConfigs);
    await app.run();
    await app.startGame(container);
};

run();
