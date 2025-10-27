import * as z from "zod";

const regexpMessage = "Don't match regexp."

export const itemFormSchema = z.object({
  basicData: z.object({
    barcode: z.preprocess((val) => {
      if (typeof val === "string") {
        return val.split("_").join("");
      }
    }, z.string().regex(
      /^\d{13}$/, {error: regexpMessage}
    )),
    subcategoryId: z.union([z.string(), z.number()]).transform(
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
    name: z.string().regex(
      /^.{1,255}$/u, {error: regexpMessage}
    ),
    shortName: z.string().regex(
      /^.{1,128}$/u, {error: regexpMessage}
    ),
    marketValue: z.string().refine(
      (val) => {
        const regexp = /^([\d ]+([.,]\d+)?)?$/;
        return regexp.test(val);
      }
    ).transform(
      (val) => val ? Number(val.replace(/\s+/g, "").replace(/\,/g, ".")) : null
    )
  }),
  saleData: z.object({
    forSale: z.string().refine(
      (val) => (val === "True" || val === "False") ? true : false,
      {error: "Must be 'True' or 'False'."}
    ).transform(
      (val) => (val === "True") ? true : false
    ),
    sellPrice: z.string().refine(
      (val) => {
        const regexp = /^([\d ]+([.,]\d+)?)?$/;
        return regexp.test(val);
      }
    ).transform(
      (val) => val ? Number(val.replace(/\s+/g, "").replace(/\,/g, ".")) : null
    ),
  })
})