import { useFormContext } from "@/global-form/hooks/form-context";
import { Box, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { useStore } from "@tanstack/react-form";
import type { RentalSalePosition } from "../table/useRentalSaleTable";
import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";

export function Summary() {
  const { t } = useTranslationContext();
  const form = useFormContext();
  const positions: RentalSalePosition[] = useStore(form.store, state => state.values.positions);
  let priceSum = 0;
  let discountSum = 0;
  let chargeSum = 0;

  positions.forEach((p) => {
    priceSum += p.price;
    discountSum += Number(p.discount);
    chargeSum += p.charge;
  });

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell rowSpan={3} colSpan={2} sx={{ width: '100%' }} />
              <TableCell sx={{ minWidth: "200px" }}>{ t("rentalService.sale.form.summary.subtotal") }</TableCell>
              <TableCell sx={{ paddingRight: "30px" }} align="right">{priceSum}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ minWidth: "200px" }}>{ t("rentalService.sale.form.summary.discount") }</TableCell>
              <TableCell sx={{ paddingRight: "30px" }} align="right">{-discountSum}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell sx={{ minWidth: "200px", fontWeight: 'bold' }}>{ t("rentalService.sale.form.summary.total") }</TableCell>
              <TableCell sx={{ paddingRight: "30px", fontWeight: 'bold' }} align="right">{chargeSum}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}