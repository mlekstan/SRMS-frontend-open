import { useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";
import { createContext, useMemo, type PropsWithChildren } from "react"
import type { RentalSalePosition } from "../table/useRentalSaleTable";

export const context = createContext(new Map<number, number>());

export function ReservedItemsQuantityProvider({ children }: PropsWithChildren) {
  const form = useFormContext();
  const positions: RentalSalePosition[] = useStore(form.store, state => state.values.positions);
  
  const map = useMemo(() => {
    const map = new Map<number, number>();
    if (!positions) return map;

    positions.forEach((p) => {
      const { subcategoryId, numberOfItems } = p;

      if (subcategoryId !== "") {
        const quantity = numberOfItems === "" ? 0 : Number(numberOfItems);
        const currentSum = map.get(subcategoryId) || 0;
        map.set(subcategoryId, currentSum + quantity);
      }
    });

    return map;

  }, [positions]);


  return (
    <context.Provider value={map}>
      { children }
    </context.Provider>
  );
}