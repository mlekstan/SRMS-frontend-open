import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CustomTabs, type CustomTabProps } from '../../../-components/CustomTabs';
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
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "secondary.main" }}>
        <CustomTabs props={tabs} />
      </Box>
      <Outlet />
    </>
  );
}