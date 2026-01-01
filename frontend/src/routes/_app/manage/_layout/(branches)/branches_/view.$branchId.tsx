import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import type { Leaves } from '@/types/Leaves';
import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { memo, useState } from 'react';
import { branchFormOpts } from '../-form/branchForm-options';
import { Loader } from '@/routes/-components/Loader';
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { Box, Typography } from '@mui/material';
import Form from '../../../-forms/Form';
import { branchFormConfig } from '../-form/branchForm-config';
import { branchFormSchema } from '../-form/branchForm-schema';
import { useQuery } from '@tanstack/react-query';
import { createChildForm } from '../../../-forms/createChildForm';
import { apiPut } from '@/api/apiPut';
import { apiGet } from '@/api/apiGet';
import type { Branch } from '@/api/types';


type FormFields = Leaves<typeof branchFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, string | number>;


export const Route = createFileRoute(
  '/_app/manage/_layout/(branches)/branches/view/$branchId',
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {

    await context.queryClient.fetchQuery({
      queryKey: ["branch", params.branchId],
      queryFn: () => apiGet<Branch>({ url: "/branches", id: params.branchId }),
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
          goBack(router, canGoBack, "/manage/branches/view");
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
  { to: "/manage/branches/create", label: "registration.user" },
  { to: "/manage/branches/view", label: "view.branches" },
  { to: "/manage/branches/view/$branchId", label: "edit.branch" }
];


const ChildForm = memo(createChildForm(branchFormOpts));


function RouteComponent() {
  const [key, setKey] = useState(0);
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const {t} = useTranslationContext();
  const params = Route.useParams();
  const { data, error, isSuccess, isPending, isError } = useQuery({
    queryKey: ["branch", params.branchId], 
    queryFn: () => apiGet<Branch>({ url: "/branches", id: params.branchId }), 
    retry: 0, 
    refetchInterval: 10000 
  });

  let initialFieldsValuesMap: FieldsValuesMap | undefined;
  if (data) {
    initialFieldsValuesMap = {
      "branchData.name": data.name,
      "branchData.country": data.country,
      "branchData.city": data.city,
      "branchData.street": data.street,
      "branchData.streetNumber": data.streetNumber,
      "branchData.flatNumber": data.flatNumber,
      "branchData.zipCode": data.zipCode,
    };
  }
  
  
  return (
    <Box sx={{ height: "100%" }}>
      {
        (isSuccess || data) &&
        <FormPaperContainer sx={{ boxSizing: "border-box", height: "100%", overflow: "auto" }}>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('edit.branch')}</Typography>
              <Form 
                key={key}
                initialFieldsValuesMap={initialFieldsValuesMap}
                reset={() => {
                  setKey(prev => prev + 1)
                }} 
                requestFn={(value) => apiPut("/branches", params.branchId, value)}
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
            goBack(router, canGoBack, "/manage/branches/view");
          }}
          duration={null}
          info={"failureDialog.info.data"}
          message={error.message}
        />
      }
    </Box>
  );
}