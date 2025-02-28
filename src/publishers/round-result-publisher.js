import { Publishers } from "sc-card-game-base";

export default class RoundResultPublisher extends Publishers.RoundResultPublisher {
    publishWinners(roundId, winningPlayers) {
        const payload = {
            roundId,
            winningPlayers,
        };

        this.publishToAllUsers({
            winners: payload,
        });
    }
}
