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
import type { Subcategory } from '@/api/types';
import { subcategoriesTableColumns } from '../-table/subcategories-table-columns';


export const Route = createFileRoute("/_app/manage/_layout/(subcategories)/subcategories/view/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    
    await context.queryClient.fetchQuery({
      queryKey: ["subcategories"],
      queryFn: () => apiGet<Subcategory>({ url: "/subcategories" }),
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
          goBack(router, canGoBack, "/manage/subcategories/create");
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
  { to: "/manage/subcategories/create", label: "registration.subcategory" },
  { to: "/manage/subcategories/view", label: "view.subcategories" }
];


function RouteComponent() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();
  const { data, error, isSuccess, isPending, isError } = useQuery({ 
    queryKey: ["subcategories"], 
    queryFn: () => apiGet<Subcategory>({ url: "/subcategories" }), 
    retry: 0, 
    refetchInterval: 10000 
  });

  console.log(data)

  return (
    <>
      {
        (isSuccess || data) &&
        <FormPaperContainer>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          <CustomTable 
            columns={subcategoriesTableColumns} 
            data={data} 
            rowsPerPageOptions={[5, 10, 15]}
            onRowClick={(row) => navigate({ to: "/manage/subcategories/view/$subcategoryId", params: { subcategoryId: row.id } })}
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
            goBack(router, canGoBack, "/manage/subcategories/create");
          }}
          duration={null}
          info={"failureDialog.info.data"}
          message={error.message}
        />
      }
    </>
  );
}

