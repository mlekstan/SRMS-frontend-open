import { useTranslationContext } from '@/providers/TranslationContext';
import type { ExtendedLinkOptions } from '@/types/ExtendedLinkOptions';
import type { Leaves } from '@/types/Leaves';
import { createFileRoute, useCanGoBack, useRouter } from '@tanstack/react-router'
import { memo, useState } from 'react';
import { branchFormOpts } from '../../../-forms/branch-form/branchForm-options';
import { Loader } from '@/routes/-components/Loader';
import { FailureDialog } from '../../../-components/FailureDialog';
import { goBack } from '../../../-forms/goBack';
import { FormPaper, FormPaperContainer } from '../../../-components/FormPaper';
import CustomBreadcrumbs from '../../../-components/CustomBreadcrumbs';
import { Typography } from '@mui/material';
import Form from '../../../-forms/Form';
import { branchFormConfig } from '../../../-forms/branch-form/branchForm-config';
import { branchFormSchema } from '../../../-forms/branch-form/branchForm-schema';
import { useQuery } from '@tanstack/react-query';
import { createChildForm } from '../../../-forms/createChildForm';
import { apiPut } from '@/api/apiPut';
import { apiGet } from '@/api/apiGet';
import type { Branch, Card } from '@/api/types';
import { cardFormOpts } from '../../../-forms/card-form/cardForm-options';
import { cardFormSchema } from '../../../-forms/card-form/cardForm-schema';
import { cardFormConfig } from '../../../-forms/card-form/cardForm-config';


type FormFields = Leaves<typeof cardFormOpts.defaultValues>;
type FieldsValuesMap = Record<FormFields, string | number>;


export const Route = createFileRoute(
  '/_app/manage/_layout/(cards)/cards/view/$cardId',
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {

    await context.queryClient.fetchQuery({
      queryKey: ["card", params.cardId],
      queryFn: () => apiGet<Card>({ url: "/cards", id: params.cardId }),
      staleTime: 10000,
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
          goBack(router, canGoBack, "/manage/cards/view");
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
  { to: "/manage/cards/view", label: "view.cards" },
  { to: "/manage/cards/view/$cardId", label: "edit.card" }
];


const ChildForm = memo(createChildForm(cardFormOpts));


function RouteComponent() {
  const [key, setKey] = useState(0);
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const {t} = useTranslationContext();
  const params = Route.useParams();
  const { data, error, isSuccess, isPending, isError, refetch } = useQuery({
    queryKey: ["card", params.cardId], 
    queryFn: () => apiGet<Card>({ url: "/cards", id: params.cardId }), 
    retry: 0, 
    refetchInterval: 10000 
  });

  let initialFieldsValuesMap: FieldsValuesMap | undefined;
  if (data) {
    initialFieldsValuesMap = {
      "cardData.barcode": data.barcode,
    };
  }

  return (
    <>
      {
        (isSuccess || data) &&
        <FormPaperContainer>
          <CustomBreadcrumbs breadcrumbsOptions={breadcrumbsOptions}/>
          
          <FormPaper square elevation={5}>
            <Typography variant='h5' sx={(theme) => ({marginBottom: theme.spacing(8)})}>{t('edit.card')}</Typography>
              <Form 
                key={key}
                initialFieldsValuesMap={initialFieldsValuesMap}
                reset={() => {
                  setKey(prev => prev + 1);
                }} 
                requestFn={(value) => apiPut("/cards", params.cardId, value)}
                formOptions={cardFormOpts}
                validationSchema={cardFormSchema}
                childFormComponent={ChildForm}
                childFormsProps={[
                  {
                    title: "registration.card.form.card.title", formConfig: cardFormConfig.cardFieldsConfig
                  },
                ]}
              />  
          </FormPaper>
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
            goBack(router, canGoBack, "/manage/cards/view");
          }}
          duration={null}
          info={"failureDialog.info.data"}
          message={error.message}
        />
      }
    </>
  );
}