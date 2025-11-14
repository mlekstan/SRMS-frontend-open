import { Box, Paper, Tab, Tabs } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../-components/CustomTabs';

export const Route = createFileRoute('/_app/manage/_layout/users')({
  component: RouteComponent,
})

const tabs: CustomTabProps[] = [
  {
    to: "/manage/users/create",
    name: "registration.user"
  },
  {
    to: "/manage/users/view",
    name: "view.users"
  }
];

function RouteComponent() {

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "secondary.main" }}>
        <CustomTabs props={tabs} />
      </Box>
      <Outlet />
    </>
  );
}
