import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { textEllipsisMiddle } from "@takeda4dcs/text-ellipsis";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";
import { OfferTypeVales, Ticket, TicketStatusVales } from "../types/data-types";
import { ContentCopyButton } from "@/components/content-copy-button";
import { StatusBudge } from "@/components/status-budge";
import { TableHeadFilter } from "@/components/th-filter";

export const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: "ticketId",
    header: "チケットID",
    cell: ({ row }) => {
      const ticket = row.original;
      return <>{ticket.ticketId}</>;
    },
  },
  {
    accessorKey: "holder",
    header: "所有者",
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <>
          {textEllipsisMiddle(ticket.holder, 12)}
          <ContentCopyButton text={ticket.holder} />
        </>
      );
    },
  },
  {
    accessorKey: "issuer",
    header: "発行者",
    cell: ({ row }) => {
      const ticket = row.original;
      return (
        <>
          {textEllipsisMiddle(ticket.issuer, 12)}
          <ContentCopyButton text={ticket.issuer} />
        </>
      );
    },
  },
  {
    accessorKey: "offerType",
    header: ({ column }) => {
      return (
        <>
          <TableHeadFilter label={"種別"} column={column} selectValues={OfferTypeVales} />
        </>
      );
    },
    enableGlobalFilter: false,
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <>
          <TableHeadFilter label={"ステータス"} column={column} selectValues={TicketStatusVales} />
        </>
      );
    },
    enableGlobalFilter: false,
    filterFn: "arrIncludesSome",
    cell: ({ row }) => {
      const ticket = row.original;
      return <StatusBudge status={ticket.status} />;
    },
  },
  {
    accessorKey: "summary",
    header: "内容",
    enableGlobalFilter: false,
  },
  {
    accessorKey: "dateOffered",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          委託日
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;
      return ticket.dateOffered
        ? format(new Date(ticket.dateOffered), "yyyy/MM/dd HH:mm", {
            locale: ja,
          })
        : "―";
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: "dateCompleted",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          完了日
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const ticket = row.original;
      return ticket.dateCompleted
        ? format(new Date(ticket.dateCompleted), "yyyy/MM/dd HH:mm", {
            locale: ja,
          })
        : "―";
    },
    enableGlobalFilter: false,
  },
];
