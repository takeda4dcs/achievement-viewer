export const ModesValues = {
  thicket_list: "thicket_list",
  discription: "discription",
} as const;

// type Modes = 'TiketList' | 'Discription'
export type Modes = (typeof ModesValues)[keyof typeof ModesValues];
