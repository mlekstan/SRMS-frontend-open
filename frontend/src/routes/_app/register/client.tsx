import { createFileRoute } from "@tanstack/react-router";
import Typography from "@mui/material/Typography";
import { clientFormConfig } from "./-forms/client-form/clientForm-config";
import CustomBreadcrumbs from "./-components/CustomBreadcrumbs";
import { FormPaperContainer, FormPaper } from "./-components/FormPaper";
import { memo, useState } from "react";
import Form from "./-forms/Form";
import { clientFormOpts } from "./-forms/client-form/clientForm-options";
import { schema } from "./-forms/client-form/clientForm-schema";
import { createChildForm } from "./-forms/createChildForm";
import { useTranslationContext } from "@/providers/TranslationContext";
import type { ExtendedLinkOptions } from "@/types/ExtendedLinkOptions";



export const Route = createFileRoute('/_app/register/client')({
  component: RouteComponent,
})


const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/register", label: "menu.registration" },
  { to: "/register/client", label: "registration.client" }
]


const addClient = async (value: Record<string, Record<string, any>>) => {
  try {
    const response = await fetch("http://localhost:3000/clients/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value),
    });

    if (!response.ok) {
      throw Error(`${response.status}. ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Success:", result);

  } catch (error) {
    throw error;
  }
}



const ChildForm = memo(createChildForm(clientFormOpts));

function RouteComponent() {
  const [key, setKey] = useState(0);
  const {t} = useTranslationContext();
  
  return (
    <FormPaperContainer>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      
      <FormPaper square elevation={5}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t("registration.client")}</Typography>
        <Form 
          key={key} 
          reset={() => {
            setKey(prev => prev + 1)
          }} 
          requestFn={addClient}
          formOptions={clientFormOpts}
          validationSchema={schema}
          childFormComponent={ChildForm}
          childFormsProps={[
            {
              title: "registration.client.form.card.title", formConfig: clientFormConfig.cardFieldsConfig
            },
            {
              title: "registration.client.form.personal.title", formConfig: clientFormConfig.personalFieldsConfig
            },
            {
              title: "registration.client.form.residence.title", formConfig: clientFormConfig.residenceFieldsConfig
            },
            {
              title: "registration.client.form.contact.title", formConfig: clientFormConfig.contactFieldsConfig
            }
          ]}
        />
      </FormPaper>
    </FormPaperContainer>
  );
}
