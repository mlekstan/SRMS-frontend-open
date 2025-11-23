import type { Item } from "@/api/types";
import type { LangKeys } from "@/providers/TranslationProvider";
import { createColumnHelper } from "@tanstack/react-table";

function setHeader(header: LangKeys) {
  return header;
}

const columnHelper = createColumnHelper<Item>()

const itemsTableColumns = [
  columnHelper.accessor("id", {
    header: setHeader("view.items.table.column.id"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("name", {
    header: setHeader("view.items.table.column.name"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("shortName", {
    header: setHeader("view.items.table.column.shortName"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("barcode", {
    header: setHeader("view.items.table.column.barcode"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("marketValue", {
    header: setHeader("view.items.table.column.marketValue"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("forSale", {
    header: setHeader("view.items.table.column.forSale"),
    cell: info => info.getValue().toString(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("sellPrice", {
    header: setHeader("view.items.table.column.sellPrice"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.subcategory.name, {
    id: "subcategoryName",
    header: setHeader("view.items.table.column.subcategory"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.branch.name, {
    id: "branchName",
    header: setHeader("view.items.table.column.branch"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
]

export { itemsTableColumns };