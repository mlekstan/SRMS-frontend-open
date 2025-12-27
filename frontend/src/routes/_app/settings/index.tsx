import { createFileRoute } from '@tanstack/react-router'
import { SettingsList } from './-components/SettingsList';
import { Box } from '@mui/material';

export const Route = createFileRoute('/_app/settings/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Box>
      <SettingsList />
    </Box>
  );
}
