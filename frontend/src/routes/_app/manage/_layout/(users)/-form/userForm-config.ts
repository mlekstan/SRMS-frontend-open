import type { FormConfig } from "../../../-forms/types/types";
import { PhoneFieldsGroup } from "../../../-forms/groups/PhoneFieldsGroup";
import { apiGet } from "@/api/apiGet";
import type { Branch } from "@/api/types";

type keys = "userFieldsConfig";

export const userFormConfig: FormConfig<keys> = {
  userFieldsConfig: [
    { 
      fieldName: "userData.firstName",
      label: "registration.user.form.user.firstName", 
      required: true, 
      type: 'text',
      imaskProps: { mask: /^[\p{L}-]{1,40}$/u , overwrite: false, lazy: false },
      validators: {
        onChange: ({ value }) => {
          const length = value.length
          if (length === 0) {
            return ("validation.empty");
          }
        },
      },
    },
    { 
      fieldName: "userData.middleName",
      label: "registration.user.form.user.middleName", 
      required: false, 
      type: 'text', 
      imaskProps: { mask: /^[\p{L}-]{0,40}$/u , overwrite: false, lazy: false },
    },
    {
      fieldName: "userData.lastName",
      label: "registration.user.form.user.lastName",
      required: true,
      type: "text",
      imaskProps: { mask: /^[\p{L}-]{1,80}$/u , overwrite: false, lazy: false },
      validators: {
        onChange: ({ value }) => {
          const length = value.length
          if (length === 0) {
            return ("validation.empty");
          }
        },
      }
    },
    {
      fieldName: "userData.email",
      label: "registration.user.form.user.email",
      required: true,
      type: "text",
      imaskProps: { mask: /^[a-z0-9._%+-@]*$/i, overwrite: false, lazy: false },
      validators: {
        onChange: ({ value }) => {
          const regex = /^((?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,})?$/i
          if (!regex.test(value)) {
            return "validation.email";
          }
        }
      }
    },
    { 
      group: [
        { 
          fieldName: "userData.areaCode"
        },
        { 
          fieldName: "userData.phoneNumber"
        }
      ], 
      component: PhoneFieldsGroup 
    },
    {
      fieldName: "userData.branchId",
      label: "registration.user.form.user.branch",
      required: true,
      type: 'text',
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("validation.empty");
          }
        },
      },
      componentName: "FormAutocomplete",
      optionLabel: "name",
      optionValue: "id",
      queryFn: () => apiGet<Branch>({ url: "/branches" }),
      queryKey: "branches"
    },
    {
      fieldName: "userData.password",
      label: "registration.user.form.user.password",
      required: true,
      type: "text",
      imaskProps: { mask: /^.{1,255}$/u , overwrite: false, lazy: false },
      validators: {
        onChange: ({ value }) => {
          if (!value) {
            return ("validation.empty");
          }
        },
      },      
    }
  ],
}