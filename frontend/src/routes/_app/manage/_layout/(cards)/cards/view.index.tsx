import { Loader } from '@/routes/-components/Loader';
import { createFileRoute, useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router'
import { FailureDialog } from '../../../-components/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import { FormPaperContainer } from '../../../-components/FormPaper';
import CustomBreadcrumbs from '../../../-components/CustomBreadcrumbs';
import { CustomTable } from '../../../-components/tables/CustomTable';
import { useQuery } from '@tanstack/react-query';
import { apiGet } from '@/api/apiGet';
import type { Card } from '@/api/types';
import { cardsTableColumns } from '../../../-components/tables/cards-table-columns';

export const Route = createFileRoute('/_app/manage/_layout/(cards)/cards/view/')({
  component: RouteComponent,
  loader: async ({ context }) => {

    await context.queryClient.fetchQuery({
      queryKey: ["cards"],
      queryFn: () => apiGet<Card>({ url: "/cards" }),
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
          goBack(router, canGoBack, "/manage/cards/create");
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
  { to: "/manage/cards/create", label: "registration.card" },
  { to: "/manage/cards/view", label: "view.cards" }
];


function RouteComponent() {
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();
  const { data, error, isSuccess, isPending, isError } = useQuery({ 
    queryKey: ["cards"], 
    queryFn: () => apiGet<Card>({ url: "/cards" }), 
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
            columns={cardsTableColumns} 
            data={data} 
            rowsPerPageOptions={[5, 10, 15]}
            onRowClick={(row) => navigate({ to: "/manage/cards/view/$cardId", params: { cardId: row.id } })}
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
            goBack(router, canGoBack, "/manage/cards/create")
          }}
          duration={null}
          info={"failureDialog.info.data"}
          message={error.message}
        />
      }
    </>
  );
}
