import { createFileRoute } from '@tanstack/react-router'
import { memo, useState } from 'react';
import { createChildForm } from './-forms/createChildForm';
import { driveTypeFormOpts } from './-forms/driveType-form/driveTypeForm-options';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { useTranslationContext } from '@/providers/TranslationContext';
import { FormPaper, FormPaperContainer } from './-components/FormPaper';
import CustomBreadcrumbs from './-components/CustomBreadcrumbs';
import { Typography } from '@mui/material';
import Form from './-forms/Form';
import { driveTypeFormConfig } from './-forms/driveType-form/driveTypeForm-config';
import { addDriveType } from '@/api/driveTypes/driveTypes.post';
import { driveTypeFormSchema } from './-forms/driveType-form/driveTypeForm-schema';

export const Route = createFileRoute('/_app/register/drive-type')({
  component: RouteComponent,
})


const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/register", label: "menu.registration" },
  { to: "/register/drive-type", label: "registration.driveType" }
]

const ChildForm = memo(createChildForm(driveTypeFormOpts));

function RouteComponent() {
  const [key, setKey] = useState(0);
  const {t} = useTranslationContext();

  return (
    <FormPaperContainer>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      
      <FormPaper square elevation={5}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t("registration.driveType")}</Typography>
          <Form 
            key={key} 
            reset={() => {
              setKey(prev => prev + 1)
            }} 
            requestFn={addDriveType}
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
