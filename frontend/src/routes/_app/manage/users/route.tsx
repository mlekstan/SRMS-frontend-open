import { Box, Paper, Tab, Tabs } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { SafeArea } from '../-components/SafeArea';
import { CustomTabs, type CustomTabProps } from '../-components/CustomTabs';

export const Route = createFileRoute('/_app/manage/users')({
  component: RouteComponent,
})

const tabs: CustomTabProps[] = [
  {
    to: "/manage/users/create",
    tabName: "registration.user"
  },
  {
    to: "/manage/users/view",
    tabName: "view.users"
  }
];

function RouteComponent() {

  return (
    <SafeArea>
      <Paper sx={{overflow: "hidden", backgroundColor: "secondary.light"}}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "secondary.main" }}>
          <CustomTabs props={tabs} />
        </Box>
        <Outlet />
      </Paper>
    </SafeArea>
  );
}
