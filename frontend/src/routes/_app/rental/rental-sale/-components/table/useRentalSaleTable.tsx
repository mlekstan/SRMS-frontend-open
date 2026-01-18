import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useMemo } from "react";
import { ActionsCell } from "./ActionsCell";
import { DiscountTextField } from "../form/field-components/DiscountTextField";
import { useFormContext } from "@/global-form/hooks/form-context";
import { useStore } from "@tanstack/react-form";
import { PriceText } from "../form/field-components/PriceText";
import { ChargeText } from "../form/field-components/ChargeText";
import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";


export type RentalSalePosition = {
  subcategoryId: number | "";
  speed: number | "null" | "";
  numberOfItems: number | "";
  rentalLength: string;
  price: number;
  discount: string;
  charge: number;
}


const columnHelper = createColumnHelper<RentalSalePosition>();
const rentalLengthRegexp = /^(\d{1,2})\s(0?[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/;

export function useRentalSaleTable() {
  const { t, lang } = useTranslationContext();
  const form = useFormContext();
  const positions = useStore(form.store, state => state.values.positions)

  const columns = useMemo(() => [
    columnHelper.display({
      id: "no",
      header: t("rentalService.sale.table.column.number"),
      cell: info => info.row.index + 1,
    }),
    columnHelper.accessor("subcategoryId", {
      header: t("rentalService.sale.table.column.subcategory"),
      cell: ({ row }) => (
        <form.AppField
          name={`positions[${row.index}].subcategoryId`}
          listeners={{
            onChange: ({ value }) => {
              if (!value) {
                form.setFieldValue(`positions[${row.index}].speed`, "");
                form.setFieldValue(`positions[${row.index}].rentalLength`, "");
                form.setFieldValue(`positions[${row.index}].numberOfItems`, "");
                form.setFieldValue(`positions[${row.index}].price`, 0);
                form.setFieldValue(`positions[${row.index}].discount`, "0");
                form.setFieldValue(`positions[${row.index}].charge`, 0);
              }
            }
          }}
          validators={{
            onSubmit: ({ value }) => {
              if (!value) {
                return "validation.empty" as LangKeys;
              }
            }
          }}
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
          listeners={{
            onChange: ({ value }) => {
              if (!value) {
                form.setFieldValue(`positions[${row.index}].price`, 0);
                form.setFieldValue(`positions[${row.index}].discount`, "0");
                form.setFieldValue(`positions[${row.index}].charge`, 0)          
              }
            }
          }}
          validators={{
            onSubmit: ({ value }) => {
              if (!value) {
                return "validation.empty" as LangKeys;
              }
            } 
          }}
        >
          {
            (subField: any) => <subField.SpeedAutocomplete rowId={row.id} rowIndex={row.index} />
          }
        </form.AppField>
      )
    }),
    columnHelper.accessor("rentalLength", {
      header: t("rentalService.sale.table.column.rentalLength"),
      cell: ({ row }) => (
        <form.AppField
          name={`positions[${row.index}].rentalLength`}
          listeners={{
            onChange: ({ value }) => {
              if (!rentalLengthRegexp.test(value)) {
                form.setFieldValue(`positions[${row.index}].price`, 0);
                form.setFieldValue(`positions[${row.index}].discount`, "0");
                form.setFieldValue(`positions[${row.index}].charge`, 0)          
              }
            }
          }}
          validators={{
            onSubmit: ({ value }) => {
              if (!rentalLengthRegexp.test(value)) {
                return "validation.empty" as LangKeys;
              }
            }
          }}
        >
          {
            (subField: any) => <subField.TimeTextField rowId={row.id} rowIndex={row.index} />
          }
        </form.AppField>
      )
    }),
    columnHelper.accessor("numberOfItems", {
      header: t("rentalService.sale.table.column.numberOfItems"),
      cell: ({ row }) => (
        <form.AppField
          name={`positions[${row.index}].numberOfItems`}
          listeners={{
            onChange: ({ value }) => {
              if (!value) {
                form.setFieldValue(`positions[${row.index}].price`, 0);
                form.setFieldValue(`positions[${row.index}].discount`, "0");
                form.setFieldValue(`positions[${row.index}].charge`, 0)          
              }
            }
          }}
          validators={{
            onSubmit: ({ value }) => {
              if (!value) {
                return "validation.empty" as LangKeys;
              }
            }
          }}
        >
          {
            (subField: any) => 
              <subField.QuantityAutocomplete 
                rowId={row.id} 
                rowIndex={row.index} 
              />
          }
        </form.AppField>
      )
    }),
    columnHelper.accessor("price", {
      header: t("rentalService.sale.table.column.price"),
      cell: ({ row }) => (
        <form.AppField
          name={`positions[${row.index}].price`}
        >
          {
            (subField: any) => <PriceText rowId={row.id} rowIndex={row.index} />
          }
        </form.AppField>
      )
    }),
    columnHelper.accessor("discount", {
      header: t("rentalService.sale.table.column.discount"),
      cell: ({ row }) => (
        <form.AppField
          name={`positions[${row.index}].discount`}
        >
          {
            (subField: any) => <DiscountTextField rowIndex={row.index} />
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
            (subField: any) => <ChargeText rowIndex={row.index}/>
          }
        </form.AppField>
      )
    }),
    columnHelper.display({
      id: "actions",
      header: t("rentalService.sale.table.column.actions"),
      cell: ({ row }) => <ActionsCell rowIndex={row.index} form={form} />
    })
  ], [lang, form]);


  const table = useReactTable({
    columns, 
    data: positions, 
    getCoreRowModel: getCoreRowModel() 
  });

  return table;
}