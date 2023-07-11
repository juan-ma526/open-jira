import { UIContext } from "./UIContext";
import { ReactNode, useReducer } from "react";
import { UIReducer } from "./UIReducer";

interface Props {
  children: ReactNode;
}
export interface UIState {
  sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
};

const UIProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE); // en el primer argumento va el reducer, en el segundo el estado inicial

  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };
  const closeSideMenu = () => {
    dispatch({ type: "UI- Close Sidebar" });
  };

  return (
    <UIContext.Provider value={{ ...state, openSideMenu, closeSideMenu }}>
      {children}
    </UIContext.Provider>
  );
};

export { UIProvider };
