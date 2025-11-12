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
import { addCard } from "@/api/cards/cards.post";



export const Route = createFileRoute("/_app/manage/card")({
  component: RouteComponent,
})


const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/card", label: "registration.client" }
]


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