import * as z from "zod";

const regexpMessage = "Don't match regexp."

export const cardFormSchema = z.object({
  cardData: z.object({
    cardBarcode: z.preprocess((val) => {
      if (typeof val === "string") {
        return val.split("_").join("");
      }
    }, z.string().regex(
      /^\d{13}$/, {error: regexpMessage}
    )),
  })
})
