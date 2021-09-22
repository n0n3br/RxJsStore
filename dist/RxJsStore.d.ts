import { Observable, Subscription } from "rxjs";
export interface Action {
    type: string;
    payload?: any;
}
export declare class Store<T> {
    private _state;
    private _reducer;
    constructor(reducer: (state: T, action: Action) => T, initialState: T);
    select<K extends keyof T>(key: K): Observable<T[K]>;
    subscribe(callback: (state: T) => void): Subscription;
    dispatch: (action: Action) => void;
    asyncDispatch: <R>(type: string, runner: (state: T) => Promise<R>) => Promise<void>;
}
