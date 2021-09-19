# RxJs Store

Simple javascript state management store written on top of RxJs.

## Description

This is a simple store that can be used to manage state.
The store works with reducers, like Redux, and exposes methods like subscribe, select, dispatch and asyncDispatch.

## Getting Started

### Dependencies

- [NodeJS] (https://nodejs.org/en/)
-

### Installing

- Use npm or yarn to install the libray

```bash
npm install @n0n3br/rxjs-store
yarn add @n0n3br/rxjs-store
```

### Features

- Centralized state management
- Protected state (can't be mutated directly)
- State mutation based on reducers and actions
- subscribe method to watch and react to desired state changes
- dispatch method to mutate state syncronously
- asyncDispatch method to mutate state assyncronously

## Usage

1. Create the state interface, the inicial state and the reducer

```typescript
  import { Action, Store } from 'n0n3br/rxjs-store'
  interface State {
      counter: number
  }
  const initialState:State {
      counter: 0
  }
  const reducer = (state, action:Action):State => {
      switch(action.type) {
          case 'INCREMENT': return { ...state, counter: state.counter + (payload ?? 0) }
          case 'DECREMENT': return { ...state, counter: state.counter - (payload ?? 0) }
          default: return state
      }
  }
```

2. Create the store instance

```typescript
const store = new Store<State>(reducer, initialState);
```

3. Subscribe to the whole store or to a single key to react to changes

```typescript
// subscribe to any state change
store.subscribe((state) => console.log("state change", state));
// subscribe to a specific key change
store
  .select("counter")
  .subscribe((value) => console.log("counter value change", value));
```

4. Dispath sync or async actions to update the state

```typescript
// dispatch sync action
store.dispatch({ type: "INCREMENT", payload: 0 });
// dispatch async action
// using setTimeout to simulate a promise that will be resolved after 1 second
store.asyncDispatch(
  "DECREMENT",
  () => new Promise((resolve) => setTimeout(() => resolve(5)), 1000)
);
```

## Building for production

To run the production build use nodejs build script:

```javascript
npm run build
```

Before the build is actually made the tests will be executed, the dist folder will be removed and then the build will be made.

## Running tests

This library contains all tests in the ./src/RxJsStore.test.ts.

The tests are writen using [mocha](https://github.com/mochajs/mocha) and [chai](https://github.com/chaijs/chai).

To run the tests just use nodejs test script:

```javascript
npm run test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
