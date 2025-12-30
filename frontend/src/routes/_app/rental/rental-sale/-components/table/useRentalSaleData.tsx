import { useMemo, useReducer } from "react";
import type { RentalSalePosition } from "./useRentalSaleTable";

export type RentalSaleDataType = {
  data: RentalSalePosition[];
  insert: (rowIndex: number, rowValue: RentalSalePosition) => void;
  remove: (rowIndex: number) => void;
};


function reducer(
  state: RentalSalePosition[], 
  action: { rowIndex: number, modifier: "insert" | "remove", rowValue?: RentalSalePosition }
) {
  const { rowIndex, modifier, rowValue } = action;
  const newState = [...state];

  if (modifier === "insert" && rowValue) {
    newState.splice(rowIndex, 0, rowValue);
  }
  if (modifier === "remove") {
    newState.splice(rowIndex, 1);
  }

  return newState;
}

export function useRentalSaleData(initialData: RentalSalePosition[]): RentalSaleDataType {

  const [data, setData] = useReducer(
    reducer, 
    initialData
  );

  const dataObject = useMemo(() => (
    {
      data: data,
      insert: (rowIndex: number, rowValue: RentalSalePosition) => setData({ rowIndex, modifier: "insert", rowValue }),
      remove: (rowIndex: number) => setData({ rowIndex, modifier: "remove" }),
    }
  ), [data]);

  return dataObject;
}