import { Crons } from "sc-rebet-mode";

export default class ProcessBetQueue extends Crons.TableProcessBetQueue {
    adjustTotalBets(player, bet, rate) {
        super.adjustTotalBets(player, bet, rate);

        if (bet.rebet) {
            Object.entries(bet.lastBet).forEach(([betChoice, amount]) => {
                this.updateBetUserCount({ betChoice, amount }, player);
            });
        } else {
            this.updateBetUserCount(bet, player);
        }
    }

    updateBetUserCount(bet, player) {
        const { betChoice } = bet;
        if (this.definition.commonChoices.includes(betChoice)) {
            if (!this.gameData.betUserCount[betChoice]) {
                this.gameData.betUserCount[betChoice] = [];
            }
            this.gameData.betUserCount[betChoice].push(player.UID);
        }
    }
}
