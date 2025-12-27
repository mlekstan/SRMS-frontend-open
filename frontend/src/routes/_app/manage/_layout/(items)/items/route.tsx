import { Box } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/general/CustomTabs';

export const Route = createFileRoute('/_app/manage/_layout/(items)/items')({
  component: RouteComponent,
})

const tabs: CustomTabProps[] = [
  {
    to: "/manage/items/create",
    name: "registration.item"
  },
  {
    to: "/manage/items/view",
    name: "view.items"
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
