import { Box } from "@mui/material";
import { useAppForm } from "@/global-form/hooks/form";
import { SubmitButton } from "../../../../global-form/SubmitButton";
import { SuccessDialog } from "../-components/general/SuccessDialog";
import { FailureDialog } from "../-components/general/FailureDialog";
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import * as z from "zod"
import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";
import { Loader } from "@/routes/-components/Loader";
import { ConditionalRenderProvider } from "@/routes/_app/manage/-forms/context-api/ConditionalRenderProvider";
import { ConditionalRender } from "../-components/general/ConditionalRender";

type FormProps = {
  reset: () => void;
  initialFieldsValuesMap?: any;
  requestFn: (value: Record<string, unknown>) => Promise<void>;
  onSubmit?: () => Promise<void>; 
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
  initialFieldsValuesMap,
  requestFn, 
  onSubmit, 
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
    },
    onError: (error) => {
      setShowError(() => true);
      setErrorMessage(() => error.message);
    }
  });
    
  const form = useAppForm({
    ...formOptions,
    onSubmit: async ({ value }) => {
      try {
        const modifiedValue = await validationSchema.parseAsync(value);
        await mutation.mutateAsync(modifiedValue);
        if (onSubmit)
          await onSubmit();
      } catch (error) {
        if (error instanceof z.ZodError) {
          setShowError(() => true);
          setErrorMessage(() => error.message);
        }
      }
    }
  });


  useEffect(() => {
    if (initialFieldsValuesMap) {
      Object.keys(initialFieldsValuesMap).forEach((fieldName) => {
        form.setFieldValue(fieldName, initialFieldsValuesMap[fieldName]);
      });
      console.log("Form values", form.store.state.values)
    }
  }, [initialFieldsValuesMap]);

  console.log("Meta:", form.baseStore.state.values)

  const renderingComponentsIdMap = childFormsProps.reduce<Record<string, boolean>>(
    (accumulator, prop) => {
      accumulator[prop.title] = prop.render ?? true;

      return accumulator;
    },
    {}
  );

  console.log("Main form", form);

  return(
    <Box>
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
          form.reset();
        }}
        duration={2000}
        info={"successDialog.info.submit"}
      />

      <FailureDialog 
        open={showError} 
        closeFn={() => setShowError(() => false)}
        duration={null}
        info={"failureDialog.info.submit"}
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
    </Box>
  );
}