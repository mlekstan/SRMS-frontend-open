import { formOptions } from "@tanstack/react-form";

export const loginFormOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
});