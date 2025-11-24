import type { Category } from "@/api/types";
import type { LangKeys } from "@/providers/TranslationProvider";
import { createColumnHelper } from "@tanstack/react-table";

function setHeader(header: LangKeys) {
  return header;
}

const columnHelper = createColumnHelper<Category>()

const categoriesTableColumns = [
  columnHelper.accessor("id", {
    header: setHeader("view.categories.table.column.id"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("name", {
    header: setHeader("view.categories.table.column.name"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  })
]

export { categoriesTableColumns };