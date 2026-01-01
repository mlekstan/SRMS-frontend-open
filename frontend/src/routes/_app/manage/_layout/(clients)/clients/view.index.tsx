import { Loader } from '@/routes/-components/Loader';
import { createFileRoute, useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router'
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { FormPaperContainer } from '../../../-components/general/FormPaper';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { CustomTable } from '../../../-components/tables/CustomTable';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/api/apiGet';
import type { Client } from '@/api/types';
import { clientsTableColumns } from '../-table/clients-table-columns';
import { Box } from '@mui/material';


export const Route = createFileRoute("/_app/manage/_layout/(clients)/clients/view/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    
    await context.queryClient.fetchQuery({
      queryKey: ["clients"],
      queryFn: () => apiGet<Client>({ url: "/clients" }),
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
          goBack(router, canGoBack, "/manage/clients/create");
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
  { to: "/manage/clients/create", label: "registration.client" },
  { to: "/manage/clients/view", label: "view.clients" }
];


function RouteComponent() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();
  const { data, error, isSuccess, isPending, isError } = useQuery({ 
    queryKey: ["clients"], 
    queryFn: () => apiGet<Client>({ url: "/clients" }), 
    retry: 0, 
    refetchInterval: 10000 
  });

  return (
    <Box sx={{ flex: 1, overflow: "hidden" }}>
      {
        (isSuccess || data) &&
        <FormPaperContainer sx={{ height: "100%", boxSizing: "border-box", overflow: "auto" }}>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          <CustomTable 
            columns={clientsTableColumns} 
            data={data} 
            rowsPerPageOptions={[5, 10, 15]}
            onRowClick={(row) => navigate({ to: "/manage/clients/view/$clientId", params: { clientId: row.id } })}
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
            goBack(router, canGoBack, "/manage/clients/create");
          }}
          duration={null}
          info={"failureDialog.info.data"}
          message={error.message}
        />
      }
    </Box>
  );
}