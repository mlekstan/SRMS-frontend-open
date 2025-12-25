import { apiGet } from '@/api/apiGet';
import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { Loader } from '@/routes/-components/Loader';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { memo, useState } from 'react';
import { createChildForm } from '../../../-forms/createChildForm';
import { clientFormOpts } from '../../(clients)/-form/clientForm-options';
import { useQuery } from '@tanstack/react-query';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { Typography } from '@mui/material';
import Form from '../../../-forms/Form';
import { apiPost } from '@/api/apiPost';
import { itemFormOpts } from '../-form/itemForm-options';
import { itemFormSchema } from '../-form/itemForm-schema';
import { itemFormConfig } from '../-form/itemForm-config';
import type { Branch, Subcategory } from '@/api/types';

export const Route = createFileRoute('/_app/manage/_layout/(items)/items/create')({
  component: RouteComponent,
  loader: async ({ context }) => {

    await context.queryClient.fetchQuery({
      queryKey: ["subcategories"],
      queryFn: () => apiGet<Subcategory>({ url: "/subcategories" }),
      staleTime: 10000,
    });

    await context.queryClient.fetchQuery({
      queryKey: ["branches"],
      queryFn: () => apiGet<Branch>({ url: "/branches" }),
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
  { to: "/manage/items/create", label: "registration.item" }
]

const ChildForm = memo(createChildForm(clientFormOpts));



function RouteComponent() {
  const [key, setKey] = useState(0);
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const {t} = useTranslationContext();

  const { 
    data: sData, 
    error: sError, 
    isSuccess: sIsSuccess, 
    isPending: sIsPending, 
    isError: sIsError 
  } = useQuery({ queryKey: ["subcategories"], queryFn: () => apiGet<Subcategory>({ url: "/subcategories" }), retry: 0, refetchInterval: 10000 });
  
  const {
    data: bData,
    error: bError,
    isSuccess: bIsSuccess,
    isPending: bIsPending,
    isError: bIsError
  } = useQuery({ queryKey: ["branches"], queryFn: () => apiGet<Branch>({ url: "/branches" }), retry: 0, refetchInterval: 10000 });

  console.log("Subcategories:", sData);

  return (
    <>
      {
        ((sIsSuccess && bIsSuccess) || (sData && bData)) &&
        <FormPaperContainer>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('registration.item')}</Typography>
            <Form 
              key={key} 
              reset={() => {
                setKey(prev => prev + 1)
              }} 
              requestFn={(value) => apiPost("/items", value)}
              formOptions={itemFormOpts}
              validationSchema={itemFormSchema}
              childFormComponent={ChildForm}
              childFormsProps={[
                {
                  title: "registration.item.form.base.title", formConfig: itemFormConfig.basicFieldsConfig
                },
                {
                  title: "registration.item.form.sale.title", formConfig: itemFormConfig.saleFieldsConfig
                }
              ]}
            />
          </FormPaper>
        </FormPaperContainer>       
      }

      
      {
        (sIsPending || bIsPending) &&
        <Loader open={true} />
      }
      
      {
        (sIsError || bIsError) &&
        <FailureDialog 
          open={true} 
          closeFn={() => {
            goBack(router, canGoBack, "/manage");
          }} 
          duration={null} 
          message={
            (sError && bError) ? `${sError.message}. ${bError.message}.` : sError?.message ?? bError?.message ?? ""
          }
          info="failureDialog.info.data"
        />
      }
    </>
  );
}