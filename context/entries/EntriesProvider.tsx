import { EntriesContext } from "./EntriesContext";
import { ReactNode, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { entriesReducer } from "./entriesReducer";
import { Entry } from "@/interfaces";

interface Props {
  children: ReactNode;
}
export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "in-progress: La generación de UUIDs es útil en varios escenarios, como generar identificadores únicos",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description:
        "finished: Recuerda consultar la documentación del paquete uuid para obtener más detalles sobre ",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};

const EntriesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description: description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({ type: "[Entry] Add-Entry", payload: newEntry });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};

export { EntriesProvider };
