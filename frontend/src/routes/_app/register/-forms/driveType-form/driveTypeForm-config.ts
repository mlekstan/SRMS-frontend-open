import type { FormConfig } from "../types/types";

type keys = "driveTypeFieldsConfig"

export const driveTypeFormConfig: FormConfig<keys> = {
  driveTypeFieldsConfig: [
    {
      fieldName: "driveTypeData.name",
      label: "registration.driveType.form.driveType.name",
      required: true,
      type: "text",
      imaskProps: { mask: /^.{1,255}$/u , overwrite: true, lazy: false },
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return "validation.empty";
          }
        }
      },
    },
  ],
} 