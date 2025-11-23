import { Loader } from '@/routes/-components/Loader';
import { createFileRoute, useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router'
import { FailureDialog } from '../../-components/FailureDialog';
import { goBack } from '../../-forms/goBack';
import { FormPaperContainer } from '../../-components/FormPaper';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import CustomBreadcrumbs from '../../-components/CustomBreadcrumbs';
import { CustomTable } from '../../-components/tables/CustomTable';
import { usersTableColumns } from '../../-components/tables/users-table-columns';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/api/apiGet';
import type { User } from '@/api/types';


export const Route = createFileRoute("/_app/manage/_layout/users/view/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    
    await context.queryClient.fetchQuery({
      queryKey: ["users"],
      queryFn: () => apiGet<User>({ url: "/users" }),
      staleTime: 10000,
    });
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
          goBack(router, canGoBack, "/manage/users/create");
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
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();
  const { data, error, isSuccess, isPending, isError } = useQuery({ 
    queryKey: ["users"], 
    queryFn: () => apiGet<User>({ url: "/users" }), 
    retry: 0, 
    refetchInterval: 10000 
  });

  return (
    <>
      {
        (isSuccess || data) &&
        <FormPaperContainer>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          <CustomTable 
            columns={usersTableColumns} 
            data={data} 
            rowsPerPageOptions={[5, 10, 15]}
            onRowClick={(row) => navigate({ to: "/manage/users/view/$userId", params: { userId: row.id } })}
            />
        </FormPaperContainer>
      }

      {
        isPending &&
        <Loader open={true} />
      }

      {
        (isError && error) &&
        <FailureDialog 
          open={true}
          closeFn={() => {
            goBack(router, canGoBack, "/manage/users/create");
          }}
          duration={null}
          info={"failureDialog.info.data"}
          message={error.message}
        />
      }
    </>
  );
}