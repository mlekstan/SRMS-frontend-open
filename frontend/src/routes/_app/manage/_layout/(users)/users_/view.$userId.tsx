import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { userFormOpts } from '../../../-forms/user-form/userForm-options';
import { Loader } from '@/routes/-components/Loader';
import { FailureDialog } from '../../../-components/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { memo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslationContext } from '@/providers/TranslationContext';
import { FormPaper, FormPaperContainer } from '../../../-components/FormPaper';
import { Typography } from '@mui/material';
import Form from '../../../-forms/Form';
import { userFormConfig } from '../../../-forms/user-form/userForm-config';
import { userFormSchema } from '../../../-forms/user-form/userForm-schema';
import { createChildForm } from '../../../-forms/createChildForm';
import type { Leaves } from '@/types/Leaves';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import CustomBreadcrumbs from '../../../-components/CustomBreadcrumbs';
import { apiGet } from '@/api/apiGet';
import type { Branch, User } from '@/api/types';
import { apiPut } from '@/api/apiPut';

type FormFields = Leaves<typeof userFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, string | number>;

export const Route = createFileRoute(
  "/_app/manage/_layout/(users)/users/view/$userId",
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    
    await context.queryClient.fetchQuery({
      queryKey: ["braches"],
      queryFn: () => apiGet<Branch>({ url: "branches" }),
      staleTime: 10000,
    });
    
    await context.queryClient.fetchQuery({
      queryKey: ["user", params.userId],
      queryFn: () => apiGet<User>({ url: "/users", id: params.userId }),
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
          goBack(router, canGoBack, "/manage/users/view");
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
  { to: "/manage/users/create", label: "registration.user" },
  { to: "/manage/users/view", label: "view.users" },
  { to: "/manage/users/view/$userId", label: "edit.user" }
];


const ChildForm = memo(createChildForm(userFormOpts));

function RouteComponent() {
  const [key, setKey] = useState(0);
  const params = Route.useParams();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const branchesQuery = useQuery({ 
    queryKey: ["branches"], 
    queryFn: () => apiGet<Branch>({ url: "/branches" }), 
    retry: 0, 
    refetchInterval: 10000 
  });
  const userQuery = useQuery({ 
    queryKey: ["user", params.userId], 
    queryFn: () => apiGet<User>({ url: "/users", id: params.userId }), 
    retry: 0, 
    refetchInterval: 10000 
  });
  const {t} = useTranslationContext();

  let initialFieldsValuesMap: FieldsValuesMap | undefined;
  if (userQuery.data) {
    initialFieldsValuesMap = {
      "userData.firstName": userQuery.data.firstName,
      "userData.middleName": userQuery.data.middleName,
      "userData.lastName": userQuery.data.lastName,
      "userData.email": userQuery.data.email,
      "userData.areaCode": userQuery.data.areaCode,
      "userData.phoneNumber": userQuery.data.phoneNumber,
      "userData.branchId": userQuery.data.branch.id,
      "userData.password": "",
    };
  }

  return (
    <>
      {
        (
          (branchesQuery.isSuccess && userQuery.isSuccess) ||
          (branchesQuery.data && userQuery.data)
        ) &&

        <FormPaperContainer>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('edit.user')}</Typography>
            <Form 
              key={key}
              initialFieldsValuesMap={initialFieldsValuesMap}
              reset={() => {
                setKey(prev => prev + 1)
              }} 
              requestFn={(value) => apiPut("/users", params.userId, value)}
              formOptions={userFormOpts}
              validationSchema={userFormSchema}
              childFormComponent={ChildForm}
              childFormsProps={[
                {
                  title: "registration.user.form.user.title", formConfig: userFormConfig.userFieldsConfig
                },
              ]}
            />
          </FormPaper>
        </FormPaperContainer>       
      }

      
      { 
        (branchesQuery.isPending || userQuery.isPending) &&
        <Loader open={true} /> 
      }
      
      { 
        (branchesQuery.isError || userQuery.isError) && 
        <FailureDialog
          open={true} 
          closeFn={() => {
            goBack(router, canGoBack, "/manage/users/view");
          }} 
          duration={null}
          info={"failureDialog.info.data"}
          message={
            (branchesQuery.error && userQuery.error) ? 
            `${branchesQuery.error.message}. ${userQuery.error.message}.` :
            branchesQuery.error?.message ??
            userQuery.error?.message ??
            ""
          }
        />
      }
    </>
  );
}