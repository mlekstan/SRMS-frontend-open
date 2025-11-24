import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/manage/_layout/(categories)/categories/')({
  beforeLoad: async () => {
    throw redirect({ to: "/manage/categories/create" });
  }
});