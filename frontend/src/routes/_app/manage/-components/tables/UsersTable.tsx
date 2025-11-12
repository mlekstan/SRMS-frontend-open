import { getUsers, type User } from '@/api/users/users.get';
import { Loader } from '@/routes/-components/Loader';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { SearchInput } from '../SearchInput';
import { useTranslationContext } from '@/providers/TranslationContext';
import type { LangKeys } from '@/providers/TranslationProvider';
import { useNavigate } from '@tanstack/react-router';


function setHeader(header: LangKeys) {
  return header;
}

const columnHelper = createColumnHelper<User>()

const columns = [
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


export function UsersTable() {
  const { t } = useTranslationContext();
  const navigate = useNavigate();
  const { data, error, isSuccess, isPending, isError } = useQuery({ queryKey: ["users"], queryFn: () => getUsers(), retry: 0, refetchInterval: 10000 });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5,
  })


  const table = useReactTable({
    data: data ?? [],
    columns,
    rowCount: data?.length,
    getRowId: originalRow => originalRow.id.toString(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    }
  });

  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPagination(prev => ({
      pageIndex: newPage,
      pageSize: prev.pageSize
    }))
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({
      pageIndex: 0,
      pageSize: +event.target.value
    })
  };


  return (
    <>
      {
        isPending &&
        <Loader open={true} />
      }

      <Box
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
          display: "flex",
          justifyContent: "center"
        }}
      >
        <SearchInput 
          onChange={
            (e) => table.setGlobalFilter(e.target.value.toString())
          }
          placeholder={t("view.users.table.search")}
        />
      </Box>

      <Paper>
      <TableContainer
        sx={{ maxHeight: "574px"}}
      >
        <Table stickyHeader>
          <TableHead>
            {
              table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id} >
                  {
                    headerGroup.headers.map(header => {
                      console.log(header.column.columnDef.header)
                      return (
                      <TableCell key={header.id}>
                        {
                          flexRender(
                            t(header.column.columnDef.header as LangKeys),
                            header.getContext()
                          )
                        }
                      </TableCell>)
                    })
                  }
                </TableRow>
              ))
            }
          </TableHead>

          <TableBody>
            {
              table.getRowModel().rows.map(row => (
                <TableRow 
                  hover 
                  key={row.id}
                  onClick={() => navigate({ to: "/manage/users/view/$userId", params: { userId: row.id } })}
                >
                  {
                    row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        }
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data?.length ?? 0}
        rowsPerPage={pagination.pageSize}
        page={pagination.pageIndex}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={t("table.rowsPerPage")}
      />
      </Paper>

    </>
  );

}