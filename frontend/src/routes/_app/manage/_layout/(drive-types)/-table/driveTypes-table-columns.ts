import type { DriveType } from "@/api/types";
import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";
import { createColumnHelper } from "@tanstack/react-table";

function setHeader(header: LangKeys) {
  return header;
}

const columnHelper = createColumnHelper<DriveType>()

const driveTypesTableColumns = [
  columnHelper.accessor("id", {
    header: setHeader("view.driveTypes.table.column.id"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("name", {
    header: setHeader("view.driveTypes.table.column.name"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  })
]

export { driveTypesTableColumns };