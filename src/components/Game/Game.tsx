import React from "react";
import { Table, TableType } from '../Table';
import { Button } from '../../stories/Button';

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
    <Button label={data.running ? "Stop" : "Start"} onClick={data.running ? data.stop : data.start} primary size="small" />
    <Button label="Clear" onClick={data.clear} primary size="small" />
    <Button label="Generate" onClick={data.generate} primary size="small" />
    <Table table={data.table} />
  </div>
);