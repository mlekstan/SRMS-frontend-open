import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { memo, type ReactNode } from "react";




export default memo(function ChildFormAccordion({ children, title, valid }: { children: ReactNode, title: string, valid: boolean }) {
  
  console.log("Accordion")

  let style = {};
  if (valid === false) {
    style = {color: 'error.main'};
  }


  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography variant='h6' component="span" sx={style} >{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        >    
          {children}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
})