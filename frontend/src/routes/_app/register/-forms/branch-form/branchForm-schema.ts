import * as z from "zod";


const regexpMessage = "Don't match regexp."

export const branchFormSchema = z.object({
  branchData: z.object({
    name: z.string().regex(
      /^.{1,255}$/u, {error: regexpMessage}
    ),
    country: z.string().regex(
      /^[\p{L}\s-]{1,60}$/u, {error: regexpMessage}
    ).transform(
      (val) => !val ? null : val
    ),
    city: z.string().regex(
      /^[\p{L}\s-]{1,100}$/u, {error: regexpMessage}
    ).transform(
      (val) => !val ? null : val
    ),
    street: z.string().regex(
      /^[\p{L}\s-]{1,100}$/u, {error: regexpMessage}
    ).transform(
      (val) => !val ? null : val
    ),
    streetNumber: z.string().regex(
      /^(?:[1-9]\d{0,3}|[12]\d{4}|3[01]\d{3}|32[0-6]\d{2}|327[0-5]\d|3276[0-7])?$/u,
      {error: regexpMessage}
    ).transform(
      (val) => !val ? null : Number(val)
    ),
    flatNumber: z.string().regex(
      /^(?:[1-9]\d{0,3}|[12]\d{4}|3[01]\d{3}|32[0-6]\d{2}|327[0-5]\d|3276[0-7])?$/u,
      {error: regexpMessage}        
    ).transform(
      (val) => !val ? null : Number(val)
    ),
    zipCode: z.string().regex(
      /^.{1,10}$/u, {error: regexpMessage}
    ).transform(
      (val) => !val ? null : val
    ),
  })
})

