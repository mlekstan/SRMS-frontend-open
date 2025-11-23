import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { FormPaper, FormPaperContainer } from '../../../-components/FormPaper';
import CustomBreadcrumbs from '../../../-components/CustomBreadcrumbs';
import { Typography } from '@mui/material';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { useTranslationContext } from '@/providers/TranslationContext';
import { apiGet } from '@/api/apiGet';
import { useQuery } from '@tanstack/react-query';
import type { Branch, Item, Subcategory } from '@/api/types';
import Form from '../../../-forms/Form';
import { memo, useState } from 'react';
import { createChildForm } from '../../../-forms/createChildForm';
import type { Leaves } from '@/types/Leaves';
import { apiPut } from '@/api/apiPut';
import { Loader } from '@/routes/-components/Loader';
import { FailureDialog } from '../../../-components/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { itemFormOpts } from '../../../-forms/item-form/itemForm-options';
import { itemFormSchema } from '../../../-forms/item-form/itemForm-schema';
import { itemFormConfig } from '../../../-forms/item-form/itemForm-config';


type FormFields = Leaves<typeof itemFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, any>;


const formatErrorMsg = (errors: Array<Error | null>): string => {
  let message = "";
  errors.forEach(error => {
    if (error) {
      message += `${error.message}. `;
    }
  });

  return message;
}

export const Route = createFileRoute(
  '/_app/manage/_layout/(items)/items/view/$itemId',
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {

    await context.queryClient.fetchQuery({
      queryKey: ["item", params.itemId],
      queryFn: () => apiGet<Item>({ url: "/items", id: params.itemId }),
      staleTime: 10000,
    });

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
          goBack(router, canGoBack, "/manage/items/view");
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
  { to: "/manage/items/create", label: "registration.item" },
  { to: "/manage/items/view", label: "view.items" },
  { to: "/manage/items/view/$itemId", label: "edit.item" }
];

const ChildForm = memo(createChildForm(itemFormOpts));


function RouteComponent() {
  const [key, setKey] = useState(0);
  const { t } = useTranslationContext();
  const params = Route.useParams();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  
  const itemQuery = useQuery({ 
    queryKey: ["item", params.itemId], 
    queryFn: () => apiGet<Item>({ url: "/items", id: params.itemId }),
    retry: 0,
    refetchInterval: 10000,
  });

  const subcategoriesQuery = useQuery({
    queryKey: ["subcategories"],
    queryFn: () => apiGet<Subcategory>({ url: "/subcategories" }),
    retry: 0,
    refetchInterval: 10000,
  });

  const branchesQuery = useQuery({
    queryKey: ["branches"],
    queryFn: () => apiGet<Branch>({ url: "/branches" }),
    retry: 0,
    refetchInterval: 10000,
  });



  let initialFiledsValueMap: Partial<FieldsValuesMap> | undefined;
  if (itemQuery.data) {
    initialFiledsValueMap = {
      "basicData.barcode": itemQuery.data.barcode,
      "basicData.subcategoryId": itemQuery.data.subcategory.id,
      "basicData.branchId": itemQuery.data.branch.id,
      "basicData.name": itemQuery.data.name,
      "basicData.shortName": itemQuery.data.shortName,
      "basicData.marketValue": itemQuery.data.marketValue,
      "saleData.forSale": itemQuery.data.forSale,
      "saleData.sellPrice": itemQuery.data.sellPrice,
    };
  }


  return (
    <>
      {
        (
          (itemQuery.isSuccess && subcategoriesQuery.isSuccess && branchesQuery.isSuccess) ||
          (itemQuery.data && subcategoriesQuery.data && branchesQuery.data)
        ) &&

        <FormPaperContainer>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('edit.item')}</Typography>
            <Form 
              key={key}
              initialFieldsValuesMap={initialFiledsValueMap}
              reset={() => {
                setKey(prev => prev + 1);
              }} 
              requestFn={(value) => apiPut("/items", params.itemId, value)}
              formOptions={itemFormOpts}
              validationSchema={itemFormSchema}
              childFormComponent={ChildForm}
              childFormsProps={[
                {
                  title: "registration.client.form.card.title", formConfig: itemFormConfig.basicFieldsConfig
                },
                {
                  title: "registration.client.form.personal.title", formConfig: itemFormConfig.saleFieldsConfig
                },
              ]}
            />
          </FormPaper>
        </FormPaperContainer>
      }

      { 
        (itemQuery.isPending || subcategoriesQuery.isPending || branchesQuery.isPending) &&
        <Loader open={true} /> 
      }
      
      { 
        (itemQuery.isError || subcategoriesQuery.isError || branchesQuery.isError) && 
        <FailureDialog
          open={true} 
          closeFn={() => {
            goBack(router, canGoBack, "/manage/clients/view");
          }} 
          duration={null}
          info={"failureDialog.info.data"}
          message={
            formatErrorMsg([
              itemQuery.error,
              subcategoriesQuery.error,
              branchesQuery.error,
            ])
          }
        />
      }
    </>
  );
}
