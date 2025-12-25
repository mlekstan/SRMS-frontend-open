import * as z from "zod";

const regexpMessage = "Don't match regexp."

export const loginFormSchema = z.object({
  email: z.email().or(z.literal("")).transform(
    (val) => !val ? null : val
  ),
  password: z.string().regex(
    /^.{1,255}/u, {error: regexpMessage}
  ),
});