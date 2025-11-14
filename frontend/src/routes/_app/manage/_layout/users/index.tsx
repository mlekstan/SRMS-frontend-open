import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/manage/_layout/users/')({
  beforeLoad: async () => {
    throw redirect({ to: "/manage/users/create" });
  }
});
