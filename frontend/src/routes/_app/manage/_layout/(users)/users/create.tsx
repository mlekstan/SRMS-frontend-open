import { Loader } from '@/routes/-components/Loader';
import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { memo, useState } from 'react';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { useQuery } from '@tanstack/react-query';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import { Box, Typography } from '@mui/material';
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { createChildForm } from '../../../-forms/createChildForm';
import { userFormOpts } from '../-form/userForm-options';
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import Form from '../../../-forms/Form';
import { userFormSchema } from '../-form/userForm-schema';
import { userFormConfig } from '../-form/userForm-config';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { apiGet } from '@/api/apiGet';
import type { Branch } from '@/api/types';
import { apiPost } from '@/api/apiPost';

export const Route = createFileRoute('/_app/manage/_layout/(users)/users/create')({
  component: RouteComponent,
  loader: async ({ context, route }) => {
    
    await context.queryClient.fetchQuery({
      queryKey: ["branches"],
      queryFn: () => apiGet<Branch>({ url: "/branches" }),
      staleTime: 10000,
    })

  },
  gcTime: 0, // when route match, it allowes program to always enter to loader function
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
        info={"failureDialog.info.loader"}
        message={error.message}
      />
    );
  } 
})



const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/users", label: "registration.user" }
];


const ChildForm = memo(createChildForm(userFormOpts));



function RouteComponent() {
  const [key, setKey] = useState(0);
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { data, error, isSuccess, isPending, isError } = useQuery({ 
    queryKey: ["branches"], 
    queryFn: () => apiGet<Branch>({ url: "/branches" }), 
    retry: 0, 
    refetchInterval: 10000 
  });
  const {t} = useTranslationContext();
  
  console.log(Object.keys(userFormOpts.defaultValues.userData))


  return (
    <Box sx={{ flex: 1, overflow: "hidden" }}>
      {
        (isSuccess || data) &&
        <FormPaperContainer sx={{ height: "100%", boxSizing: "border-box", overflow: "auto" }}>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          <FormPaper square elevation={5} sx={{ boxSizing: "border-box", overflow: "auto" }}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('registration.user')}</Typography>
            <Form 
              key={key} 
              reset={() => {
                setKey(prev => prev + 1)
              }} 
              requestFn={(value) => apiPost("/users", value)}
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

      
      { isPending && <Loader open={true} /> }
      
      { 
        (isError && error) && 
        <FailureDialog 
          open={true} 
          closeFn={() => {
            goBack(router, canGoBack, "/manage");
          }}
          duration={null}
          info={"failureDialog.info.data"}
          message={error.message}
        />
      }
    </Box>
  );
}