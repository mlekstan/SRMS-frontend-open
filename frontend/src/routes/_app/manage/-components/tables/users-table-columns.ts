import type { User } from "@/api/users/users.get";
import type { LangKeys } from "@/providers/TranslationProvider";
import { createColumnHelper } from "@tanstack/react-table";

function setHeader(header: LangKeys) {
  return header;
}

const columnHelper = createColumnHelper<User>()

const usersTableColumns = [
  columnHelper.accessor("id", {
    header: setHeader("view.users.table.column.id"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("firstName", {
    header: setHeader("view.users.table.column.firstName"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("middleName", {
    header: setHeader("view.users.table.column.middleName"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("lastName", {
    header: setHeader("view.users.table.column.lastName"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("email", {
    header: setHeader("view.users.table.column.email"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("areaCode", {
    header: setHeader("view.users.table.column.areaCode"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("phoneNumber", {
    header: setHeader("view.users.table.column.phoneNumber"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor("dateJoined", {
    header: setHeader("view.users.table.column.dateJoined"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.branch.name, {
    id: "branchName",
    header: setHeader("view.users.table.column.branchName"),
    cell: info => info.getValue(),
    footer: info => info.column.id,
  })
]

export { usersTableColumns };