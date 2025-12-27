import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/general/CustomTabs';
import { Box } from '@mui/material';

export const Route = createFileRoute('/_app/manage/_layout/(cards)/cards')({
  component: RouteComponent,
})

const tabs: CustomTabProps[] = [
  {
    to: "/manage/cards/create",
    name: "registration.card"
  },
  {
    to: '/manage/cards/view',
    name: "view.cards"
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