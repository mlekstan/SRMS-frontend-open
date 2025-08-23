import { useContext, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { formContext, useFormContext } from '../client';
import TextFieldWrapper from './TextFieldWrapper';


export type dataField = {
  fieldName: string,
  label: string,
  required: boolean,
  type: string
  imaskProps: object,
};

type FullAccordionProps = {
  title: string,
  fieldsDefs: Array<dataField>,
};

const FullAccordion = ({ title, fieldsDefs }: FullAccordionProps) => {
  const [valid, setValid] = useState(fieldsDefs.map((fieldDef) => !fieldDef.required));
  // const form = useFormContext();
  

  let style = {};
  if (valid.includes(false)) {
    style = {color: 'error.main'};
  }
  
  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant='h6' component="span" sx={style}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >    
          {
            fieldsDefs.map((fieldDef, index) => {
              return (
                // <form.Field
                  // name={fieldDef.fieldName}
                  // children={(field) => (
                    <TextFieldWrapper key={index} fieldDef={fieldDef} ancestorValid={valid[index]} setAncestorValid={setValid} index={index} />
                  // )}
                // />      
              );
            })
          }
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}


export default FullAccordion;