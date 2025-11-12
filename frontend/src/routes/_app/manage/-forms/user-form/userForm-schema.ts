import * as z from "zod";
import { formatName } from "../client-form/clientForm-schema";

const regexpMessage = "Don't match regexp."

export const userFormSchema = z.object({
  
  userData: z.object({
    firstName: z.string().regex(
      /^[\p{L}-]{1,40}$/u, {error: regexpMessage}
    ).transform(
      (val) => formatName(val)
    ),
    middleName: z.string().regex(
      /^[\p{L}-]{0,40}$/u, {error: regexpMessage}
    ).transform(
      (val) => !val ? null : formatName(val)
    ),
    lastName: z.string().regex(
      /^[\p{L}\s-]{1,80}$/u, {error: regexpMessage}
    ).transform(
      (val) => formatName(val)
    ),
    email: z.email().or(z.literal("")).transform(
      (val) => !val ? null : val
    ),
    areaCode: z.string().regex(
      /^([1-9]\d{0,2}(-\d{1,4})?)?$/u, {error: regexpMessage}
    ).transform(
      (val) => {
        if (!val) {
          return null;
        } else {
          return val.replace(/[\s]+/g, "");
        }
      }
    ),
    phoneNumber: z.string().regex(
      /^(\+[1-9]\d{0,2}(-\d{1,4})? \d{1,13})?$/u, {error: regexpMessage}
    ).transform(
      (val) => {
        if (!val) {
          return null
        } else {
          return val.replace(/\+[1-9]\d{0,2}(-\d{1,4})? /g, "");
        }
      }
    ),
    branchId: z.union([z.string(), z.number()]).transform(
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
    password: z.string().regex(
      /^.{1,255}/u, {error: regexpMessage}
    ),
  })
})