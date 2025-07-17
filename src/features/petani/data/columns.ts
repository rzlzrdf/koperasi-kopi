import { ColumnDef, RowData } from "@tanstack/react-table";
import { Petani } from "../components/column";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterKey?: keyof TData;
    filterVariant?: "text" | "number";
  }
}

export const USER_COLUMNS: ColumnDef<Petani>[] = [
  
];