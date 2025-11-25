import type { Subcategory } from "@/api/types";
import type { LangKeys } from "@/providers/TranslationProvider";
import { createColumnHelper } from "@tanstack/react-table";

function setHeader(header: LangKeys) {
  return header;
}

const columnHelper = createColumnHelper<Subcategory>()

const subcategoriesTableColumns = [
  columnHelper.accessor("id", {
    header: setHeader("view.subcategories.table.column.id"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("name", {
    header: setHeader("view.subcategories.table.column.name"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.category.name, {
    id: "category",
    header: setHeader("view.subcategories.table.column.category"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
]

export { subcategoriesTableColumns };