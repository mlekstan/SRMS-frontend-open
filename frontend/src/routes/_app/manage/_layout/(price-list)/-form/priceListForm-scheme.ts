import * as z from "zod";


export const priceListFormSchema = z.array(
  z.object({
    id: z.number().nullish(),
    timeUnit: z.string(),
    maxSpeed: z.union([z.string(), z.number()]).transform(
      (val) => {
        if (!val) {
          return null;
        }
        if (typeof val === "string") {
          return Number(val);
        }

        return val;
      }
    ),
    price: z.string()
  })
);