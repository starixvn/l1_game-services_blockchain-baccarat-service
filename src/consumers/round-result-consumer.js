import { Consumers } from "sc-card-game-base";

export default class RoundResultConsumer extends Consumers.RoundResultConsumer {
    getCardsFromAdmin() {
        let cardsFromAdmin = [];

        const resultFromAdmin = this.gameData.settlementResultFromAdmin;
        if (resultFromAdmin && resultFromAdmin.result) {
            const { player, banker } = resultFromAdmin.result;
            cardsFromAdmin = [player[0], banker[0], player[1], banker[1]];
            if (player.length === 3) {
                cardsFromAdmin.push(player[2]);
            }
            if (banker.length === 3) {
                cardsFromAdmin.push(banker[2]);
            }
        }

        return cardsFromAdmin;
    }
}
