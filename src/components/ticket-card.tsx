import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";
import { Ticket } from "../types/data-types";
import { StatusBudge } from "./status-budge";
import { Button } from "@/components/ui/button";

type Props = {
  ticket: Ticket;
  setUpTicketDetailDialog: (target: string) => void;
};

export const TicketCard = ({ ticket, setUpTicketDetailDialog }: Props) => {
  return (
    <div id="ticket_card" data-offer-type={ticket!.offerType.toLowerCase()}>
      <dl className="grid grid-cols-5 text-base">
        {ticket!.parentTicket ? (
          <>
            <dt className="col-span-1 py-1.5">
              <Button
                onClick={() => {
                  setUpTicketDetailDialog(ticket!.parentTicket!);
                }}
                tabIndex={-1}
              >
                上位チケット
              </Button>
            </dt>
            <dd className="col-span-4 py-1.5 break-all"></dd>
          </>
        ) : (
          <></>
        )}
        <dt className="col-span-1 py-1.5">種別</dt>
        <dd className="col-span-4 py-1.5 break-all">{ticket?.offerType}</dd>
        <dt className="col-span-1 py-1.5">発行者</dt>
        <dd className="col-span-4 py-1.5 break-all">{ticket?.issuer}</dd>
        {ticket?.dateOffered ? (
          <>
            <dt className="col-span-1 py-1.5">委託日</dt>
            <dd className="col-span-4 py-1.5 break-all">
              {format(new Date(ticket?.dateOffered), "yyyy/MM/dd HH:mm", {
                locale: ja,
              })}
            </dd>
          </>
        ) : (
          <></>
        )}
        <dt className="col-span-1 py-1.5">所有者</dt>
        <dd className="col-span-4 py-1.5 break-all">{ticket?.holder}</dd>
        <dt className="col-span-1 py-1.5">ステータス</dt>
        <dd className="col-span-4 py-1.5 break-all">
          <StatusBudge status={ticket!.status!} />
        </dd>
        {ticket?.dateCompleted ? (
          <>
            <dt className="col-span-1 py-1.5">完了日</dt>
            <dd className="col-span-4 py-1.5 break-all">
              {format(new Date(ticket?.dateCompleted), "yyyy/MM/dd HH:mm", {
                locale: ja,
              })}
            </dd>
          </>
        ) : (
          <></>
        )}
      </dl>
    </div>
  );
};
