import { Action, combineReducers, Reducer } from 'redux';
import { TableType } from './components/Table';

export const timerMs = 10;
const numRows = 50;
const numColumns = 50;
const randomizer = 0.8;
const nearOps = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
]

const generateTable = (empty: boolean): TableType => {
  const rows = [];
  for (let r = 0; r < numRows; r++) {
    rows.push(Array.from(Array(numColumns), () => empty ? 0 : Math.random() >= randomizer ? 1 : 0));
  }
  return rows;
}

export const generateNextGen = ( table: TableType ): TableType => {
  const newTable: TableType = JSON.parse(JSON.stringify(table));
  const rowsCount = newTable.length;
  const colsCount = newTable[0]?.length ?? 0;
  for (let r = 0; r < rowsCount; r++) {
    for (let c = 0; c < colsCount; c++) {
      let nearCount = 0;
      nearOps.forEach(([x, y]) => {
        const newR = r + x;
        const newC = c + y;
        if (newR >= 0 && newC >= 0 && newR < rowsCount && newC < colsCount) {
          nearCount += table[newR][newC];
        }
      })
      if (nearCount < 2 || nearCount > 3) {
        newTable[r][c] = 0;
      } else if (table[r][c] === 0 && nearCount === 3) {
        newTable[r][c] = 1;
      }
    }
  };
  return newTable;
}

//Actions
export const GENERATE = "GENERATE";
export const CLEAR = "CLEAR";
export const START = "START";
export const STOP = "STOP";
export const NEXT_GENERATION = "NEXT_GENERATION";

//Reducers
const initialState = {
  table: generateTable(false),
  running: false
};

const table: Reducer<TableType> = (state = initialState.table, action: Action) => {
  switch (action.type) {
    case GENERATE:
      return generateTable(false);
    case CLEAR:
      return generateTable(true);
    case NEXT_GENERATION:
      return generateNextGen(state);
    default:
      return state;
  }
};

//Running reducer
const running: Reducer<boolean> = (state = initialState.running, action: Action) => {
  switch (action.type) {
    case CLEAR:
      return false;
    case START:
      return true;
    case STOP:
      return false;
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  table,
  running
});