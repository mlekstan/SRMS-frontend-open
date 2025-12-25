import * as z from "zod";

const regexpMessage = "Don't match regexp."

export const cardFormSchema = z.object({
  cardData: z.object({
    barcode: z.preprocess((val) => {
      if (typeof val === "string") {
        return val.split("_").join("");
      }
    }, z.string().regex(
      /^\d{8}$/, {error: regexpMessage}
    )),
  })
})
