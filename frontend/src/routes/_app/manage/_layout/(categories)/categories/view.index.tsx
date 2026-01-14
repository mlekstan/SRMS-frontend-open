import { Loader } from '@/routes/-components/Loader';
import { createFileRoute, useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router'
import { FailureDialog } from '../../../-components/general/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { FormPaperContainer } from '../../../-components/general/FormPaper';
import CustomBreadcrumbs from '../../../-components/general/CustomBreadcrumbs';
import { CustomTable } from '../../../-components/tables/CustomTable';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/api/apiGet';
import type { Category } from '@/api/types';
import { categoriesTableColumns } from '../-table/categories-table-columns';
import { Box } from '@mui/material';


export const Route = createFileRoute('/_app/manage/_layout/(categories)/categories/view/')({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.fetchQuery({
      queryKey: ["categories"],
      queryFn: () => apiGet<Category>({ url: "/categories" }),
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
          goBack(router, canGoBack, "/manage/categories/create");
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
  { to: "/manage/categories/create", label: "registration.category" },
  { to: "/manage/categories/view", label: "view.categories" }
];


function RouteComponent() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();
  const { data, error, isSuccess, isPending, isError } = useQuery({ 
    queryKey: ["categories"], 
    queryFn: () => apiGet<Category>({ url: "/categories" }), 
    staleTime: 10 * 1000
  });
  
  return (
    <Box sx={{ flex: 1, overflow: "hidden" }}>
      {
        (isSuccess || data) &&
        <FormPaperContainer sx={{ height: "100%", boxSizing: "border-box", overflow: "auto" }}>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          <CustomTable 
            columns={categoriesTableColumns} 
            data={data} 
            rowsPerPageOptions={[5, 10, 15]}
            onRowClick={(row) => navigate({ to: "/manage/categories/view/$categoryId", params: { categoryId: row.id } })}
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
            goBack(router, canGoBack, "/manage/categories/create")
          }}
          duration={null}
          info={"failureDialog.info.data"}
          message={error.message}
        />
      }
    </Box>
  );
}