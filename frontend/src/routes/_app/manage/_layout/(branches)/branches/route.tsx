import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/general/CustomTabs';
import { Paper } from '@mui/material';

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
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
      <CustomTabs props={tabs} />
      <Outlet />
    </Paper>
  );
}
