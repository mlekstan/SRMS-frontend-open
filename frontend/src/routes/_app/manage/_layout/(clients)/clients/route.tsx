import { Box } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/general/CustomTabs';

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
    <Box>
      <CustomTabs props={tabs} />
      <Outlet />
    </Box>
  );
}
