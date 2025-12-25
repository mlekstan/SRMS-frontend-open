import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles"; 
import { type PaperProps, type BoxProps } from "@mui/material";



const FormPaper = styled(Paper)<PaperProps>(({ theme }) => ({
  '&': {
    padding: theme.spacing(12),
    backgroundColor: theme.palette.secondary.light,
  }
}));

const FormPaperContainer = styled(Box)<BoxProps>(({ theme }) => ({
  '&': {
    padding: theme.spacing(16),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(8),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4),
    },
  }
}));


export {FormPaper, FormPaperContainer};