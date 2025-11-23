import type { Branch } from "@/api/types";
import type { LangKeys } from "@/providers/TranslationProvider";
import { createColumnHelper } from "@tanstack/react-table";

function setHeader(header: LangKeys) {
  return header;
}

const columnHelper = createColumnHelper<Branch>()

const branchesTableColumns = [
  columnHelper.accessor("id", {
    header: setHeader("view.branches.table.column.id"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("name", {
    header: setHeader("view.branches.table.column.name"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("country", {
    header: setHeader("view.branches.table.column.country"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("city", {
    header: setHeader("view.branches.table.column.city"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("street", {
    header: setHeader("view.branches.table.column.street"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("streetNumber", {
    header: setHeader("view.branches.table.column.streetNumber"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("flatNumber", {
    header: setHeader("view.branches.table.column.flatNumber"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("zipCode", {
    header: setHeader("view.branches.table.column.zipCode"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
]

export { branchesTableColumns };