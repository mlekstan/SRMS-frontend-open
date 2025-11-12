import * as z from "zod";

const regexpMessage = "Don't match regexp."

export const subcategoryFormSchema = z.object({
  
  subcategoryData: z.object({
    categoryId: z.union([z.string(), z.number()]).transform(
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
      /^.{1,255}/u, {error: regexpMessage}
    ),
  }),
  
  vehicleData: z.object({
    driveTypeId: z.union([z.string(), z.number()]).transform(
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
    curbWeight: z.string().refine(
      (val) => !isNaN(Number(val)), { message: "Must be a number format." }
    ).transform(
      (val) => val ? Number(val) : null
    ),
    maxLoad: z.string().refine(
      (val) => !isNaN(Number(val)), { message: "Must be a number format." }
    ).transform(
      (val) => val ? Number(val) : null
    ),
    minAge: z.string().refine(
      (val) => !isNaN(Number(val)), { message: "Must be a number format." }
    ).transform(
      (val) => val ? Number(val) : null
    ),
    maxAge: z.string().refine(
      (val) => !isNaN(Number(val)), { message: "Must be a number format." }
    ).transform(
      (val) => val ? Number(val) : null
    )
  }),
  
  electricVehicleData: z.object({
    enginePower: z.string().refine(
      (val) => !isNaN(Number(val)), { message: "Must be a number format." }
    ).transform(
      (val) => val ? Number(val) : null
    ),
    batteryVoltage: z.string().refine(
      (val) => !isNaN(Number(val)), { message: "Must be a number format." }
    ).transform(
      (val) => val ? Number(val) : null
    ),
    batteryCapacity: z.string().refine(
      (val) => !isNaN(Number(val)), { message: "Must be a number format." }
    ).transform(
      (val) => val ? Number(val) : null
    ),
  })
})