import { getUsers } from '@/api/users/users.get';
import { Loader } from '@/routes/-components/Loader';
import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { FailureDialog } from '../-components/FailureDialog';
import { goBack } from '../-forms/goBack';
import { UsersTable } from '../-components/tables/UsersTable';
import { FormPaperContainer } from '../-components/FormPaper';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import CustomBreadcrumbs from '../-components/CustomBreadcrumbs';

export const Route = createFileRoute("/_app/manage/users/view/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    
    await context.queryClient.fetchQuery({
      queryKey: ["users"],
      queryFn: () => getUsers(),
      staleTime: 10000,
    })
  },
  gcTime: 0,
  shouldReload: false,
  pendingComponent: () => <Loader open={true} />,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    const canGoBack = useCanGoBack();

    return (
      <FailureDialog 
        open={true}
        closeFn={() => {
          reset();
          goBack(router, canGoBack, "/manage/users");
        }}
        duration={null}
        info={"failureDialog.info.loader"}
        message={error.message}
      />
    );
  }
})


const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/users/create", label: "registration.user" },
  { to: "/manage/users/view", label: "view.users" }
];


function RouteComponent() {
  return (
    <FormPaperContainer>
      <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
      <UsersTable />
    </FormPaperContainer>
  );
}