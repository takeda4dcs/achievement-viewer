import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Table as TableIF, flexRender } from "@tanstack/react-table";
import { Ticket } from "../types/data-types";

type Props = {
  table: TableIF<Ticket>;
  callback: (e: React.MouseEvent<HTMLTableRowElement>) => void;
};

export const TableUnit = ({ table, callback }: Props) => {
  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => {
          let ticketId;
          row.getAllCells().forEach((cell) => {
            if (cell.column.id === "ticketId") {
              ticketId = cell.getContext().getValue();
            }
          });
          return (
            <TableRow
              key={row.id}
              onClick={(e) => {
                callback(e);
              }}
              data-ticket-id={ticketId}
            >
              {row.getVisibleCells().map((cell) => {
                return <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>;
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
