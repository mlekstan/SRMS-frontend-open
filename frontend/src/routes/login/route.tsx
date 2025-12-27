import { Box, useTheme } from '@mui/material';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import HexalLogo from "@/assets/HEXAL_logo.svg?react";

export const Route = createFileRoute('/login')({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.authService.getState();
    if (isAuthenticated) {
      throw redirect({ to: "/rental" });
    }
  }
});

function RouteComponent() {
  const theme = useTheme();

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{ 
          height: "120px",
          backgroundColor: theme.palette.primary.main,
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          flexShrink: 0
        }}
      >
        <HexalLogo height={"3.8em"} width={"auto"}/>
      </Box>

      <Box
        sx={{ flex: 1, overflow: "auto", backgroundColor: 'background.default' }}
      >
        <Box 
          sx={{
            minHeight: "100%", 
            minWidth: "100%", 
            width: "fit-content", 
            display: "flex", 
            flexDirection: "column",
            padding: "3rem", 
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}