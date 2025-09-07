import { Backdrop, Box, Button, CircularProgress, Dialog, DialogTitle } from "@mui/material";
import { clientFormOpts } from "./clientForm-options";
import { useAppForm } from "../hooks/form";
import { clientFormConfig } from "./clientForm-config";
import { createChildForm } from "../createChildForm";
import { SubmitButton } from "../../-components/SubmitButton";
import { SuccessDialog } from "../../-components/SuccessDialog";
import { FailureDialog } from "../../-components/FailureDialog";
import { useMutation } from "@tanstack/react-query"
import { memo, useState } from "react";
import * as z from "zod"
import { schema } from "./clientForm-schema";


const ChildForm = memo(createChildForm(clientFormOpts));


export default function ClientForm() {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const mutation = useMutation({
    mutationFn: async (value: Record<string, Record<string, any>>) => {

      try {
        const response = await fetch("http://localhost:3000/clients/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(value),
        });

        if (!response.ok) {
          throw Error(`${response.status}. ${response.statusText}`)
        }
        
        const result = await response.json();
        console.log("Success:", result);
        
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      setShowSuccess(() => true);
      form.reset();
    },
    onError: (error) => {
      setShowError(() => true);
      setErrorMessage(() => error.message);
    }
  })
    
  const form = useAppForm({
    ...clientFormOpts,
    onSubmit: async ({ value }) => {
      try {
        const modifiedValue = schema.parse(value);
        await mutation.mutateAsync(modifiedValue);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setShowError(() => true);
          setErrorMessage(() => error.message);
        }
      }
    }
  })

  console.log("Main form");

  return(
    <>
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {
          (isSubmitting) => {
            return (
              <Backdrop
                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} 
                open={isSubmitting} 
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )
          }    
        }
      </form.Subscribe>

      
      <SuccessDialog 
        open={showSuccess}
        closeFn={() => setShowSuccess(() => false)}
        duration={2000}
      />

      <FailureDialog 
        open={showError} 
        closeFn={() => setShowError(() => false)}
        duration={null}
        message={errorMessage}
      />
      

      <form.AppForm>
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <ChildForm form={form} title="Client card data" formConfig={clientFormConfig.cardFieldsConfig} />
          <ChildForm form={form} title="Personal data" formConfig={clientFormConfig.personalFieldsConfig} />
          <ChildForm form={form} title="Residence data" formConfig={clientFormConfig.residenceFieldsConfig} />
          <ChildForm form={form} title="Contact data" formConfig={clientFormConfig.contactFieldsConfig} />
          <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: 4}}>
            <SubmitButton />
          </Box> 
        </form>      
      </form.AppForm>
    </>
  );
}