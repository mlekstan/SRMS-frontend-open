import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/general/CustomTabs';
import { Box } from '@mui/material';

export const Route = createFileRoute('/_app/manage/_layout/(drive-types)/drive-types')({
  component: RouteComponent,
})

const tabs: CustomTabProps[] = [
  {
    to: "/manage/drive-types/create",
    name: "registration.driveType"
  },
  {
    to: '/manage/drive-types/view',
    name: "view.driveTypes"
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