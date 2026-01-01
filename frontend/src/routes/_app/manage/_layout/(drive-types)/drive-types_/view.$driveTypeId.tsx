import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import type { Leaves } from '@/types/Leaves';
import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { memo, useState } from 'react';
import { Loader } from '@/routes/-components/Loader';
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { Box, Typography } from '@mui/material';
import Form from '../../../-forms/Form';
import { useQuery } from '@tanstack/react-query';
import { createChildForm } from '../../../-forms/createChildForm';
import { apiPut } from '@/api/apiPut';
import { apiGet } from '@/api/apiGet';
import type { DriveType } from '@/api/types';
import { driveTypeFormOpts } from '../-form/driveTypeForm-options';
import { driveTypeFormConfig } from '../-form/driveTypeForm-config';
import { driveTypeFormSchema } from '../-form/driveTypeForm-schema';


type FormFields = Leaves<typeof driveTypeFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, string | number>;


export const Route = createFileRoute(
  '/_app/manage/_layout/(drive-types)/drive-types/view/$driveTypeId',
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {

    await context.queryClient.fetchQuery({
      queryKey: ["driveType", params.driveTypeId],
      queryFn: () => apiGet<DriveType>({ url: "/drive-types", id: params.driveTypeId }),
      staleTime: 10000,
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
          goBack(router, canGoBack, "/manage/drive-types/view");
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
  { to: "/manage/drive-types/create", label: "registration.driveType" },
  { to: "/manage/drive-types/view", label: "view.driveTypes" },
  { to: "/manage/drive-types/view/$driveTypeId", label: "edit.driveType" }
];


const ChildForm = memo(createChildForm(driveTypeFormOpts));


function RouteComponent() {
  const [key, setKey] = useState(0);
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const {t} = useTranslationContext();
  const params = Route.useParams();
  const { data, error, isSuccess, isPending, isError } = useQuery({
    queryKey: ["driveType", params.driveTypeId], 
    queryFn: () => apiGet<DriveType>({ url: "/drive-types", id: params.driveTypeId }), 
    retry: 0, 
    refetchInterval: 10000 
  });

  let initialFieldsValuesMap: FieldsValuesMap | undefined;
  if (data) {
    initialFieldsValuesMap = {
      "driveTypeData.name": data.name
    };
  }

  return (
    <Box sx={{ height: "100%" }}>
      {
        (isSuccess || data) &&
        <FormPaperContainer sx={{ boxSizing: "border-box", height: "100%", overflow: "auto" }}>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('edit.driveType')}</Typography>
              <Form 
                key={key}
                initialFieldsValuesMap={initialFieldsValuesMap}
                reset={() => {
                  setKey(prev => prev + 1);
                }} 
                requestFn={(value) => apiPut("/drive-types", params.driveTypeId, value)}
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
            goBack(router, canGoBack, "/manage/drive-types/view");
          }}
          duration={null}
          info={"failureDialog.info.data"}
          message={error.message}
        />
      }
    </Box>
  );
}