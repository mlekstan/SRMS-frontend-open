import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/general/CustomTabs';
import { Box } from '@mui/material';

export const Route = createFileRoute('/_app/manage/_layout/(branches)/branches')({
  component: RouteComponent,
})

const tabs: CustomTabProps[] = [
  {
    to: "/manage/branches/create",
    name: "registration.branch"
  },
  {
    to: '/manage/branches/view',
    name: "view.branches"
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
