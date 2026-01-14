import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { memo, useState } from 'react';
import { Loader } from '@/routes/-components/Loader';
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { Box, Typography } from '@mui/material';
import Form from '../../../-forms/Form';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createChildForm } from '../../../-forms/createChildForm';
import { apiPut } from '@/api/apiPut';
import { apiGet } from '@/api/apiGet';
import type { Category } from '@/api/types';
import { categoryFormOpts } from '../-form/categoryForm-options';
import { categoryFormConfig } from '../-form/categoryForm-config';
import { categoryFormSchema } from '../-form/categoryForm-schema';
import { transformData } from '../-form/transformData';


export const Route = createFileRoute(
  '/_app/manage/_layout/(categories)/categories/view/$categoryId',
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.fetchQuery({
      queryKey: ["category", params.categoryId],
      queryFn: () => apiGet<Category>({ url: "/categories", id: params.categoryId })
    });
  },
  pendingComponent: () => <Loader open={true} />,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    const canGoBack = useCanGoBack();

    return (
      <FailureDialog 
        open={true}
        closeFn={() => {
          reset();
          goBack(router, canGoBack, "/manage/categories/view");
        }}
        duration={null}
        info={"failureDialog.info.loader"}
        message={error.message}
      />
    );
  }
});


const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/categories/create", label: "registration.category" },
  { to: "/manage/categories/view", label: "view.categories" },
  { to: "/manage/categories/view/$categoryId", label: "edit.category" }
];


const ChildForm = memo(createChildForm(categoryFormOpts));


function RouteComponent() {
  const [key, setKey] = useState(0);
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const {t} = useTranslationContext();
  const params = Route.useParams();
  const queryClient = useQueryClient();
  const { data, error, isSuccess, isPending, isError } = useQuery({
    queryKey: ["category", params.categoryId], 
    queryFn: () => apiGet<Category>({ url: "/categories", id: params.categoryId }), 
    staleTime: 10 * 1000, 
    select: data => transformData(data)
  });


  return (
    <Box sx={{ height: "100%" }}>
      {
        (isSuccess || data) &&
        <FormPaperContainer sx={{ boxSizing: "border-box", height: "100%", overflow: "auto" }}>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('edit.category')}</Typography>
              <Form 
                key={key}
                initialFieldsValuesMap={data}
                reset={() => {
                  setKey(prev => prev + 1);
                }} 
                requestFn={(value) => apiPut("/categories", params.categoryId, value)} 
                onSubmit={() => queryClient.invalidateQueries({ queryKey: ["category", params.categoryId], exact: true })}
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
      }

      {
        isPending &&
        <Loader open={true} />
      }

      {
        (isError && error) && 
        <FailureDialog 
          open={true} 
          closeFn={() => {
            goBack(router, canGoBack, "/manage/categories/view");
          }}
          duration={null}
          info={"failureDialog.info.data"}
          message={error.message}
        />
      }
    </Box>
  );
}