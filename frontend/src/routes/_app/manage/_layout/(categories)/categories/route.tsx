import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/general/CustomTabs';
import { Paper } from '@mui/material';

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
    <Paper sx={{ height: "100%", display: "flex", flexDirection: "column", minHeight: 0 }}>
      <CustomTabs props={tabs} />
      <Outlet />
    </Paper>
  );
}