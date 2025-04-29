import { Column } from "@tanstack/react-table";
import { Ticket } from "../types/data-types";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  column: Column<Ticket, unknown>;
  selectValues: object;
};

export const TableHeadFilter = ({ label, column, selectValues }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="pl-0">
          {label} <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.values(selectValues).map((val) => {
          return (
            <DropdownMenuCheckboxItem
              key={val}
              className="capitalize"
              checked={((column.getFilterValue() as string[]) ?? []).includes(val)}
              onCheckedChange={(select) => {
                const currentFilterValue = column.getFilterValue() ?? [];
                if (select) {
                  column.setFilterValue([val, ...(currentFilterValue as [])]);
                } else {
                  column.setFilterValue((currentFilterValue as []).filter((fv) => fv != val));
                }
              }}
            >
              {val}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
