import { Badge } from "@/components/ui/badge";
import { TicketStatusVales } from "../types/data-types";

type Props = {
  status: string;
};

export const StatusBudge = ({ status }: Props) => {
  switch (status) {
    case TicketStatusVales.ToDo:
      return <Badge variant="outline">{status}</Badge>;
    case TicketStatusVales.InProgress:
      return (
        <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
          {status}
        </Badge>
      );
    case TicketStatusVales.Complete:
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 dark:text-green-300 dark:text-green-300">
          {status}
        </Badge>
      );
  }
};
