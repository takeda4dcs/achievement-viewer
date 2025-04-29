import { ApiPromise } from "@polkadot/api";
import { ContractPromise } from "@polkadot/api-contract";
import type { WeightV2 } from "@polkadot/types/interfaces";
import { BN, BN_ONE } from "@polkadot/util";

import abi from "../../metadata.json";
import { Ticket } from "../types/data-types";

const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE);
const PROOFSIZE = new BN(1_000_000);

export async function getTickets(api: ApiPromise) {
  console.log(`api: ${api}`);
  console.log(`contractAddress: ${contractAddress}`);
  const contract = new ContractPromise(api!, abi, contractAddress);
  console.log(`contract: ${contract}`);
  if (contract !== null) {
    const { result, output } = await contract.query["workTicket::showTickets"](
      "",
      {
        gasLimit: api?.registry.createType("WeightV2", {
          refTime: MAX_CALL_WEIGHT,
          proofSize: PROOFSIZE,
        }) as unknown as WeightV2,
      },
      null,
      null,
    );

    console.log("result", result.isOk);
    console.log("output", output?.toHuman());
    const tickets = new Map<string, Ticket>();
    if (result.isOk) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const ticketData: [] = output?.toHuman()!["Ok"]!["Ok"];
      console.log("ticketData", ticketData);
      ticketData.forEach((d) => {
        const ticketId: string = d["ticketId"]["U32"];
        const parentTicketId = d["ticket"]["parent"] ? d["ticket"]["parent"]["U32"] : undefined;
        tickets.set(ticketId, {
          ticketId: ticketId,
          parentTicket: parentTicketId,
          holder: d["holder"],
          issuer: d["ticket"]["issuer"],
          offerType: d["ticket"]["offerType"],
          status: d["ticket"]["status"],
          summary: d["ticket"]["summary"],
          dateOffered: convertToNumber(d["ticket"]["dateOffered"]),
          dateCompleted: convertToNumber(d["ticket"]["dateCompleted"]),
        } as Ticket);
      });
      console.log("tickets", tickets);
    }
    return tickets;
  }
}

const convertToNumber = (unixtimeStr: string | null): number | null => {
  return unixtimeStr ? +unixtimeStr.replaceAll(",", "") : null;
};

// コントラクトアドレスをenvファイルから抽出
const contractAddress: string = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
