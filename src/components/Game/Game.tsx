import React from "react";
import { Table, TableType } from '../Table';

type ActionExecutor = () => void;

type GameParams = {
  table: TableType,
  running: boolean,
  start: ActionExecutor,
  stop: ActionExecutor,
  generate: ActionExecutor,
  clear: ActionExecutor
}

export const Game = (data: GameParams
) => (
  <div>
    <button onClick={data.running ? data.stop : data.start}>
      {data.running ? "stop" : "start"}
    </button>
    <button onClick={data.clear}>clear</button>
    <button onClick={data.generate}>generate</button>
    <Table table={data.table} />
  </div>
);