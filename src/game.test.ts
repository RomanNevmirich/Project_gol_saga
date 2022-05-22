import { TableType } from './components/Table';
import { GENERATE, NEXT_GENERATION, CLEAR, START, STOP, initialState, table, running, generateNextGen, generateTable, numRows, numColumns } from './game';

describe('game', () => {
    it('empty table', () => {
        const tab: TableType = [];
        for (let r = 0; r < numRows; r++) {
            tab.push(Array.from(Array(numColumns), () => 0));
        }
        expect(generateTable(true)).toEqual(tab);
    })

    it('next table', () => {
      const tab: TableType = [[1, 0, 0],
                              [0, 1, 1],
                              [1, 1, 0]];
      const nextGen: TableType = [[0, 1, 0],
                                  [0, 0, 1],
                                  [1, 1, 1]];
      expect(generateNextGen(tab)).toEqual(nextGen);
  })

  const getCount = (tab: number[][]) => {
    return tab.reduce(
      (start, row) => start + row.reduce((startcell, col) => startcell + col, 0),
      0
    );
  }

  it("table reducer", () => {
    let anyTable: TableType = table(initialState.table, {type: GENERATE});
    expect(getCount(anyTable)).toBeGreaterThan(0);

    anyTable = table(initialState.table, {type: CLEAR});
    expect(getCount(anyTable)).toEqual(0);

    const tab: TableType = [[1, 0, 0],
                              [0, 1, 1],
                              [1, 1, 0]];
    const nextGen: TableType = [[0, 1, 0],
                                [0, 0, 1],
                                [1, 1, 1]];
    anyTable = table(tab, {type: NEXT_GENERATION, state: tab});
    expect(anyTable).toEqual(nextGen);
  });

  it("running reducer", () => {
    let check: boolean = running(initialState.running, {type: START});
    expect(check).toBeTruthy;

    check = running(true, {type: CLEAR});
    expect(check).toBeFalsy;

    check = running(true, {type: STOP});
    expect(check).toBeFalsy;
  });

});