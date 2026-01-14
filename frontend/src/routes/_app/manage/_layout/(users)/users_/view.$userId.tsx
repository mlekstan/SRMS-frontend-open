import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { userFormOpts } from '../-form/userForm-options';
import { Loader } from '@/routes/-components/Loader';
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { memo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import { Box, Typography } from '@mui/material';
import Form from '../../../-forms/Form';
import { userFormConfig } from '../-form/userForm-config';
import { userFormSchema } from '../-form/userForm-schema';
import { createChildForm } from '../../../-forms/createChildForm';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { apiGet } from '@/api/apiGet';
import type { Branch, User } from '@/api/types';
import { apiPut } from '@/api/apiPut';
import { transformData } from '../-form/transformData';


export const Route = createFileRoute(
  "/_app/manage/_layout/(users)/users/view/$userId",
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.fetchQuery({
      queryKey: ["braches"],
      queryFn: () => apiGet<Branch>({ url: "branches" }),
    });
    
    await context.queryClient.fetchQuery({
      queryKey: ["user", params.userId],
      queryFn: () => apiGet<User>({ url: "/users", id: params.userId }),
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
  const { t } = useTranslationContext();
  const [key, setKey] = useState(0);
  const params = Route.useParams();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const queryClient = useQueryClient();

  const branchesQuery = useQuery({ 
    queryKey: ["branches"], 
    queryFn: () => apiGet<Branch>({ url: "/branches" }), 
    staleTime: 10 * 1000
  });
  const userQuery = useQuery({ 
    queryKey: ["user", params.userId], 
    queryFn: () => apiGet<User>({ url: "/users", id: params.userId }), 
    staleTime: 10 * 1000, 
    select: data => transformData(data)
  });

  return (
    <Box sx={{ height: "100%" }}>
      {
        (
          (branchesQuery.isSuccess && userQuery.isSuccess) ||
          (branchesQuery.data && userQuery.data)
        ) &&

        <FormPaperContainer sx={{ boxSizing: "border-box", height: "100%", overflow: "auto" }}>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('edit.user')}</Typography>
            <Form 
              key={key}
              initialFieldsValuesMap={userQuery.data}
              reset={() => {
                setKey(prev => prev + 1)
              }} 
              requestFn={(value) => apiPut("/users", params.userId, value)}
              onSubmit={() => queryClient.invalidateQueries({ queryKey: ["user", params.userId] })}
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
    </Box>
  );
}