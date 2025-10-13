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


export async function getActiveCards() {
  try {
    
    const response = await fetch(
      "https://localhost:3000/cards?" + new URLSearchParams({
        active: "true"
      }).toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(`${response.status}. ${response.statusText}. ${message}.`);
    }

    const result = await response.json();
    console.log("Fetch", result)
    return result;

  } catch(error) {
    throw error;
  }
}


function goBack(router: ReturnType<typeof useRouter>, canGoBack: ReturnType<typeof useCanGoBack>) {
  if (canGoBack) {
    router.history.back();
  } else {
    router.navigate({to: "/register"});
  }
}


export const Route = createFileRoute('/_app/register/client')({
  component: RouteComponent,
  loader: async ({ context, route }) => {
    
    console.log("I'm in loader", "query:", context.queryClient.getQueryCache().find({queryKey: ["cards"]}), "router:", route);

    const x = await context.queryClient.fetchQuery({
      queryKey: ["cards"],
      queryFn: getActiveCards,
      staleTime: 10000,
    })

    console.log("x", x)
    console.log("I'm in loader 2", "query:", context.queryClient.getQueryCache().find({queryKey: ["cards"]}), "route:", route);

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
          goBack(router, canGoBack);
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


const addClient = async (value: Record<string, Record<string, any>>) => {
  try {
    const response = await fetch("https://localhost:3000/clients/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value),
    });

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Success:", result);

  } catch (error) {
    throw error;
  }
}



const ChildForm = memo(createChildForm(clientFormOpts));

function RouteComponent() {
  const [key, setKey] = useState(0);
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const { data, error, isSuccess, isPending, isError } = useQuery({ queryKey: ["cards"], queryFn: getActiveCards, retry: 0, refetchInterval: 10000 });
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

      
      { isPending && <Loader open={true} />}
      
      { 
        (isError && error) && 
        <FailureDialog 
          open={true} 
          closeFn={() => {
            goBack(router, canGoBack);
          }} 
          duration={null} 
          message={error.message} />
      }
    </>
  );
}
