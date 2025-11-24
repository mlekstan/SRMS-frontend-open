import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { createFileRoute } from '@tanstack/react-router'
import { memo, useState } from 'react';
import { createChildForm } from '../../../-forms/createChildForm';
import { useTranslationContext } from '@/providers/TranslationContext';
import { FormPaper, FormPaperContainer } from '../../../-components/FormPaper';
import CustomBreadcrumbs from '../../../-components/CustomBreadcrumbs';
import { Typography } from '@mui/material';
import Form from '../../../-forms/Form';
import { apiPost } from '@/api/apiPost';
import { categoryFormOpts } from '../../../-forms/category-form/categoryForm-options';
import { categoryFormSchema } from '../../../-forms/category-form/categoryForm-schema';
import { categoryFormConfig } from '../../../-forms/category-form/categoryForm-config';

export const Route = createFileRoute('/_app/manage/_layout/(categories)/categories/create')({
  component: RouteComponent,
})

const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/categories/create", label: "registration.category" }
]


const ChildForm = memo(createChildForm(categoryFormOpts));

function RouteComponent() {
  const [key, setKey] = useState(0);
  const {t} = useTranslationContext();

  return (
    <FormPaperContainer>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      
      <FormPaper square elevation={5}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('registration.category')}</Typography>
          <Form 
            key={key} 
            reset={() => {
              setKey(prev => prev + 1)
            }} 
            requestFn={(value) => apiPost("/categories", value)}
            formOptions={categoryFormOpts}
            validationSchema={categoryFormSchema}
            childFormComponent={ChildForm}
            childFormsProps={[
              {
                title: "registration.category.form.category.title", formConfig: categoryFormConfig.categoryFieldsConfig
              },
            ]}
          />  
      </FormPaper>
    </FormPaperContainer>
  );
}