import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextFieldWrapper from '@/routes/_app/register/-components/TextFieldWrapper';


type dataField = {
  label: string,
  required: boolean,
  type: string
};

type FullAccordionProps = {
  title: string,
  dataFields: Array<dataField>
};

const FullAccordion = ({title, dataFields}: FullAccordionProps) => {
  const [valid, setValid] = useState(dataFields.map((val) => !val.required));

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
          {dataFields.map((value, index) => {
            
            return (
              <TextFieldWrapper key={index} values={value} ancestorValid={valid} setAncestorValid={setValid} index={index} />         
            );
          })}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}


export default FullAccordion;