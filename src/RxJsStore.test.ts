import { Action, Store } from "./RxJsStore";

import * as mocha from "mocha";
import * as chai from "chai";

const expect = chai.expect;

describe("it should update the state and let user subscribe to changes", () => {
  interface State {
    counter: number;
    name: string;
  }
  let store: Store<State>;

  beforeEach(() => {
    const initialState: State = {
      counter: 0,
      name: "",
    };

    const reducer = (state: State, action: Action) => {
      switch (action.type) {
        case "INCREMENT":
          return { ...state, counter: state.counter + (action.payload ?? 1) };
        case " DECREMENT":
          return { ...state, counter: state.counter - (action.payload ?? -1) };
        case "CHANGE_NAME":
          return { ...state, name: action.payload ?? "" };
        default:
          return state;
      }
    };

    store = new Store<State>(reducer, initialState);
  });

  it("should update the state and call subscribe callback", () => {
    let counter = 0;

    store.subscribe((state) => (counter = state.counter));

    store.dispatch({ type: "INCREMENT", payload: 5 });

    expect(counter).equal(5);
  });

  it("should select a key from state and call the subscbribe callback only when the selected key changes", () => {
    let name = "";
    store.select("name").subscribe((value) => (name = value));
    store.dispatch({ type: "INCREMENT", payload: 5 });
    expect(name).equal("");
    store.dispatch({ type: "CHANGE_NAME", payload: "RxJsStore" });
    expect(name).equal("RxJsStore");
  });

  it("should update the state asyncronously", (done) => {
    let counter = 0;
    store.select("counter").subscribe((value) => (counter = value));
    store.asyncDispatch(
      "INCREMENT",
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve(5), 100);
        })
    );
    expect(counter).equal(0);
    setTimeout(() => {
      expect(counter).equal(5);
      done();
    }, 100);
  });
});
