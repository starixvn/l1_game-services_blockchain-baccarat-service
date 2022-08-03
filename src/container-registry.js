import awilix from "awilix";
import { Table } from "sc-game-base";

import { bets, rounds, tmpBets, results } from "./models";
import { SettleGameRoundConsumer } from "./consumers";
import { Bot } from "./crons";
import { Crons, Consumers, Publishers, QueryApis } from "sc-card-game-base";

const { asClass, asValue } = awilix;

export default class ContainerRegistry extends Table.TableContainerRegistry {
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
            gameCron: asClass(Crons.GameCron).singleton().proxy(),
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
