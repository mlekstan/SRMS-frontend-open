import { Box } from "@mui/material";
import { useAppForm } from "./hooks/form";
import { SubmitButton } from "../-components/SubmitButton";
import { SuccessDialog } from "../-components/SuccessDialog";
import { FailureDialog } from "../-components/FailureDialog";
import { useMutation } from "@tanstack/react-query"
import { useState } from "react";
import * as z from "zod"
import type { LangKeys } from "@/providers/TranslationProvider";
import { Loader } from "@/routes/-components/Loader";
import { ConditionalRenderProvider } from "@/providers/ConditionalRenderProvider";
import { ConditionalRender } from "../-components/ConditionalRender";

type FormProps = {
  reset: () => void;
  requestFn: (value: Record<string, unknown>) => Promise<void>;
  formOptions: any;
  validationSchema: z.ZodObject;
  childFormComponent: any;
  childFormsProps: {
    title: LangKeys,
    formConfig: object,
    render?: boolean
  }[]
}

export default function Form({
  reset, 
  requestFn, 
  formOptions, 
  validationSchema, 
  childFormComponent: ChildForm, 
  childFormsProps 
}: FormProps) {
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const mutation = useMutation({
    mutationFn: async (value: Record<string, unknown>) => await requestFn(value),
    onSuccess: () => {
      setShowSuccess(() => true);
      //form.reset();
    },
    onError: (error) => {
      setShowError(() => true);
      setErrorMessage(() => error.message);
    }
  })
    
  const form = useAppForm({
    ...formOptions,
    onSubmit: async ({ value }) => {
      try {
        const modifiedValue = validationSchema.parse(value);
        await mutation.mutateAsync(modifiedValue);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setShowError(() => true);
          setErrorMessage(() => error.message);
        }
      }
    }
  })

  const renderingComponentsIdMap = childFormsProps.reduce<Record<string, boolean>>(
    (accumulator, prop) => {
      accumulator[prop.title] = prop.render ?? true;

      return accumulator;
    },
    {}
  );

  console.log("Main form", form);

  return(
    <>
      <form.Subscribe selector={(state) => state.isSubmitting}>
        {
          (isSubmitting) => {
            return (
              <Loader open={isSubmitting} />
            )
          }
        }
      </form.Subscribe>

      
      <SuccessDialog 
        open={showSuccess}
        closeFn={() => {
          setShowSuccess(() => false);
          reset();
        }
        }
        duration={2000}
      />

      <FailureDialog 
        open={showError} 
        closeFn={() => setShowError(() => false)}
        duration={null}
        message={errorMessage}
      />
      
      <ConditionalRenderProvider renderingComponentsIdMap={renderingComponentsIdMap}>
        <form.AppForm>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >

            {
              childFormsProps.map((props, idx) => {
                return (
                  <ConditionalRender key={idx} renderedComponentId={props.title} >
                    <ChildForm key={idx} form={form} title={props.title} formConfig={props.formConfig} />  
                  </ConditionalRender>            
                );
              })
            }

            <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: 4}}>
              <SubmitButton />
            </Box> 
          </form>      
        </form.AppForm>
      </ConditionalRenderProvider>
    </>
  );
}

