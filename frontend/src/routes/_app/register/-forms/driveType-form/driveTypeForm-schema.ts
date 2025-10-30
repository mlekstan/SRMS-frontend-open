import * as z from "zod";

const regexpMessage = "Don't match regexp."


export const driveTypeFormSchema = z.object({
  driveTypeData: z.object({
    name: z.string().regex(
      /^.{1,255}$/u, {error: regexpMessage}
    ),
  })
});