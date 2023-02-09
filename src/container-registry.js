import awilix from "awilix";
import { Table, Core } from "sc-game-base";

import { bets, rounds, tmpBets, results } from "./models";
import { SettleGameRoundConsumer, RebetConsumer } from "./consumers";
import { Bot, ProcessBetQueue } from "./crons";
import { Crons, Consumers, Publishers, QueryApis } from "sc-card-game-base";
import { RebetContainerRegistry } from "sc-rebet-mode";

const { asClass, asValue } = awilix;

export default class ContainerRegistry extends Table.TableContainerRegistry {
    register(appConfigs, definition, gameData) {
        super.register(appConfigs, definition, gameData);

        this.container.register(new RebetContainerRegistry().registerTableGame(Core.Routers.BaseSocketRouter));
        this.container.register({
            rebetConsumer: asClass(RebetConsumer).singleton(),
            processBetQueue: asClass(ProcessBetQueue).singleton().proxy(),
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
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            gameCron: asClass(Crons.TableGameCron).singleton().proxy(),
            bot: asClass(Bot).singleton(),
            processBetQueue: asClass(Crons.TableProcessBetQueue).singleton().proxy(),
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
        });
    }
}
