import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/manage/_layout/(items)/items/')({
  beforeLoad: async () => {
    throw redirect({ to: "/manage/items/create" })
  }
});