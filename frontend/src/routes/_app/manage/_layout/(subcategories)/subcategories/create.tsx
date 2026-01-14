import { apiGet } from '@/api/apiGet';
import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { Loader } from '@/routes/-components/Loader';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { memo, useState } from 'react';
import { createChildForm } from '../../../-forms/createChildForm';
import { useQuery } from '@tanstack/react-query';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { Box, Typography } from '@mui/material';
import Form from '../../../-forms/Form';
import { apiPost } from '@/api/apiPost';
import type { Category, DriveType } from '@/api/types';
import { subcategoryFormOpts } from '../-form/subcategoryForm-options';
import { subcategoryFormSchema } from '../-form/subcategoryForm-schema';
import { subcategoryFormConfig } from '../-form/subcategoryForm-config';

export const Route = createFileRoute('/_app/manage/_layout/(subcategories)/subcategories/create')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData({
      queryKey: ["categories"],
      queryFn: () => apiGet<Category>({ url: "/categories" }),
    });

    await context.queryClient.ensureQueryData({
      queryKey: ["driveTypes"],
      queryFn: () => apiGet<DriveType>({ url: "/drive-types" }),
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
          goBack(router, canGoBack, "/manage");
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
  { to: "/manage/subcategories/create", label: "registration.subcategory" }
]

const ChildForm = memo(createChildForm(subcategoryFormOpts));



function RouteComponent() {
  const [key, setKey] = useState(0);
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const {t} = useTranslationContext();

  const { 
    data: cData, 
    error: cError, 
    isSuccess: cIsSuccess, 
    isPending: cIsPending, 
    isError: cIsError 
  } = useQuery({ queryKey: ["categories"], queryFn: () => apiGet<Category>({ url: "/categories" }), staleTime: 10 * 1000 });
  
  const {
    data: dData,
    error: dError,
    isSuccess: dIsSuccess,
    isPending: dIsPending,
    isError: dIsError
  } = useQuery({ queryKey: ["driveTypes"], queryFn: () => apiGet<DriveType>({ url: "/drive-types" }), staleTime: 10 * 1000 });

  return (
    <Box sx={{ flex: 1, overflow: "hidden" }}>
      {
        ((cIsSuccess && dIsSuccess) || (cData && dData)) &&
        <FormPaperContainer sx={{ height: "100%", boxSizing: "border-box", overflow: "auto" }}>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          <FormPaper square elevation={5} sx={{ boxSizing: "border-box", overflow: "auto" }}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('registration.subcategory')}</Typography>
            <Form 
              key={key} 
              reset={() => {
                setKey(prev => prev + 1)
              }} 
              requestFn={(value) => apiPost({ url: "/subcategories", value })}
              formOptions={subcategoryFormOpts}
              validationSchema={subcategoryFormSchema}
              childFormComponent={ChildForm}
              childFormsProps={[
                {
                  title: "registration.subcategory.form.subcategory.title", formConfig: subcategoryFormConfig.subcategoryFieldsConfig
                },
                {
                  title: "registration.subcategory.form.vehicle.title", formConfig: subcategoryFormConfig.vehicleFieldsConfig
                },
                {
                  title: "registration.subcategory.form.electricVehicle.title", formConfig: subcategoryFormConfig.electricVehicleFieldsConfig
                }
              ]}
            />
          </FormPaper>
        </FormPaperContainer>       
      }

      
      {
        (cIsPending || dIsPending) &&
        <Loader open={true} />
      }
      
      {
        (cIsError || dIsError) &&
        <FailureDialog 
          open={true} 
          closeFn={() => {
            goBack(router, canGoBack, "/manage");
          }} 
          duration={null} 
          message={
            (cError && dError) ? `${cError.message}. ${dError.message}.` : cError?.message ?? dError?.message ?? ``
          }
          info="failureDialog.info.data"
        />
      }
    </Box>
  );
}