import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { useRentalSaleData } from "./useRentalSaleData";
import { ActionsCell } from "./ActionsCell";

export type RentalSalePosition = {
  categoryId: string;
  subcategoryId: string;
  speed: string;
  numberOfItems: string;
  rentalLenght: string;
  charge: string;
}


const columnHelper = createColumnHelper<RentalSalePosition>();

export function useRentalSaleTable(form: any, initialData: RentalSalePosition[]) {
  const { t, lang } = useTranslationContext();
  const dataObject = useRentalSaleData(initialData);

  const columns = useMemo(() => [
    columnHelper.display({
      id: "no",
      header: t("rentalService.sale.table.column.number"),
      cell: info => info.row.index + 1,
    }),
    columnHelper.accessor("categoryId", {
      header: t("rentalService.sale.table.column.category"),
      cell: ({ row }) => (
        <form.AppField
          name={`positions[${row.index}].categoryId`}
        >
          {
            (subField: any) => <subField.CategoryAutocomplete rowId={row.id} />
          }
        </form.AppField>
      )
    }),
    columnHelper.accessor("subcategoryId", {
      header: t("rentalService.sale.table.column.subcategory"),
      cell: ({ row }) => (
        <form.AppField
          name={`positions[${row.index}].subcategoryId`}
        >
          {
            (subField: any) => <subField.SubcategoryAutocomplete rowId={row.id} />
          }
        </form.AppField>
      )
    }),
    columnHelper.accessor("speed", {
      header: t("rentalService.sale.table.column.speed"),
      cell: ({ row }) => (
        <form.AppField
          name={`positions[${row.index}].speed`}
        >
          {
            (subField: any) => <subField.SpeedAutocomplete rowId={row.id} />
          }
        </form.AppField>
      )
    }),
    columnHelper.accessor("numberOfItems", {
      header: t("rentalService.sale.table.column.numberOfItems"),
      cell: ({ row }) => (
        <form.AppField
          name={`positions[${row.index}].numberOfItems`}
        >
          {
            (subField: any) => <subField.QuantityAutocomplete rowId={row.id} />
          }
        </form.AppField>
      )
    }),
    columnHelper.accessor("charge", {
      header: t("rentalService.sale.table.column.charge"),
      cell: ({ row }) => (
        <form.AppField
          name={`positions[${row.index}].charge`}
        >
          {
            (subField: any) => <></>
          }
        </form.AppField>
      )
    }),
    columnHelper.display({
      id: "actions",
      header: t("rentalService.sale.table.column.actions"),
      cell: ({ row }) => <ActionsCell rowIndex={row.index} dataObject={dataObject} form={form} />
    })
  ], [lang, form, dataObject]);


  const table = useReactTable({
    columns, 
    data: dataObject.data, 
    getCoreRowModel: getCoreRowModel() 
  });

  return table;
}