import { createFileRoute, useCanGoBack, useRouter } from "@tanstack/react-router";
import Typography from "@mui/material/Typography";
import { clientFormConfig } from "./-forms/client-form/clientForm-config";
import CustomBreadcrumbs from "./-components/CustomBreadcrumbs";
import { FormPaperContainer, FormPaper } from "./-components/FormPaper";
import { memo, useState } from "react";
import Form from "./-forms/Form";
import { clientFormOpts } from "./-forms/client-form/clientForm-options";
import { schema } from "./-forms/client-form/clientForm-schema";
import { createChildForm } from "./-forms/createChildForm";
import { useTranslationContext } from "@/providers/TranslationContext";
import type { ExtendedLinkOptions } from "@/types/ExtendedLinkOptions";
import { useQuery } from "@tanstack/react-query";
import { FailureDialog } from "./-components/FailureDialog";
import { Loader } from "@/routes/-components/Loader";
import { getActiveCards } from "../../../api/cards/getActiveCards";
import { addClient } from "../../../api/clients/addClient";
import { goBack } from "./-forms/goBack";



export const Route = createFileRoute('/_app/register/client')({
  component: RouteComponent,
  loader: async ({ context, route }) => {
    
    // console.log("I'm in loader", "query:", context.queryClient.getQueryCache().find({queryKey: ["activeCards"]}), "router:", route);

    const x = await context.queryClient.fetchQuery({
      queryKey: ["activeCards"],
      queryFn: getActiveCards,
      staleTime: 10000,
    })

    console.log("x", x)
    // console.log("I'm in loader 2", "query:", context.queryClient.getQueryCache().find({queryKey: ["activeCards"]}), "route:", route);

    return x;
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
          goBack(router, canGoBack, "/register");
        }}
        duration={null}
        message={error.message}
      />
    );
  }
})



const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/register", label: "menu.registration" },
  { to: "/register/client", label: "registration.client" }
]

const ChildForm = memo(createChildForm(clientFormOpts));



function RouteComponent() {
  const [key, setKey] = useState(0);
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { data, error, isSuccess, isPending, isError } = useQuery({ queryKey: ["activeCards"], queryFn: getActiveCards, retry: 0, refetchInterval: 10000 });
  const {t} = useTranslationContext();
  
  console.log("rpi", data)

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
              requestFn={addClient}
              formOptions={clientFormOpts}
              validationSchema={schema}
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
            goBack(router, canGoBack, "/register");
          }} 
          duration={null} 
          message={error.message} 
        />
      }
    </>
  );
}
