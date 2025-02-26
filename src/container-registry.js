import awilix from "awilix";
import { Table } from "sc-game-base";

import { Consumers, Crons, Publishers, QueryApis } from "sc-card-game-base";
import RebetContainerRegistry from "./rebet-container-registry";
import { RebetConsumer, SettleGameRoundConsumer } from "./consumers";
import { Bot } from "./crons";
import { bets, hourlySummaries, results, rounds, tmpBets } from "./models";
import RTPQuery from "./query-apis/rtp-query";
import { SocketRouter } from "./routers";

const { asClass, asValue } = awilix;

export default class ContainerRegistry extends Table.TableContainerRegistry {
    register(appConfigs, definition, gameData) {
        super.register(appConfigs, definition, gameData);

        this.container.register(new RebetContainerRegistry().registerTableGame(SocketRouter));
        this.container.register({
            rebetConsumer: asClass(RebetConsumer).singleton(),
        });

        return this.container;
    }

    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(rounds),
            betsRepository: asValue(bets),
            tempBetsRepository: asValue(tmpBets),
            resultsRepository: asValue(results),
            hourlySummariesRepository: asValue(hourlySummaries),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            gameCron: asClass(Crons.TableGameCron).singleton().proxy(),
            bot: asClass(Bot).singleton(),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            placeBetConsumer: asClass(Consumers.PlaceBetConsumer).singleton(),
            settleGameRoundConsumer: asClass(SettleGameRoundConsumer).singleton().proxy(),
            roundResultConsumer: asClass(Consumers.RoundResultConsumer).singleton(),
            inGameConsumer: asClass(Consumers.TableInGameConsumer).singleton(),
            adminMonitorConsumer: asClass(Consumers.AdminMonitorConsumer).singleton(),
        });
    }

    registerPublishers() {
        super.registerPublishers();

        this.container.register({
            roundResultPublisher: asClass(Publishers.RoundResultPublisher).singleton(),
            runningRoundInfoPublisher: asClass(Publishers.RunningRoundInfoPublisher).singleton(),
        });
    }

    registerApis() {
        super.registerApis();

        this.container.register({
            roundQuery: asClass(QueryApis.RoundQuery).singleton(),
            rtpQuery: asClass(RTPQuery).singleton(),
        });
    }
}
