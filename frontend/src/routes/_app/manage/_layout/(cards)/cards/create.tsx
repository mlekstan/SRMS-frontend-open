import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { createFileRoute } from '@tanstack/react-router'
import { memo, useState } from 'react';
import { createChildForm } from '../../../-forms/createChildForm';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { Typography } from '@mui/material';
import Form from '../../../-forms/Form';
import { apiPost } from '@/api/apiPost';
import { cardFormOpts } from '../-form/cardForm-options';
import { cardFormSchema } from '../-form/cardForm-schema';
import { cardFormConfig } from '../-form/cardForm-config';

export const Route = createFileRoute('/_app/manage/_layout/(cards)/cards/create')({
  component: RouteComponent,
})

const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/cards/create", label: "registration.card" }
]


const ChildForm = memo(createChildForm(cardFormOpts));

function RouteComponent() {
  const [key, setKey] = useState(0);
  const {t} = useTranslationContext();

  return (
    <FormPaperContainer sx={{ height: "100%", boxSizing: "border-box", overflow: "auto" }}>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      <FormPaper square elevation={5} sx={{ boxSizing: "border-box", overflow: "auto" }}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('registration.card')}</Typography>
          <Form 
            key={key} 
            reset={() => {
              setKey(prev => prev + 1)
            }} 
            requestFn={(value) => apiPost("/cards", value)}
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