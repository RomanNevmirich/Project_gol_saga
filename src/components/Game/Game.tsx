import React from "react";
import { Table, TableType } from '../Table';
import { Button } from '../Button';

type ActionExecutor = () => void;

export type GameParams = {
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
    <Button id='go' label={data.running ? 'Остановить' : 'Запустить'} onClick={data.running ? data.stop : data.start} primary size='small' />
    <Button id='clear' label='Очистить поле' onClick={data.clear} primary size='small' />
    <Button id='generate' label='Сгенерировать' onClick={data.generate} primary size='small' />
    <Table table={data.table} />
  </div>
);