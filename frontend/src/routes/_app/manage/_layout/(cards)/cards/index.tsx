import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/manage/_layout/(cards)/cards/')({
  beforeLoad: async () => {
    throw redirect({ to: "/manage/cards/create" });
  }
});
