import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { FormPaper, FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { Box, Typography } from '@mui/material';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import { apiGet } from '@/api/apiGet';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Branch, Item, Subcategory } from '@/api/types';
import Form from '../../../-forms/Form';
import { memo, useState } from 'react';
import { createChildForm } from '../../../-forms/createChildForm';
import { apiPut } from '@/api/apiPut';
import { Loader } from '@/routes/-components/Loader';
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { itemFormOpts } from '../-form/itemForm-options';
import { itemFormSchema } from '../-form/itemForm-schema';
import { itemFormConfig } from '../-form/itemForm-config';
import { transformData } from '../-form/transformData';


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
    });

    await context.queryClient.fetchQuery({
      queryKey: ["subcategories"],
      queryFn: () => apiGet<Subcategory>({ url: "/subcategories" }),
    });

    await context.queryClient.fetchQuery({
      queryKey: ["branches"],
      queryFn: () => apiGet<Branch>({ url: "/branches" }),
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
  const queryClient = useQueryClient();
  
  const itemQuery = useQuery({ 
    queryKey: ["item", params.itemId], 
    queryFn: () => apiGet<Item>({ url: "/items", id: params.itemId }), 
    staleTime: 10 * 1000, 
    select: data => transformData(data)
  });

  const subcategoriesQuery = useQuery({
    queryKey: ["subcategories"],
    queryFn: () => apiGet<Subcategory>({ url: "/subcategories" }), 
    staleTime: 10 * 1000
  });

  const branchesQuery = useQuery({
    queryKey: ["branches"],
    queryFn: () => apiGet<Branch>({ url: "/branches" }), 
    staleTime: 10 * 1000
  });


  return (
    <Box sx={{ height: "100%" }}>
      {
        (
          (itemQuery.isSuccess && subcategoriesQuery.isSuccess && branchesQuery.isSuccess) ||
          (itemQuery.data && subcategoriesQuery.data && branchesQuery.data)
        ) &&

        <FormPaperContainer sx={{ boxSizing: "border-box", height: "100%", overflow: "auto" }}>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('edit.item')}</Typography>
            <Form 
              key={key}
              initialFieldsValuesMap={itemQuery.data}
              reset={() => {
                setKey(prev => prev + 1);
              }} 
              requestFn={(value) => apiPut("/items", params.itemId, value)}
              onSubmit={() => queryClient.invalidateQueries({ queryKey: ["item", params.itemId], exact: true })}
              formOptions={itemFormOpts}
              validationSchema={itemFormSchema}
              childFormComponent={ChildForm}
              childFormsProps={[
                {
                  title: "registration.item.form.base.title", formConfig: itemFormConfig.basicFieldsConfig
                },
                {
                  title: "registration.item.form.sale.title", formConfig: itemFormConfig.saleFieldsConfig
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
    </Box>
  );
}