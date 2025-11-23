import { apiGet } from '@/api/apiGet';
import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { FailureDialog } from '../../-components/FailureDialog';
import { goBack } from '../../-forms/goBack';
import { Loader } from '@/routes/-components/Loader';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { memo, useState } from 'react';
import { createChildForm } from '../../-forms/createChildForm';
import { clientFormOpts } from '../../-forms/client-form/clientForm-options';
import { useQuery } from '@tanstack/react-query';
import { useTranslationContext } from '@/providers/TranslationContext';
import { FormPaper, FormPaperContainer } from '../../-components/FormPaper';
import CustomBreadcrumbs from '../../-components/CustomBreadcrumbs';
import { Typography } from '@mui/material';
import Form from '../../-forms/Form';
import { apiPost } from '@/api/apiPost';
import { clientFormSchema } from '../../-forms/client-form/clientForm-schema';
import { clientFormConfig } from '../../-forms/client-form/clientForm-config';
import type { Card } from '@/api/types';

export const Route = createFileRoute('/_app/manage/_layout/clients/create')({
  component: RouteComponent,
  loader: async ({ context, route }) => {

    await context.queryClient.fetchQuery({
      queryKey: ["activeCards"],
      queryFn: () => apiGet<Card>({ url: "/cards", searchParams: { active: "true" }}),
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
        info={"failureDialog.info.loader"}
        message={error.message}
      />
    );
  }
});


const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/clients/create", label: "registration.client" }
]

const ChildForm = memo(createChildForm(clientFormOpts));



function RouteComponent() {
  const [key, setKey] = useState(0);
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { data, error, isSuccess, isPending, isError } = useQuery({ 
    queryKey: ["activeCards"], 
    queryFn: () => apiGet<Card>({ url: "/cards", searchParams: { active: "true" }}), 
    retry: 0, 
    refetchInterval: 10000 
  });
  const {t} = useTranslationContext();

  return (
    <>
      {
        (isSuccess || data) &&
        <FormPaperContainer>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t("registration.client")}</Typography>
            <Form 
              key={key} 
              reset={() => {
                setKey(prev => prev + 1)
              }} 
              requestFn={(value) => apiPost("/clients", value)}
              formOptions={clientFormOpts}
              validationSchema={clientFormSchema}
              childFormComponent={ChildForm}
              childFormsProps={[
                {
                  title: "registration.client.form.card.title", formConfig: clientFormConfig.cardFieldsConfig
                },
                {
                  title: "registration.client.form.personal.title", formConfig: clientFormConfig.personalFieldsConfig
                },
                {
                  title: "registration.client.form.residence.title", formConfig: clientFormConfig.residenceFieldsConfig
                },
                {
                  title: "registration.client.form.contact.title", formConfig: clientFormConfig.contactFieldsConfig
                }
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
    </>
  );
}