import type { FormConfig } from "../types/types";

type keys = "categoryFieldsConfig"

export const categoryFormConfig: FormConfig<keys> = {
  categoryFieldsConfig: [
    {
      fieldName: "categoryData.name",
      label: "registration.category.form.category.name",
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