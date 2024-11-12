import { Document } from "mongoose";

type IGame = {
  owner: string;
  guest: string;

  createdAt: Date;

  settings: string;
  history: string;

  turnSymbol: 'X' | 'O';
  isFinished: null | 'X' | 'O';
  finishedIndexes: string | null;
  position: string;

  maxTurnCount: number;
  turnCount: number;
}

type IGameDocument = IGame & Document
export type { IGameDocument };
export default IGame;
