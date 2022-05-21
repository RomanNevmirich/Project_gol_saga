import React from "react";
import { Cell } from '../Cell';

export type TableType = (0|1)[][];

export type TableObject = {
    table: TableType;
};

export const Table = ( { table }: TableObject ) => {
  //console.log(table);
  return <div style={{display: 'grid', gridTemplateColumns: `repeat(${table[0]?.length ?? 0}, 12px)`}}>
    {table.map((rows, i) => rows.map(
      (col, j) => 
        <Cell key={`${i}|${j}`} value={table[i][j]}/>
      )
    )}
  </div>
};