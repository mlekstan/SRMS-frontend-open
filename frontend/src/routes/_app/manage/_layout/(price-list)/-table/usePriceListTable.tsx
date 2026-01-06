import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { usePriceListData } from "./usePriceListData";

export type PriceListPosition = {
  id: number | null;
  timeUnit: string;
  maxSpeed: string;
  price: string;
}


const columnHelper = createColumnHelper<PriceListPosition>();

export function usePriceListTable(form: any) {
  const { t, lang } = useTranslationContext();
  const dataObject = usePriceListData();

  const columns = useMemo(() => [
    columnHelper.display({
      id: "no",
      header: t("registration.priceList.table.column.number"),
      cell: info => info.row.index + 1
    }),
    columnHelper.accessor("timeUnit", {
      header: t("registration.priceList.table.column.timeUnit"),
      cell: ({ row, cell }) => (
        <form.AppField 
          name={`positions[${row.index}].timeUnit`}
        >
          {
            (subField: any) => <subField.TimeUnitField />
          }
        </form.AppField>
      )
    }), 
    columnHelper.accessor("maxSpeed", {
      header: t("registration.priceList.table.column.maxSpeed"),
      cell: ({ row }) => (
        <form.AppField 
          name={`positions[${row.index}].maxSpeed`}
        >
          {
            (subField: any) => <subField.MaxSpeedTextField />
          }
        </form.AppField>
      )
    }), 
    columnHelper.accessor("price", {
      header: t("registration.priceList.table.column.price"),
      cell: ({ row }) => (
        <form.AppField 
          name={`positions[${row.index}].price`}
        >
          {
            (subField: any) => <subField.PriceTextField />
          }
        </form.AppField>
      )
    }),
    columnHelper.display({
      id: "actions",
      header: t("registration.priceList.table.column.actions")
      cell: ({ row }) => (

      )
    })
  ], [lang, form, dataObject]);

  const table = useReactTable({
    columns, 
    data: dataObject.data, 
    getCoreRowModel: getCoreRowModel()
  });

  return table;
}