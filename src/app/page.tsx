"use client";
import { badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { ApiPromise } from "@polkadot/api";
import { getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineArrowPath } from "react-icons/hi2";
import { columns } from "../components/column-def";
import { ContentCopyButton } from "../components/content-copy-button";
import { TableUnit } from "../components/table-unit";
import { TicketCard } from "../components/ticket-card";
import { connectToContract } from "../hooks/connect";
import { getTickets } from "../hooks/ticket-information";
import { OfferTypeVales, Ticket, TicketStatusVales } from "../types/data-types";
import { Modes, ModesValues } from "../types/mode-types";

export default function Home() {
  const [api, setApi] = useState<ApiPromise>();

  const [isSetup, setIsSetup] = useState(false);

  const [ticketData, setTicketData] = useState<Map<string, Ticket> | null>();
  const setUpTicketDetailDialog = (target: string) => {
    console.log(ticketData!.get(target));
    setPickedUpTicket(ticketData!.get(target));
  };
  const [targetData, setTargetData] = useState<Ticket[] | null>();

  const [pickedUpTicket, setPickedUpTicket] = useState<Ticket>();

  useEffect(() => {
    connectToContract().then((connectInstance) => {
      setApi(connectInstance.api);
      setIsSetup(connectInstance.isSetup);
      getTickets(connectInstance.api!).then((tickets) => {
        setTicketData(tickets!);
        setTargetData(makeTargetData(tickets!));
      });
    });
  }, []);

  const table = useReactTable<Ticket>({
    columns,
    data: targetData ? targetData : [],
    initialState: {
      columnFilters: [
        { id: "offerType", value: Object.values(OfferTypeVales) },
        { id: "status", value: Object.values(TicketStatusVales) },
      ],
      columnVisibility: {
        ticketId: false,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const fetchData = async () => {
    setIsSetup(false);
    getTickets(api!)
      .then((tickets) => {
        setTicketData(tickets!);
        setTargetData(makeTargetData(tickets!));
      })
      .finally(() => setIsSetup(true));
  };

  const makeTargetData = (origin: Map<string, Ticket>) => Array.from(origin.values());

  const changeMode = (mode: Modes) => {
    document.getElementById("primary_container")?.setAttribute("class", mode);
  };

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS : "";

  return (
    <div id="primary_container" className="thicket_list">
      <header className="fixed w-full">
        <span className="absolute">Connecting to {process.env.NEXT_PUBLIC_CHAIN}</span>
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1"></div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link
              className={badgeVariants({ variant: "secondary" }) + " hidden " + ModesValues.discription}
              onClick={() => changeMode(ModesValues.thicket_list)}
              href={""}
            >
              アプリに戻る
            </Link>
            <Link
              className={badgeVariants({ variant: "secondary" }) + " hidden " + ModesValues.thicket_list}
              onClick={() => changeMode(ModesValues.discription)}
              href={""}
            >
              これは何？
            </Link>
          </div>
          <div className="flex lg:flex-1 lg:justify-end"></div>
        </nav>
      </header>
      <main className={"hidden min-h-screen items-center justify-between p-20 " + ModesValues.thicket_list}>
        <div className="w-full text-center min-h-20 inline-flex items-center justify-center">
          <div>
            <Button variant="outline" onClick={async () => fetchData()} className={isSetup ? "" : "hidden"}>
              <HiOutlineArrowPath /> データを最新化
            </Button>
            <Spinner show={!isSetup}>Loading...</Spinner>
          </div>
        </div>
        <div>
          <div className="flex items-center py-4">
            <Input
              placeholder="所有者 or 発行者でフィルター"
              onChange={(event) => table.setGlobalFilter(event.target.value)}
              className="max-w-sm"
            />
          </div>

          <div className="rounded-md border ticket-list-wrapper overflow-hidden">
            <TableUnit
              table={table}
              callback={(e) => {
                setUpTicketDetailDialog(e.currentTarget.getAttribute("data-ticket-id")!);
                (document.querySelector("#dialog_trigger")! as HTMLElement).click();
                (document.querySelector("body")! as HTMLElement).focus();
              }}
            />
            <Dialog>
              <DialogTrigger id="dialog_trigger" className="hidden" />
              <DialogContent id="ticket_card_dialog" className="max-w-2xl" data-ticket-type="">
                <DialogHeader>
                  <DialogTitle className="text-xl border-b pb-2.5">{pickedUpTicket?.summary}</DialogTitle>
                  <DialogDescription>
                    <TicketCard ticket={pickedUpTicket!} setUpTicketDetailDialog={setUpTicketDetailDialog} />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
      <main
        id="discription"
        className={"hidden min-h-screen items-center justify-between p-20 " + ModesValues.discription}
      >
        <p className="text-center leading-8 pt-4">
          本アプリケーションは以下に記載するスマートコントラクトと対話するためのアプリケーションです。
        </p>
        <Table className="w-7/12 mx-auto">
          <TableBody>
            <TableRow>
              <TableHead>ブロックチェーン</TableHead>
              <TableCell>{process.env.NEXT_PUBLIC_CHAIN}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>チェーン詳細</TableHead>
              <TableCell>{process.env.NEXT_PUBLIC_CHAIN_DISCRIPTION}</TableCell>
            </TableRow>
            <TableRow>
              <TableHead>スマートコントラクト アドレス</TableHead>
              <TableCell>
                <ContentCopyButton text={contractAddress}>{contractAddress}</ContentCopyButton>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableHead>スマートコントラクト メタデータ</TableHead>
              <TableCell>
                <a href={process.env.NEXT_PUBLIC_METADATA_URL} target="_blank" rel="noopener noreferrer">
                  {process.env.NEXT_PUBLIC_METADATA_URL}
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
