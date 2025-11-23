import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/manage/_layout/(branches)/branches/')({
  beforeLoad: async () => {
    throw redirect({ to: "/manage/branches/create" });
  }
});
