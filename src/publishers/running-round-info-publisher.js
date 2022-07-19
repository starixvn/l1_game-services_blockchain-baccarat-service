import { Publishers } from "sc-card-game-base";

export default class RunningRoundInfoPublisher extends Publishers.RunningRoundInfoPublisher {
    getBetUserCount() {
        const betUserCount = this.gameData.betUserCount;
        return {
            player: betUserCount["player"] || [],
            banker: betUserCount["banker"] || [],
            tie: betUserCount["tie"] || [],
        };
    }
}
