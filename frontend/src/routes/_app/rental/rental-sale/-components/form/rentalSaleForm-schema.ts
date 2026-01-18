import * as z from "zod";

export const rentalSaleFormSchema = z.object({
  cardId: z.number(), 
  categoryId: z.number(), 
  positions: z.array(
    z.object({
      subcategoryId: z.number(),
      speed: z.number().or(z.literal("null").transform(() => null)), 
      numberOfItems: z.number(), 
      rentalLength: z.string(),
      price: z.number().transform(val => String(val)), 
      discount: z.string(), 
      charge: z.number().transform(val => String(val))
    })
  )
});