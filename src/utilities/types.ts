export type Toast = {
  id: string;
  number: number;
  name: string;
  date: Date;
  content: "Trash" | "Academic";
  rooms: number;
};

export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  lastToast: number;
};

export type Points = 15 | 10 | -5;

export type Buzz = {
  player: string;
  points: Points;
};

export type Question = {
  number: number;
  buzzes: Buzz[];
};

export type Scoresheet = {
  toast: string;
  room: number;
  writer: string;
  reader?: string;
  roster: string[];
  questions: Buzz[][];
};

export type Statline = {
  name: string;
  played: number;
  powers: number;
  gets: number;
  negs: number;
  written: number;
  read: number;
  tournaments?: number;
};

export type Statsheet = {
  writer: string;
  stats: Statline[];
};

export type HistStatline = {
  toast: string;
  stats: Statline;
};

export const points = (statline: Statline) =>
  15 * statline.powers +
  10 * statline.gets +
  -5 * statline.negs +
  10 * Math.min(statline.written, 20) +
  5 * Math.min(statline.read, 20);

export const ppg = (statline: Statline) =>
  statline.played > 0
    ? (15 * statline.powers + 10 * statline.gets + -5 * statline.negs) /
      (statline.played / 20)
    : 0;
