import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/general/CustomTabs';
import { Box } from '@mui/material';

export const Route = createFileRoute('/_app/manage/_layout/(categories)/categories')({
  component: RouteComponent,
})

const tabs: CustomTabProps[] = [
  {
    to: "/manage/categories/create",
    name: "registration.category"
  },
  {
    to: '/manage/categories/view',
    name: "view.categories"
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