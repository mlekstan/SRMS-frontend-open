import type { Card } from "@/api/types";
import type { LangKeys } from "@/providers/TranslationProvider";
import { createColumnHelper } from "@tanstack/react-table";

function setHeader(header: LangKeys) {
  return header;
}

const columnHelper = createColumnHelper<Card>()

const cardsTableColumns = [
  columnHelper.accessor("id", {
    header: setHeader("view.cards.table.column.id"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("barcode", {
    header: setHeader("view.cards.table.column.barcode"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("isTemp", {
    header: setHeader("view.cards.table.column.isTemp"),
    cell: info => String(info.getValue()),
    footer: info => info.column.id,
  })
]

export { cardsTableColumns };