import type { Client } from "@/api/types";
import type { LangKeys } from "@/providers/TranslationProvider";
import { createColumnHelper } from "@tanstack/react-table";

function setHeader(header: LangKeys) {
  return header;
}

const columnHelper = createColumnHelper<Client>()

const clientsTableColumns = [
  columnHelper.accessor("id", {
    header: setHeader("view.clients.table.column.id"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("firstName", {
    header: setHeader("view.clients.table.column.firstName"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("middleName", {
    header: setHeader("view.clients.table.column.middleName"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("lastName", {
    header: setHeader("view.clients.table.column.lastName"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("country", {
    header: setHeader("view.clients.table.column.country"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("city", {
    header: setHeader("view.clients.table.column.city"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("street", {
    header: setHeader("view.clients.table.column.street"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("streetNumber", {
    header: setHeader("view.clients.table.column.streetNumber"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("flatNumber", {
    header: setHeader("view.clients.table.column.flatNumber"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("zipCode", {
    header: setHeader("view.clients.table.column.zipCode"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("email", {
    header: setHeader("view.clients.table.column.email"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("areaCode", {
    header: setHeader("view.clients.table.column.areaCode"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("phoneNumber", {
    header: setHeader("view.clients.table.column.phoneNumber"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("identityCardNumber", {
    header: setHeader("view.clients.table.column.identityCardNumber"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("dateJoined", {
    header: setHeader("view.clients.table.column.dateJoined"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
]

export { clientsTableColumns };