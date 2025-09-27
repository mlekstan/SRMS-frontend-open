import { createFileRoute } from "@tanstack/react-router";
import Typography from "@mui/material/Typography";
import { cardFormSchema } from "./-forms/card-form/cardForm-schema";
import CustomBreadcrumbs from "./-components/CustomBreadcrumbs";
import { FormPaperContainer, FormPaper } from "./-components/FormPaper";
import Form from "./-forms/Form";
import { memo, useState } from "react";
import { createChildForm } from "./-forms/createChildForm";
import { cardFormOpts } from "./-forms/card-form/cardForm-options";
import { cardFormConfig } from "./-forms/card-form/cardForm-config";
import type { ExtendedLinkOptions } from "@/types/ExtendedLinkOptions";
import { useTranslationContext } from "@/providers/TranslationContext";



export const Route = createFileRoute("/_app/register/card")({
  component: RouteComponent,
})


const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/register", label: "menu.registration" },
  { to: "/register/card", label: "registration.client" }
]


const addCard = async (value: Record<string, Record<string, any>>) => {
  try {
    const response = await fetch("https://localhost:3000/cards/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })

    if (!response.ok) {
      throw Error(`${response.status}. ${response.statusText}`)
    }
  } catch (error) {
    throw error;
  }
}


const ChildForm = memo(createChildForm(cardFormOpts));

function RouteComponent() {
  const [key, setKey] = useState(0);
  const {t} = useTranslationContext();

  return (
    <FormPaperContainer>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      
      <FormPaper square elevation={5}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t("registration.card")}</Typography>
          <Form 
            key={key} 
            reset={() => {
              setKey(prev => prev + 1)
            }} 
            requestFn={addCard}
            formOptions={cardFormOpts}
            validationSchema={cardFormSchema}
            childFormComponent={ChildForm}
            childFormsProps={[
              {
                title: "registration.card.form.card.title", formConfig: cardFormConfig.cardFieldsConfig
              },
            ]}
          />  
      </FormPaper>
    </FormPaperContainer>
  );
}