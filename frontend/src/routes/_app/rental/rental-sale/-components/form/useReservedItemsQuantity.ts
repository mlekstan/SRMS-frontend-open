import { useContext } from "react";
import { context } from "./ReservedItemsQuantityProvder";


export function useReservedItemsQuantity(subcategoryId: number | "") {
  const reservedItemsQuantityMap = useContext(context);
  
  if (!subcategoryId)
    return null;

  return reservedItemsQuantityMap.get(subcategoryId) ?? 0;
}