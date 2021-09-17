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
      return { ...state, counter: state.counter + 1 };
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

const { dispatch } = store;

dispatch({ type: "CHANGE_NAME", payload: "Rogerio" });
dispatch({ type: "CHANGE_NAME", payload: "Beatriz" });
dispatch({ type: "INCREMENT", payload: 2 });
