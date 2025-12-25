import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { Typography } from '@mui/material';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import { apiGet } from '@/api/apiGet';
import { useQuery } from '@tanstack/react-query';
import type { Card, Client } from '@/api/types';
import Form from '../../../-forms/Form';
import { memo, useState } from 'react';
import { editClientFormOpts } from './-form/editClientForm-options';
import { createChildForm } from '../../../-forms/createChildForm';
import { editClientFormConfig } from './-form/editClientForm-config';
import type { Leaves } from '@/types/Leaves';
import { apiPut } from '@/api/apiPut';
import { editClientFormSchema } from './-form/editClientForm-schema';
import { Loader } from '@/routes/-components/Loader';
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';


type FormFields = Leaves<typeof editClientFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, any>;

export const Route = createFileRoute(
  '/_app/manage/_layout/(clients)/clients/view/$clientId',
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {

    await context.queryClient.fetchQuery({
      queryKey: ["client", params.clientId],
      queryFn: () => apiGet<Client>({ url: "/clients", id: params.clientId }),
      staleTime: 10000,
    });

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
  
  const clientQuery = useQuery({ 
    queryKey: ["client", params.clientId], 
    queryFn: () => apiGet<Client>({ url: "/clients", id: params.clientId }),
    retry: 0,
    refetchInterval: 10000,
  });

  const activeCardsQuery = useQuery({
    queryKey: ["activeCards"],
    queryFn: () => apiGet<Card>({ url: "/cards", searchParams: { active: "true" } }),
    retry: 0,
    refetchInterval: 10000,
  });

  let initialFiledsValueMap: Partial<FieldsValuesMap> | undefined;
  if (clientQuery.data) {
    initialFiledsValueMap = {
      "personalData.firstName": clientQuery.data.firstName,
      "personalData.middleName": clientQuery.data.middleName,
      "personalData.lastName": clientQuery.data.lastName,
      "personalData.identityCardNumber": clientQuery.data.identityCardNumber,
      "residenceData.country": clientQuery.data.country,
      "residenceData.city": clientQuery.data.city,
      "residenceData.street": clientQuery.data.street,
      "residenceData.streetNumber": clientQuery.data.streetNumber,
      "residenceData.flatNumber": clientQuery.data.flatNumber,
      "residenceData.zipCode": clientQuery.data.zipCode,
      "contactData.areaCode": clientQuery.data.areaCode,
      "contactData.phoneNumber": clientQuery.data.phoneNumber,
      "contactData.email": clientQuery.data.email,
    }
  }


  return (
    <>
      {
        (
          (clientQuery.isSuccess && activeCardsQuery.isSuccess) ||
          (clientQuery.data && activeCardsQuery.data)
        ) &&

        <FormPaperContainer>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('edit.client')}</Typography>
            <Form 
              key={key}
              initialFieldsValuesMap={initialFiledsValueMap}
              reset={() => {
                setKey(prev => prev + 1)
              }} 
              requestFn={(value) => apiPut("/clients", params.clientId, value)}
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
    </>
  );
}