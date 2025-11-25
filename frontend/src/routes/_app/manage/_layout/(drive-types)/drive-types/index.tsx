import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/manage/_layout/(drive-types)/drive-types/')({
  beforeLoad: async () => {
    throw redirect({ to: "/manage/drive-types/create" });
  }
});