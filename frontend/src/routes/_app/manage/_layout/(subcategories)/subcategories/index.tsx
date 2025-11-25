import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/manage/_layout/(subcategories)/subcategories/')({
  beforeLoad: async () => {
    throw redirect({ to: "/manage/subcategories/create" })
  }
});
