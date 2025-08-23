import { useState } from "react";
import { withForm } from "@/routes/_app/register/-form/hooks/form";
import { clientFormOpts } from "./form-options";
import ChildFormAccordion from "../-components/ChildFormAccordion";



export const ChildForm = withForm({
  ...clientFormOpts,

  props: {
    title: "Child form"
  },
  render: function Render({ form, title }) {
    const [valid, setValid] = useState(() => true);

    return (
      <ChildFormAccordion title={title} accordionValid={valid} >
        <form.AppField 
          name="cardData.cardBarcode"
          validators={{
            onMount: ({ value }) => 
              value === "" ? "Pole nie może być puste" : undefined,
            onChange: ({ value }) => {
              if (value === "") {
                return ("Pole nie może być puste")
              } else if (value.length < 13) {
                return ("Pole musi mieć 13 znaków")
              }
              return (undefined)
            }
              
          }}
          children={(field) => (<field.CustomTextField setAccordionValid={setValid} />)}
        
        />
      </ChildFormAccordion>

    );
  }
})