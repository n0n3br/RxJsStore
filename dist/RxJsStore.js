"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const rxjs_1 = require("rxjs");
class Store {
    constructor(reducer, initialState) {
        this.dispatch = (action) => {
            const oldState = this._state.getValue();
            const newState = this._reducer(oldState, action);
            this._state.next(newState);
        };
        this.asyncDispatch = (type, runner) => __awaiter(this, void 0, void 0, function* () {
            const currentState = this._state.getValue();
            const payload = yield runner(currentState);
            this.dispatch({ type, payload });
        });
        this._state = new rxjs_1.BehaviorSubject(initialState);
        this._reducer = reducer;
    }
    select(key) {
        return this._state.pipe((0, rxjs_1.distinctUntilKeyChanged)(key), (0, rxjs_1.pluck)(key));
    }
    subscribe(callback) {
        return this._state.subscribe(callback);
    }
}
exports.Store = Store;
