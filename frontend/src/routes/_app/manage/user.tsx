import { getBranches } from '@/api/branches/branches.get';
import { Loader } from '@/routes/-components/Loader';
import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { FailureDialog } from './-components/FailureDialog';
import { goBack } from './-forms/goBack';
import { userFormOpts } from './-forms/user-form/userForm-options';
import { memo, useState } from 'react';
import { createChildForm } from './-forms/createChildForm';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { useQuery } from '@tanstack/react-query';
import { useTranslationContext } from '@/providers/TranslationContext';
import { FormPaper, FormPaperContainer } from './-components/FormPaper';
import CustomBreadcrumbs from './-components/CustomBreadcrumbs';
import { Typography } from '@mui/material';
import Form from './-forms/Form';
import { userFormSchema } from './-forms/user-form/userForm-schema';
import { userFormConfig } from './-forms/user-form/userForm-config';
import { addUser } from '@/api/users/users.post';


export const Route = createFileRoute('/_app/manage/user')({
  component: RouteComponent,
  loader: async ({ context, route }) => {
    
    await context.queryClient.fetchQuery({
      queryKey: ["branches"],
      queryFn: getBranches,
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
        message={error.message}
      />
    );
  }
});



const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/user", label: "registration.user" }
];


const ChildForm = memo(createChildForm(userFormOpts));



function RouteComponent() {
  const [key, setKey] = useState(0);
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { data, error, isSuccess, isPending, isError } = useQuery({ queryKey: ["branches"], queryFn: getBranches, retry: 0, refetchInterval: 10000 });
  const {t} = useTranslationContext();
  

  return (
    <>
      {
        (isSuccess || data) &&
        <FormPaperContainer>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('registration.user')}</Typography>
            <Form 
              key={key} 
              reset={() => {
                setKey(prev => prev + 1)
              }} 
              requestFn={addUser}
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
          message={error.message}
        />
      }
    </>
  );
}