import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/manage/_layout/(clients)/clients/')({
  beforeLoad: async () => {
    throw redirect({ to: "/manage/clients/create" })
  }
})


