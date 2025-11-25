import { Box } from '@mui/material';
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/CustomTabs';

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
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "secondary.main" }}>
        <CustomTabs props={tabs} />
      </Box>
      <Outlet />
    </>
  );
}