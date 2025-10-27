import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { createFileRoute } from '@tanstack/react-router'
import { branchFormOpts } from './-forms/branch-form/branchForm-options';
import { createChildForm } from './-forms/createChildForm';
import { memo, useState } from 'react';
import { useTranslationContext } from '@/providers/TranslationContext';
import { FormPaper, FormPaperContainer } from './-components/FormPaper';
import CustomBreadcrumbs from './-components/CustomBreadcrumbs';
import { Typography } from '@mui/material';
import Form from './-forms/Form';
import { branchFormConfig } from './-forms/branch-form/branchForm-config';
import { addBranch } from '@/api/branches/branches.post';
import { branchFormSchema } from './-forms/branch-form/branchForm-schema';

export const Route = createFileRoute('/_app/register/branch')({
  component: RouteComponent,
})

const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/register", label: "menu.registration" },
  { to: "/register/branch", label: "registration.branch" }
]


const ChildForm = memo(createChildForm(branchFormOpts));

function RouteComponent() {
  const [key, setKey] = useState(0);
  const {t} = useTranslationContext();

  return (
    <FormPaperContainer>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      
      <FormPaper square elevation={5}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t("registration.branch")}</Typography>
          <Form 
            key={key} 
            reset={() => {
              setKey(prev => prev + 1)
            }} 
            requestFn={addBranch}
            formOptions={branchFormOpts}
            validationSchema={branchFormSchema}
            childFormComponent={ChildForm}
            childFormsProps={[
              {
                title: "registration.branch.form.branch.title", formConfig: branchFormConfig.branchFieldsConfig
              },
            ]}
          />  
      </FormPaper>
    </FormPaperContainer>
  );
}
