import { BehaviorSubject, Observable, Observer } from "rxjs";
export interface Action {
  type: string;
  payload?: any;
}

export default class RxJsStore<T> {
  private _state: BehaviorSubject<T>;
  private _reducer: (state: T, action: Action) => T;

  constructor(reducer: (state: T, action: Action) => T, initialState: T) {
    this._state = new BehaviorSubject(initialState);
    this._reducer = reducer;
  }

  subscribe(callback: (state: T) => void) {
    return this._state.subscribe(callback);
  }

  dispatch = (action: Action): void => {
    const oldState = this._state.getValue();
    const newState = this._reducer(oldState, action);
    this._state.next(newState);
  };

  asyncDispatch = async (type: string, runner: (state: T) => Promise<any>) => {
    const payload = await runner(this._state.getValue());
    this.dispatch({ type, payload });
  };
}