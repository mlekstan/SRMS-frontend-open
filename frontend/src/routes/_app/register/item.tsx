import { createFileRoute, linkOptions } from "@tanstack/react-router";
import Typography from "@mui/material/Typography";
import ItemForm from "./-forms/item-form/ItemForm";
import CustomBreadcrumbs from "./-components/CustomBreadcrumbs";
import { FormPaperContainer, FormPaper } from "./-components/FormPaper";
import Form from "./-forms/Form";
import { memo, useState } from "react";
import { itemFormOpts } from "./-forms/item-form/itemForm-options";
import { createChildForm } from "./-forms/createChildForm";
import { itemFormConfig } from "./-forms/item-form/itemForm-config";
import { itemFormSchema } from "./-forms/item-form/itemForm-schema";



export const Route = createFileRoute('/_app/register/item')({
  component: RouteComponent,
})


const breadcrumbsOptions = linkOptions([
  {to: '/register', label: "Registration", icon: ''},
  {to: '/register/item', label: "Register item", icon: ''},
]);

const addItem = async (value) => {
  try {
    const response = await fetch("http://localhost:3000/items/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(value)
    })

    if (!response.ok) {
      throw new Error(`${response.status}. ${response.statusText}`)
    }
  } catch (error) {
    throw error;
  }
}



const ChildForm = memo(createChildForm(itemFormOpts))

function RouteComponent() {
  const [key, setKey] = useState(0);

  return (
    <FormPaperContainer>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      
      <FormPaper square elevation={5}>
        <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>Register new item</Typography>
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
                title: "Base data", formConfig: itemFormConfig.basicFieldsConfig
              },
              {
                title: "Sale data", formConfig: itemFormConfig.saleFieldsConfig
              }
            ]}
          />         
      </FormPaper>
    </FormPaperContainer>
  );
}
