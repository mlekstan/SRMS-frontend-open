import * as z from "zod";

const regexpMessage = "Don't match regexp."


export const categoryFormSchema = z.object({
  categoryData: z.object({
    name: z.string().regex(
      /^.{1,255}$/u, {error: regexpMessage}
    ),
  })
});