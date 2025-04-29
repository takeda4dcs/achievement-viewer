export type Ticket = {
  ticketId: string;
  parentTicket?: string;
  holder: string;
  issuer: string;
  offerType: string;
  status: TicketStatus;
  summary: string;
  dateOffered: number;
  dateCompleted: number;
};

export const TicketStatusVales = {
  Complete: "Complete",
  InProgress: "InProgress",
  ToDo: "ToDo",
} as const;

// type TicketStatus = 'Complete' | 'InProgress' | 'ToDo'
export type TicketStatus = (typeof TicketStatusVales)[keyof typeof TicketStatusVales];

export const OfferTypeVales = {
  Mission: "Mission",
  Epic: "Epic",
  Backlog: "Backlog",
  Task: "Task",
} as const;

// type OfferType = 'Mission' | 'Epic' | 'Backlog' | 'Task'
export type OfferType = (typeof OfferTypeVales)[keyof typeof OfferTypeVales];
