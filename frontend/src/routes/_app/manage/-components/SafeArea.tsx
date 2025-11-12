import { Box, styled, type BoxProps } from "@mui/material";


export const SafeArea = styled(Box)<BoxProps>(({ theme }) => ({
  '&': {
    padding: theme.spacing(8),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(4),
    },
  }
}));