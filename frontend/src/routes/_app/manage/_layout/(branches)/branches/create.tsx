import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { createFileRoute } from '@tanstack/react-router'
import { memo, useState } from 'react';
import { createChildForm } from '../../../-forms/createChildForm';
import { branchFormOpts } from '../-form/branchForm-options';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { Box, Typography } from '@mui/material';
import Form from '../../../-forms/Form';
import { branchFormSchema } from '../-form/branchForm-schema';
import { branchFormConfig } from '../-form/branchForm-config';
import { apiPost } from '@/api/apiPost';

export const Route = createFileRoute('/_app/manage/_layout/(branches)/branches/create')({
  component: RouteComponent,
})

const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/branches/create", label: "registration.branch" }
]


const ChildForm = memo(createChildForm(branchFormOpts));

function RouteComponent() {
  const [key, setKey] = useState(0);
  const {t} = useTranslationContext();

  return (
    <Box sx={{ flex: 1, overflow: "hidden" }}>
      <FormPaperContainer sx={{ height: "100%", boxSizing: "border-box", overflow: "auto" }}>
        <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
        <FormPaper square elevation={5} sx={{ boxSizing: "border-box", overflow: "auto" }}>
          <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('registration.branch')}</Typography>
            <Form 
              key={key} 
              reset={() => {
                setKey(prev => prev + 1)
              }} 
              requestFn={(value) => apiPost("/branches", value)}
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
    </Box>
  );
}