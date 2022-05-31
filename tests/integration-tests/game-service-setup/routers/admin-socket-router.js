import { Routers } from "sc-card-game-base";

export default class AdminSocketRouter extends Routers.AdminSocketRouter {
    verify() {
        return true;
    }
}
