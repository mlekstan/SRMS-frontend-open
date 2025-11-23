import { Box } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/CustomTabs';

export const Route = createFileRoute('/_app/manage/_layout/(clients)/clients')({
  component: RouteComponent,
})

const tabs: CustomTabProps[] = [
  {
    to: "/manage/clients/create",
    name: "registration.client"
  },
  {
    to: "/manage/clients/view",
    name: "view.clients"
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
