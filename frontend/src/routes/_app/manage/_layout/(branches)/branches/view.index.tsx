import { Loader } from '@/routes/-components/Loader';
import { createFileRoute, useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router'
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { CustomTable } from '../../../-components/tables/CustomTable';
import { useQuery } from '@tanstack/react-query';
import { branchesTableColumns } from '../-table/branches-table-columns';
import { apiGet } from '@/api/apiGet';
import type { Branch } from '@/api/types';
import { Box } from '@mui/material';

export const Route = createFileRoute('/_app/manage/_layout/(branches)/branches/view/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.fetchQuery({
      queryKey: ["branches"],
      queryFn: () => apiGet<Branch>({ url: "/branches" }),
    });
  },
  pendingComponent: () => <Loader open={true} />,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    const canGoBack = useCanGoBack();

    return (
      <FailureDialog 
        open={true}
        closeFn={() => {
          reset();
          goBack(router, canGoBack, "/manage/branches/create");
        }}
        duration={null}
        info={"failureDialog.info.loader"}
        message={error.message}
      />
    );
  }
});


const breadcrumbsOptions: ExtendedLinkOptions[] = [
  { to: "/manage", label: "menu.manage" },
  { to: "/manage/branches/create", label: "registration.branch" },
  { to: "/manage/branches/view", label: "view.branches" }
];


function RouteComponent() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();
  const { data, error, isSuccess, isPending, isError } = useQuery({ 
    queryKey: ["branches"], 
    queryFn: () => apiGet<Branch>({ url: "/branches" }), 
    staleTime: 10 * 1000
  });
  
  return (
    <Box sx={{ flex: 1, overflow: "hidden" }}>
      {
        (isSuccess || data) &&
        <FormPaperContainer sx={{ height: "100%", boxSizing: "border-box", overflow: "auto" }}>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          <CustomTable 
            columns={branchesTableColumns} 
            data={data} 
            rowsPerPageOptions={[5, 10, 15]}
            onRowClick={(row) => navigate({ to: "/manage/branches/view/$branchId", params: { branchId: row.id } })}
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
            goBack(router, canGoBack, "/manage/branches/create")
          }}
          duration={null}
          info={"failureDialog.info.data"}
          message={error.message}
        />
      }
    </Box>
  );
}