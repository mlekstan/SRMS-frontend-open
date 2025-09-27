import { createFileRoute } from "@tanstack/react-router";
import Typography from "@mui/material/Typography";
import CustomBreadcrumbs from "./-components/CustomBreadcrumbs";
import { FormPaperContainer, FormPaper } from "./-components/FormPaper";
import Form from "./-forms/Form";
import { memo, useState } from "react";
import { itemFormOpts } from "./-forms/item-form/itemForm-options";
import { createChildForm } from "./-forms/createChildForm";
import { itemFormConfig } from "./-forms/item-form/itemForm-config";
import { itemFormSchema } from "./-forms/item-form/itemForm-schema";
import type { ExtendedLinkOptions } from "@/types/ExtendedLinkOptions";
import { useTranslationContext } from "@/providers/TranslationContext";



export const Route = createFileRoute('/_app/register/item')({
  component: RouteComponent,
})


const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/register", label: "menu.registration" },
  { to: "/register/item", label: "registration.item" },
];

const addItem = async (value: Record<string, Record<string, any>>) => {
  try {
    const response = await fetch("https://localhost:3000/items/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`)
    }
  } catch (error) {
    throw error;
  }
}



const ChildForm = memo(createChildForm(itemFormOpts))

function RouteComponent() {
  const [key, setKey] = useState(0);
  const {t} = useTranslationContext();

  return (
    <FormPaperContainer>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      
      <FormPaper square elevation={5}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t("registration.item")}</Typography>
          <Form 
            key={key} 
            reset={() => {
              setKey(prev => prev + 1)
            }} 
            requestFn={addItem}
            formOptions={itemFormOpts}
            validationSchema={itemFormSchema}
            childFormComponent={ChildForm}
            childFormsProps={[
              {
                title: "registration.item.form.base.title", formConfig: itemFormConfig.basicFieldsConfig
              },
              {
                title: "registration.item.form.sale.title", formConfig: itemFormConfig.saleFieldsConfig
              }
            ]}
          />         
      </FormPaper>
    </FormPaperContainer>
  );
}
