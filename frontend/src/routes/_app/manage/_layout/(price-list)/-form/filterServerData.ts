import type { VehiclePrice } from "@/api/types";

export function filterServerData(data: VehiclePrice[]) {
  return data.map((p) => {
    const { vehicleId, maxSpeed, ...other } = p;
    return {
      maxSpeed: maxSpeed ? String(maxSpeed) : "",
      ...other
    }
  });
}