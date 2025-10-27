import { createFileRoute, useCanGoBack, useRouter } from "@tanstack/react-router";
import Typography from "@mui/material/Typography";
import CustomBreadcrumbs from "./-components/CustomBreadcrumbs";
import { FormPaperContainer, FormPaper } from "./-components/FormPaper";
import Form from "./-forms/Form";
import { memo, useState } from "react";
import { itemFormOpts } from "./-forms/item-form/itemForm-options";
import { createChildForm } from "./-forms/createChildForm";
import { itemFormConfig } from "./-forms/item-form/itemForm-config";
import { itemFormSchema } from "./-forms/item-form/itemForm-schema";
import type { ExtendedLinkOptions } from "@/types/ExtendedLinkOptions";
import { useTranslationContext } from "@/providers/TranslationContext";
import { addItem } from "@/api/items/addItem";
import { getSubcategories } from "@/api/subcategories/getSubcategories";
import { Loader } from "@/routes/-components/Loader";
import { FailureDialog } from "./-components/FailureDialog";
import { goBack } from "./-forms/goBack";
import { useQuery } from "@tanstack/react-query";



export const Route = createFileRoute('/_app/register/item')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.fetchQuery({
      queryKey: ["subcategories"],
      queryFn: getSubcategories,
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
          goBack(router, canGoBack, "/register");
        }}
        duration={null}
        message={error.message}
      />
    );
  }
});



const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/register", label: "menu.registration" },
  { to: "/register/item", label: "registration.item" },
];


const ChildForm = memo(createChildForm(itemFormOpts));



function RouteComponent() {
  const [key, setKey] = useState(0);
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const {t} = useTranslationContext();
  const { data, error, isSuccess, isPending, isError } = useQuery({ queryKey: ["subcategories"], queryFn: getSubcategories, retry: 0, refetchInterval: 10000 });
  

  return (
    <>
      {
        (isSuccess || data) &&
        <FormPaperContainer>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t("registration.item")}</Typography>
              <Form 
                key={key} 
                reset={() => {
                  setKey(prev => prev + 1)
                }} 
                requestFn={addItem}
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
        isPending &&
        <Loader open={true} />
      }

      {
        (isError || error) &&
          <FailureDialog 
            open={true} 
            closeFn={() => {
              goBack(router, canGoBack, "/register");
            }} 
            duration={null} 
            message={
              error ? error.message : ""
            } 
          />
      }
    </>
  );
}