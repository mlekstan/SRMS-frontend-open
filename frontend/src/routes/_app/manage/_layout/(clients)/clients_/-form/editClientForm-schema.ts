import * as z from "zod";


const regexpMessage = "Don't match regexp."

export const formatName = (val: string) => {
  let newVal = "";
  let prev;
  
  for (let i = 0; i < val.length; i++) {
    let char = val.charAt(i);
    if (i === 0 || prev === "-") {
      char = char.toUpperCase();
    }

    newVal += char;
    prev = char;
  }
  return newVal;
}

export const editClientFormSchema = z.object(
  {
    cardData: z.object({
      cards: z.any()
    }),
    personalData: z.object({
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
      identityCardNumber: z.string().regex(
        /^.{0,15}$/u, {error: regexpMessage}
      ).transform(
        (val) => !val ? null : val
      ),
    }),
    residenceData: z.object({
      country: z.string().regex(
        /^[\p{L}\s-]{0,60}$/u, {error: regexpMessage}
      ).transform(
        (val) => !val ? null : val
      ),
      city: z.string().regex(
        /^[\p{L}\s-]{0,100}$/u, {error: regexpMessage}
      ).transform(
        (val) => !val ? null : val
      ),
      street: z.string().regex(
        /^[\p{L}\s-]{0,100}$/u, {error: regexpMessage}
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
        /^.{0,10}$/u, {error: regexpMessage}
      ).transform(
        (val) => !val ? null : val
      ),
    }),
    contactData: z.object({
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
      email: z.email().or(z.literal("")).transform(
        (val) => !val ? null : val
      ),
    }),
  }
)