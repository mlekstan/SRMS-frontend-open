import { useMemo, useReducer } from "react";

type Action<K> = 
  | { rowIndex: number, modifier: "insert", rowValue: K }
  | { rowIndex: number, modifier: "update", rowValue: K }
  | { rowIndex: number, modifier: "remove" }
  | { modifier: "push", rowValue: K }
  | { modifier: "setServerData", serverData: K[] };


function reducer<S extends { id: number | null }>(
  state: S[],
  action: Action<S>
) {
  switch(action.modifier) {
    case "insert": {
      const newState = [...state];
      newState.splice(action.rowIndex, 0, action.rowValue);
      return newState;
    }
    case "update": {
      const newState = [...state];
      newState[action.rowIndex] = action.rowValue;
      return newState;
    }
    case "remove": {
      const newState = [...state];
      newState.splice(action.rowIndex, 1);
      return newState;
    }
    case "push": {
      const newState = [...state];
      newState.push(action.rowValue);
      return newState;
    }
    case "setServerData": {
      const newState = new Array<S>();
      const serverData = action.serverData;
      
      if (serverData.length === 0)
        return state;

      const serverIdsRowsMap = new Map(serverData.map((row) => [row.id, row]));
      const usedServerDataIds = new Set<number>();

      state.forEach((row) => {
        if (row.id === null) {
          newState.push(row);
        } else {
          if (serverIdsRowsMap.has(row.id)) {
            newState.push(serverIdsRowsMap.get(row.id)!);
            usedServerDataIds.add(row.id);
          }
        }
      });

      serverData.forEach((row) => {
        if (row.id && !usedServerDataIds.has(row.id)) {
          newState.push(row);
        }
      });

      return newState;

    }
    default: 
      return state;
  }
}


export function useTableFormData<T extends { id: number | null }>(initialData: T[]) {

  const [data, setData] = useReducer(
    (state: T[], action: Action<T>) => reducer(state, action), 
    initialData
  );

  const dataObject = useMemo(() => (
    {
      data: data,
      insert: (rowIndex: number, rowValue: T) => setData({ rowIndex, modifier: "insert", rowValue }),
      replace: (rowIndex: number, rowValue: T) => setData({ rowIndex, modifier: "update", rowValue }),
      remove: (rowIndex: number) => setData({ rowIndex, modifier: "remove" }),
      push: (rowValue: T) => setData({ modifier: "push", rowValue }),
      setSeverData: (serverData: T[]) => setData({ modifier: "setServerData", serverData })
    }
  ), [data]);

  return dataObject;

}