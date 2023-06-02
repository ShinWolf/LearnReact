import { createContext, useReducer, useContext } from "react";

export const Context = createContext();
const { Provider, Consumer } = Context;

const initialState = {
  items: [
    { id: 1, content: "pay bills", done: true },
    { id: 2, content: "learn React", done: false },
  ],
  all: [
    { id: 1, content: "pay bills", done: true },
    { id: 2, content: "learn React", done: false },
  ],
  input: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "submit":
      return {
        ...state,
        items: [...state.items, action.playload.item],
        all: [...state.items, action.playload.item],
      };

    case "change":
      return {
        ...state,
        input: action.playload.value,
      };

    case "check":
      const updated = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, done: action.payload.bool }
          : item
      );
      return {
        ...state,
        items: updated,
        all: updated,
      };

    case "select":
      const filtered = state.items.filter((item) => item.done);
      return {
        ...state,
        items: action.playload.option === "Completed" ? filtered : state.all,
      };
  }
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export const withContext = (Component) => (props) => {
  return <Consumer>{(value) => <Component {...value} {...props} />}</Consumer>;
};
export const useAppContext = () => {
  return useContext(Context);
};
export default AppProvider;
