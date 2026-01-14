import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable, type Row } from '@tanstack/react-table';
import { useState } from 'react';
import { SearchInput } from '../general/SearchInput';
import { useTranslationContext } from '@/routes/-context-api/translation/TranslationContext';
import type { LangKeys } from '@/routes/-context-api/translation/TranslationProvider';


type CustomTableProps<K> = {
  columns: any;
  data: K[];
  rowsPerPageOptions: number[];
  onRowClick: (row: Row<K>) => void;
}

type Data = {
  id: number;
  [key: string]: unknown;
}

export function CustomTable<T extends Data>({ columns, data, rowsPerPageOptions, onRowClick }: CustomTableProps<T>) {
  const { t } = useTranslationContext();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: rowsPerPageOptions[0],
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
          placeholder={t("view.table.search")}
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
                    onClick={() => onRowClick(row)}
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
          rowsPerPageOptions={rowsPerPageOptions}
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