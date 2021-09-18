import RxJsStore, { Action } from "./src/RxJsStore";

interface State {
  counter: number;
  name: string;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "CHANGE_NAME": {
      return { ...state, name: action.payload };
    }
    case "INCREMENT": {
      return { ...state, counter: state.counter + action.payload };
    }
    case "DECREMENT": {
      return { ...state, counter: state.counter - action.payload };
    }
    default:
      return state;
  }
};

const initialState: State = {
  counter: 0,
  name: "",
};
const store = new RxJsStore(reducer, initialState);

store.select("name").subscribe((value) => console.log("name changed", value));
store
  .select("counter")
  .subscribe((value) => console.log("counter changed", value));
const { dispatch, asyncDispatch } = store;

asyncDispatch<number>(
  "DECREMENT",
  () => new Promise((resolve) => setTimeout(() => resolve(5), 5000))
);
dispatch({ type: "CHANGE_NAME", payload: "First Name" });
dispatch({ type: "CHANGE_NAME", payload: "Second Name" });
dispatch({ type: "INCREMENT", payload: 5 });
