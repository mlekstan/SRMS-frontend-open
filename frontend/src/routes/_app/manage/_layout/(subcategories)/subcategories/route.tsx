import { Box } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/general/CustomTabs';

export const Route = createFileRoute('/_app/manage/_layout/(subcategories)/subcategories')({
  component: RouteComponent,
})

const tabs: CustomTabProps[] = [
  {
    to: "/manage/subcategories/create",
    name: "registration.subcategory"
  },
  {
    to: "/manage/subcategories/view",
    name: "view.subcategories"
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