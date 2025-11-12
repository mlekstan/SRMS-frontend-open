import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions'
import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { createChildForm } from './-forms/createChildForm'
import { memo, useState } from 'react'
import { useTranslationContext } from '@/providers/TranslationContext'
import { FormPaper, FormPaperContainer } from './-components/FormPaper'
import CustomBreadcrumbs from './-components/CustomBreadcrumbs'
import { Typography } from '@mui/material'
import Form from './-forms/Form'
import { subcategoryFormOpts } from './-forms/subcategory-form/subcategoryForm-options'
import { subcategoryFormConfig } from './-forms/subcategory-form/subcategoryForm-config'
import { subcategoryFormSchema } from './-forms/subcategory-form/subcategoryForm-schema'
import { addSubcategory } from '../../../api/subcategories/subcategories.post'
import { getCategories } from '@/api/categories/categories.get'
import { getDriveTypes } from '../../../api/driveTypes/driveTypes.get'
import { Loader } from '@/routes/-components/Loader'
import { FailureDialog } from './-components/FailureDialog'
import { goBack } from './-forms/goBack'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_app/manage/subcategory')({
  component: RouteComponent,
  loader: async ({ context, route }) => {
    
    await context.queryClient.fetchQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
      staleTime: 10000,
    });

    await context.queryClient.fetchQuery({
      queryKey: ["driveTypes"],
      queryFn: getDriveTypes,
      staleTime: 10000,
    });
  
  },
  gcTime: 0,
  shouldReload: false,
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
        message={error.message}
      />
    );
  }
});



const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/subcategory", label: "registration.subcategory" }
];


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
  } = useQuery({ queryKey: ["categories"], queryFn: getCategories, retry: 0, refetchInterval: 10000 });
  
  const { 
    data: dTData, 
    error: dTError, 
    isSuccess: dTIsSuccess, 
    isPending: dTIsPending, 
    isError: dTIsError 
  } = useQuery({ queryKey: ["driveTypes"], queryFn: getDriveTypes, retry: 0, refetchInterval: 10000 });

  
  return (
    <>
      { 
        ((cIsSuccess && dTIsSuccess) || (cData && dTData)) &&
        <FormPaperContainer>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t("registration.subcategory")}</Typography>
              <Form 
                key={key} 
                reset={() => {
                  setKey(prev => prev + 1)
                }} 
                requestFn={addSubcategory}
                formOptions={subcategoryFormOpts}
                validationSchema={subcategoryFormSchema}
                childFormComponent={ChildForm}
                childFormsProps={[
                  {
                    title: "registration.subcategory.form.subcategory.title", formConfig: subcategoryFormConfig.subcategoryFieldsConfig, render: true
                  },
                  {
                    title: "registration.subcategory.form.vehicle.title", formConfig: subcategoryFormConfig.vehicleFieldsConfig, render: false
                  },
                  {
                    title: "registration.subcategory.form.electricVehicle.title", formConfig: subcategoryFormConfig.electricVehicleFieldsConfig, render: false
                  }
                ]}
              />
          </FormPaper>
        </FormPaperContainer>
      }

      { 
        (cIsPending || dTIsPending) &&
        <Loader open={true} />
      }

      {
        (cIsError || dTIsError) &&
        <FailureDialog 
          open={true}
          closeFn={() => {
            goBack(router, canGoBack, "/manage")
          }}
          duration={null}
          message={
            (cError && dTError) ? `${cError.message}. ${dTError.message}.` : cError?.message ?? dTError?.message ?? ""
          }
        />
      }
    </>
  );
}