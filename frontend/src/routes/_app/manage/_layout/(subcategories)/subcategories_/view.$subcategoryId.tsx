import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { Box, Typography } from '@mui/material';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import { apiGet } from '@/api/apiGet';
import { useQuery } from '@tanstack/react-query';
import type { Category, DriveType, Subcategory } from '@/api/types';
import Form from '../../../-forms/Form';
import { memo, useState } from 'react';
import { createChildForm } from '../../../-forms/createChildForm';
import type { Leaves } from '@/types/Leaves';
import { apiPut } from '@/api/apiPut';
import { Loader } from '@/routes/-components/Loader';
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { subcategoryFormOpts } from '../-form/subcategoryForm-options';
import { subcategoryFormSchema } from '../-form/subcategoryForm-schema';
import { subcategoryFormConfig } from '../-form/subcategoryForm-config';


type FormFields = Leaves<typeof subcategoryFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, any>;


const formatErrorMsg = (errors: Array<Error | null>): string => {
  let message = "";
  errors.forEach(error => {
    if (error) {
      message += `${error.message}. `;
    }
  });

  return message;
}

export const Route = createFileRoute(
  '/_app/manage/_layout/(subcategories)/subcategories/view/$subcategoryId',
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {

    await context.queryClient.fetchQuery({
      queryKey: ["subcategory", params.subcategoryId],
      queryFn: () => apiGet<Subcategory>({ url: "/subcategories", id: params.subcategoryId }),
      staleTime: 10000,
    });

    await context.queryClient.fetchQuery({
      queryKey: ["categories"],
      queryFn: () => apiGet<Category>({ url: "/categories" }),
      staleTime: 10000,
    });

    await context.queryClient.fetchQuery({
      queryKey: ["driveTypes"],
      queryFn: () => apiGet<DriveType>({ url: "/drive-types" }),
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
          goBack(router, canGoBack, "/manage/subcategories/view");
        }}
        duration={null}
        info={"failureDialog.info.loader"}
        message={error.message}
      />
    );
  }
})


const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/subcategories/create", label: "registration.subcategory" },
  { to: "/manage/subcategories/view", label: "view.subcategories" },
  { to: "/manage/subcategories/view/$subcategoryId", label: "edit.subcategory" }
];

const ChildForm = memo(createChildForm(subcategoryFormOpts));


function RouteComponent() {
  const [key, setKey] = useState(0);
  const { t } = useTranslationContext();
  const params = Route.useParams();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  
  const subcategoryQuery = useQuery({ 
    queryKey: ["subcategory", params.subcategoryId], 
    queryFn: () => apiGet<Subcategory>({ url: "/subcategories", id: params.subcategoryId }),
    retry: 0,
    refetchInterval: 10000,
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => apiGet<Category>({ url: "/categories" }),
    retry: 0,
    refetchInterval: 10000,
  });

  const driveTypesQuery = useQuery({
    queryKey: ["driveTypes"],
    queryFn: () => apiGet<DriveType>({ url: "/drive-types" }),
    retry: 0,
    refetchInterval: 10000,
  });

  console.log("Subcategory:", subcategoryQuery.data);

  let initialFiledsValueMap: Partial<FieldsValuesMap> | undefined;
  if (subcategoryQuery.data) {
    const d = subcategoryQuery.data;

    initialFiledsValueMap = {
      ...(d.category && {
        "subcategoryData.categoryId": d.category.id,
        "subcategoryData.name": d.name,
      }),

      ...(d.vehicle && {
        "vehicleData.curbWeight": d.vehicle.curbWeight,
        "vehicleData.maxLoad": d.vehicle.maxLoad,
        "vehicleData.minAge": d.vehicle.minAge,
        "vehicleData.maxAge": d.vehicle.maxAge,
      }),

      ...(d.vehicle?.driveType && {
        "vehicleData.driveTypeId": d.vehicle.driveType.id,
      }),

      ...(d.vehicle?.electricVehicle && {
        "electricVehicleData.enginePower": d.vehicle.electricVehicle.enginePower,
        "electricVehicleData.batteryVoltage": d.vehicle.electricVehicle.batteryVoltage,
        "electricVehicleData.batteryCapacity": d.vehicle.electricVehicle.batteryCapacity,
      }),
    };
  }



  return (
    <Box sx={{ height: "100%" }}>
      {
        (
          (subcategoryQuery.isSuccess && categoriesQuery.isSuccess && driveTypesQuery.isSuccess) ||
          (subcategoryQuery.data && categoriesQuery.data && driveTypesQuery.data)
        ) &&

        <FormPaperContainer sx={{ boxSizing: "border-box", height: "100%", overflow: "auto" }}>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('edit.subcategory')}</Typography>
            <Form 
              key={key}
              initialFieldsValuesMap={initialFiledsValueMap}
              reset={() => {
                subcategoryQuery.refetch();
                setKey(prev => prev + 1);
              }} 
              requestFn={(value) => apiPut("/subcategories", params.subcategoryId, value)}
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
                },
              ]}
            />
          </FormPaper>
        </FormPaperContainer>
      }

      { 
        (subcategoryQuery.isPending || categoriesQuery.isPending || driveTypesQuery.isPending) &&
        <Loader open={true} /> 
      }
      
      { 
        (subcategoryQuery.isError || categoriesQuery.isError || driveTypesQuery.isError) && 
        <FailureDialog
          open={true} 
          closeFn={() => {
            goBack(router, canGoBack, "/manage/subcategories/view");
          }} 
          duration={null}
          info={"failureDialog.info.data"}
          message={
            formatErrorMsg([
              subcategoryQuery.error,
              categoriesQuery.error,
              driveTypesQuery.error,
            ])
          }
        />
      }
    </Box>
  );
}