import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";
import { ActionsCell } from "./ActionsCell";
import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";

export type PriceListPosition = {
  id: number | null;
  timeUnit: string;
  maxSpeed: string;
  price: string;
}


const columnHelper = createColumnHelper<PriceListPosition>();

export function usePriceListTable() {
  const form = useFormContext();
  const positions = useStore(form.store, state => state.values.positions);
  const { t, lang } = useTranslationContext();

  const columns = useMemo(() => [
    columnHelper.display({
      id: "no",
      header: t("registration.priceList.table.column.number"),
      cell: info => info.row.index + 1
    }),
    columnHelper.accessor("timeUnit", {
      header: t("registration.priceList.table.column.timeUnit"),
      cell: ({ row }) => (
        <form.AppField 
          name={`positions[${row.index}].timeUnit`}
          validators={{
            onChange: ({ value }) => {
              const regex = /^\d{2} ([0-1]\d|2[0-3]):[0-5]\d$/;
              if (!regex.test(value)) 
                return "validation.empty" as LangKeys;
            }
          }}
        >
          {
            (subField: any) => {
              console.log("form", form)
              return <subField.TimeUnitTextField />
            }
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
          validators={{
            onChange: ({ value }) => {
              if (value === "") {
                return "validation.empty" as LangKeys;
              }
            }
          }}
        >
          {
            (subField: any) => <subField.PriceTextField />
          }
        </form.AppField>
      )
    }),
    columnHelper.display({
      id: "actions",
      header: t("registration.priceList.table.column.actions"),
      cell: ({ row }) => (
        <ActionsCell rowIndex={row.index} form={form} />
      )
    })
  ], [lang, form]);


  const table = useReactTable({
    columns, 
    data: positions, 
    getCoreRowModel: getCoreRowModel()
  });

  return table;
}