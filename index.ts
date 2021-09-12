import RxJsStore, { Action } from "./src/RxJsStore";

interface State {
  counter: number;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "INCREMENT": {
      state.counter += action.payload;
      return state;
    }
    case "DECREMENT": {
      state.counter--;
      return state;
    }
    default:
      return state;
  }
};

const initialState: State = {
  counter: 0,
};
const store = new RxJsStore(reducer, initialState);

store.subscribe((v) => console.log(v));

const { dispatch, asyncDispatch } = store;

asyncDispatch(
  "INCREMENT",
  () => new Promise((resolve) => setTimeout(() => resolve(5), 5000))
);
dispatch({ type: "INCREMENT", payload: 1 });
dispatch({ type: "INCREMENT", payload: 1 });
dispatch({ type: "DECREMENT" });
dispatch({ type: "INCREMENT", payload: 1 });
dispatch({ type: "INCREMENT", payload: 1 });
dispatch({ type: "DECREMENT" });
dispatch({ type: "INCREMENT", payload: 1 });
dispatch({ type: "INCREMENT", payload: 1 });
dispatch({ type: "DECREMENT" });
dispatch({ type: "INCREMENT", payload: 1 });
dispatch({ type: "DECREMENT" });
