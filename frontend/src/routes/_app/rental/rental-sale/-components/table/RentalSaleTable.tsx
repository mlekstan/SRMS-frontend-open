import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import { useFormContext } from "@/global-form/hooks/form-context";
import { useRentalSaleTable } from "./useRentalSaleTable";
import { initialPositionsData } from "../form/RentalSaleForm";


export function RentalSaleTable() {
  const form = useFormContext();
  const table = useRentalSaleTable(form, initialPositionsData);

  return (
    <TableContainer sx={{ height: "100%" }}>
      <Table stickyHeader>
        <TableHead>
          {
            table.getHeaderGroups().map(group => (
              <TableRow key={group.id}>
                {
                  group.headers.map(header => (
                    <TableCell key={header.id}>
                      { 
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      }
                    </TableCell>
                  ))
                }
              </TableRow>
            )) 
          }
        </TableHead>
        <TableBody>
          <form.AppField name="positions" mode="array">
            {
              () => table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
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
          </form.AppField>
        </TableBody>
      </Table>
    </TableContainer>
  );
}