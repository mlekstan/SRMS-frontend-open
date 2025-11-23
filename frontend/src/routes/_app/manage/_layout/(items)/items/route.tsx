import { Box } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/CustomTabs';

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
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "secondary.main" }}>
        <CustomTabs props={tabs} />
      </Box>
      <Outlet />
    </>
  );
}
