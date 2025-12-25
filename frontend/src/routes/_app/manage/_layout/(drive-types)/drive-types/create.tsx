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
import { driveTypeFormOpts } from '../-form/driveTypeForm-options';
import { driveTypeFormSchema } from '../-form/driveTypeForm-schema';
import { driveTypeFormConfig } from '../-form/driveTypeForm-config';

export const Route = createFileRoute('/_app/manage/_layout/(drive-types)/drive-types/create')({
  component: RouteComponent,
})

const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/drive-types/create", label: "registration.driveType" }
]


const ChildForm = memo(createChildForm(driveTypeFormOpts));

function RouteComponent() {
  const [key, setKey] = useState(0);
  const {t} = useTranslationContext();

  return (
    <FormPaperContainer>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      
      <FormPaper square elevation={5}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('registration.driveType')}</Typography>
          <Form 
            key={key} 
            reset={() => {
              setKey(prev => prev + 1)
            }} 
            requestFn={(value) => apiPost("/drive-types", value)}
            formOptions={driveTypeFormOpts}
            validationSchema={driveTypeFormSchema}
            childFormComponent={ChildForm}
            childFormsProps={[
              {
                title: "registration.driveType.form.driveType.title", formConfig: driveTypeFormConfig.driveTypeFieldsConfig
              },
            ]}
          />  
      </FormPaper>
    </FormPaperContainer>
  );
}