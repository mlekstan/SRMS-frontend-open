import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { apiGet } from "@/api/apiGet";
import type { Card, Client } from "@/api/types";
import AddIcon from '@mui/icons-material/Add';
import ReturnedIcon from '@mui/icons-material/CreditScore';
import RemoveIcon from '@mui/icons-material/Remove';
import TableAutocomplete from "./TableAutocomplete";
import { useEffect, useState } from "react";
import { useFieldContext } from "@/global-form/hooks/form-context";
import type { LangKeys } from "@/routes/-context-api/translation/TranslationProvider";
import { TableTextField } from "./TableTextField";
import { useTranslationContext } from "@/routes/-context-api/translation/TranslationContext";
import boolOptions from "@/assets/data/bool.json";


type RowDataType = {
  card: Partial<Card>;
  type: "added" | "fetched";
  isReturned: boolean;
  errors: {
    barcode: boolean;
    isTemp: boolean;
  };
}

const columnsTitles: LangKeys[] = [
  "edit.client.table.column.barcode",
  "edit.client.table.column.isTemp",
  "edit.client.table.column.isReturned",
];


export function EditClientCardsTable() {
  const params = useParams({ from: "/_app/manage/_layout/(clients)/clients/view/$clientId" });
  const field = useFieldContext();
  const { t } = useTranslationContext();
  const [rows, setRows] = useState<Array<RowDataType>>(Array());
  const [addedRows, setAddedRows] = useState(Array());
  
  const clientQuery = useQuery({ 
    queryKey: ["client", params.clientId], 
    queryFn: () => apiGet<Client>({ url: "/clients", id: params.clientId }),
    staleTime: 10 * 1000
  });
  const activeCardsQuery = useQuery({
    queryKey: ["cards", { issued: false }],
    queryFn: () => apiGet<Card>({ url: "/cards", searchParams: { issued: "false" } }),
    staleTime: 10 * 1000
  });

  
  useEffect(() => {
    setRows((prev) => {
      let fetchedRows = Array();
      if (clientQuery.data) {
        fetchedRows = clientQuery.data.clientCards.map((clientCard) => {
          return (
            {
              card: clientCard.card,
              type: "fetched" as const,
              isReturned: prev.find((row) => row.card.id === clientCard.card.id)?.isReturned ?? false,
            }
          );
        });
      }

      const addedRows = prev.filter((row) => row.type === "added");
        
      return [...fetchedRows, ...addedRows];
    });
  }, [clientQuery.data]);

  useEffect(() => {
    setAddedRows(rows.filter(row => row.type === "added"));
    field.setValue(rows);
  }, [rows]);
  
  useEffect(() => {
    let isError = false
    rows.forEach((row) => {
      if (row.errors) {
        if (row.errors.isTemp === true || row.errors.barcode === true) {
          isError = true;
        }
      }    
    });
    
    isError ? field.setErrorMap({ onSubmit: "validation.empty" }) : field.setErrorMap({ onSubmit: undefined });
  }, [rows]);

  return (
    <>
      {
        (
          (clientQuery.data && clientQuery.isSuccess) &&
          (activeCardsQuery.data && activeCardsQuery.isSuccess)
        ) &&
        <Paper>
          <TableContainer
            sx={{ maxHeight: "574px"}}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {
                    columnsTitles.map((title, idx) => (
                      <TableCell key={idx} align="center">
                        { t(title) }
                      </TableCell>
                    ))
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  rows.map((row, idx) => (
                    <TableRow hover key={idx}>
                      <TableCell
                        align="center"
                      >
                        {
                          (row.type === "added") ?
                          <TableAutocomplete 
                            options={activeCardsQuery.data}
                            placeholder="registration.client.form.card.barcode"
                            onChange={(value) => {
                              setRows((prev) => {
                                const _prev = [...prev];
                                _prev[idx].card.id = value ? Number(value) : undefined;
                                return _prev;
                              });
                            }}
                            optionLabel="barcode"
                            optionValue="id"
                            error={rows[idx].card.id ? false : true}
                            errorMessage="validation.empty"
                            setError={(isError) => setRows((prev) => {
                              const _prev = structuredClone(prev);
                              _prev[idx].errors.barcode = isError;
                              return _prev;
                            })}
                          /> :
                          <TableTextField
                            label={t("edit.client.table.column.barcode")}
                            value={row.card.barcode as string}
                          />
                        }
                      </TableCell>
                      <TableCell
                        align="center"
                      >
                        {
                          (row.type === "added") ?
                          <TableAutocomplete 
                            options={boolOptions}
                            placeholder="registration.client.form.card.isTemp"
                            onChange={(value) => 
                              setRows((prev) => {
                                const _prev = [...prev];
                                _prev[idx].card.isTemp = value;
                                return _prev;
                              })
                            }
                            optionLabel="label"
                            optionValue="value"
                            error={
                              (
                                (rows[idx].card.isTemp === null) ||
                                (rows[idx].card.isTemp === undefined)
                              ) ? 
                              true : false
                            }
                            errorMessage="validation.empty"
                            setError={(isError) => setRows((prev) => {
                              const _prev = structuredClone(prev);
                              _prev[idx].errors.isTemp = isError;
                              return _prev;
                            })}
                          /> :
                          <TableTextField
                            label={t("edit.client.table.column.isTemp")}
                            value={row.card.isTemp as boolean}
                            options={boolOptions}
                          />
                        }
                      </TableCell>
                      <TableCell
                        align="center"
                      >
                        {
                          (row.type === "fetched") &&
                          <IconButton 
                            onClick={() => 
                              setRows((prev) => {
                                const _prev = structuredClone(prev);
                                _prev[idx].isReturned = !_prev[idx].isReturned;
                                return _prev;
                              })
                            }
                          >
                            <ReturnedIcon 
                              color={
                                (rows[idx].isReturned === true) ? "error" : undefined
                              }
                            />
                          </IconButton>
                        }
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton 
                size="large"
                onClick={
                  () => {
                    setRows((prev) => {
                      const _prev = [...prev];
                      _prev.push({
                        card: {},
                        type: "added",
                        isReturned: false,
                        errors: {
                          barcode: false,
                          isTemp: false,
                        }
                      });
                      return _prev;
                    });
                  }
                }
              >
                <AddIcon />
              </IconButton>

              {
                (addedRows.length > 0) &&
                <IconButton
                  size="large"
                  onClick={
                    () => {
                      setRows((prev) => {
                        const _prev = [...prev];
                        _prev.pop();
                        return _prev;
                      })
                    }
                  }
                >
                  <RemoveIcon />
                </IconButton>
              }
            </Box>
          </TableContainer>
        </Paper> 
      }    
    </>
  );
}