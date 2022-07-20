export default {
    id: 48,
    name: "BlockchainBaccarat",
    durations: {
        wholeRound: 48,
        placingBets: 30,
        lockingBet: 5,
        dealCards: 2,
        changingDeck: 10,
    },
    choices: ["player", "banker", "big", "small", "tie", "playerPair", "bankerPair"],
    commonChoices: ["player", "banker", "tie"],
    choicesMapper: { player: 1, banker: 2, big: 3, small: 4, tie: 5, playerPair: 6, bankerPair: 7 },
    hedgeBetGroups: [
        ["player", "banker"],
        ["big", "small"],
    ],
    numberOfRoundHistory: 60,
    numberOfDecks: 8,
    maxCardsPerRound: 6,
    minCutCardIndex: 259,
    maxCutCardIndex: 298,
};
