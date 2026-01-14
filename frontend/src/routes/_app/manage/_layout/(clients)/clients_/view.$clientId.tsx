import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { Box, Typography } from '@mui/material';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import { apiGet } from '@/api/apiGet';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Card, Client } from '@/api/types';
import Form from '../../../-forms/Form';
import { memo, useState } from 'react';
import { editClientFormOpts } from './-form/editClientForm-options';
import { createChildForm } from '../../../-forms/createChildForm';
import { editClientFormConfig } from './-form/editClientForm-config';
import { apiPut } from '@/api/apiPut';
import { editClientFormSchema } from './-form/editClientForm-schema';
import { Loader } from '@/routes/-components/Loader';
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { transformData } from './-form/transformData';


export const Route = createFileRoute(
  '/_app/manage/_layout/(clients)/clients/view/$clientId',
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.fetchQuery({
      queryKey: ["client", params.clientId],
      queryFn: () => apiGet<Client>({ url: "/clients", id: params.clientId }),
    });

    await context.queryClient.fetchQuery({
      queryKey: ["cards", { issued: false }],
      queryFn: () => apiGet<Card>({ url: "/cards", searchParams: { issued: "false" }}),
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
          goBack(router, canGoBack, "/manage/clients/view");
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
  { to: "/manage/clients/create", label: "registration.client" },
  { to: "/manage/clients/view", label: "view.clients" },
  { to: "/manage/clients/view/$clientId", label: "edit.client" }
];

const ChildForm = memo(createChildForm(editClientFormOpts));


function RouteComponent() {
  const [key, setKey] = useState(0);
  const { t } = useTranslationContext();
  const params = Route.useParams();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const queryClient = useQueryClient();
  
  const clientQuery = useQuery({ 
    queryKey: ["client", params.clientId], 
    queryFn: () => apiGet<Client>({ url: "/clients", id: params.clientId }), 
    staleTime: 10 * 1000, 
    select: data => transformData(data)
  });

  const activeCardsQuery = useQuery({
    queryKey: ["cards", { issued: false }],
    queryFn: () => apiGet<Card>({ url: "/cards", searchParams: { issued: "false" } }), 
    staleTime: 10 * 1000
  });


  return (
    <Box sx={{ height: "100%" }}>
      {
        (
          (clientQuery.isSuccess && activeCardsQuery.isSuccess) ||
          (clientQuery.data && activeCardsQuery.data)
        ) &&

        <FormPaperContainer sx={{ boxSizing: "border-box", height: "100%", overflow: "auto" }}>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('edit.client')}</Typography>
            <Form 
              key={key}
              initialFieldsValuesMap={clientQuery.data}
              reset={() => {
                setKey(prev => prev + 1)
              }} 
              requestFn={(value) => apiPut("/clients", params.clientId, value)} 
              onSubmit={() => queryClient.invalidateQueries({ queryKey: ["client", params.clientId], exact: true })}
              formOptions={editClientFormOpts}
              validationSchema={editClientFormSchema}
              childFormComponent={ChildForm}
              childFormsProps={[
                {
                  title: "registration.client.form.card.title", formConfig: editClientFormConfig.cardFieldsConfig
                },
                {
                  title: "registration.client.form.personal.title", formConfig: editClientFormConfig.personalFieldsConfig
                },
                {
                  title: "registration.client.form.residence.title", formConfig: editClientFormConfig.residenceFieldsConfig
                },
                {
                  title: "registration.client.form.contact.title", formConfig: editClientFormConfig.contactFieldsConfig
                }
              ]}
            />
          </FormPaper>
        </FormPaperContainer>
      }

      { 
        (clientQuery.isPending || activeCardsQuery.isPending) &&
        <Loader open={true} /> 
      }
      
      { 
        (clientQuery.isError || activeCardsQuery.isError) && 
        <FailureDialog
          open={true} 
          closeFn={() => {
            goBack(router, canGoBack, "/manage/clients/view");
          }} 
          duration={null}
          info={"failureDialog.info.data"}
          message={
            (clientQuery.error && activeCardsQuery.error) ? 
            `${clientQuery.error.message}. ${activeCardsQuery.error.message}.` :
            clientQuery.error?.message ??
            activeCardsQuery.error?.message ??
            ""
          }
        />
      }
    </Box>
  );
}