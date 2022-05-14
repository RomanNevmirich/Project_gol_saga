import "regenerator-runtime/runtime";
import { store, renderGame } from "./Game";

renderGame();
store.subscribe(renderGame);