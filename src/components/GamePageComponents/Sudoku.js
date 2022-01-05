import { getSudoku } from "./SudokuSolver";

let BLANK_BOARD = [ '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0',
                  '0', '0', '0', '0', '0', '0', '0', '0', '0' ];

//Gets the coordinates of the box center
/* Array 9 x 9 = 81 elements
Box is Array 3 x 3 
[Box1][Box2][Box3]
[Box4][Box5][Box6]
[Box7][Box8][Box9]
*/
function GetBoxCenter(box) {
  switch(box) {
    case 0: return [1,1]; //box number 1 (row->1,column->1)
    case 1: return [1,4]; //box number 2 (row->1,column->4)
    case 2: return [1,7]; //box number 3 (row->1,column->7)
    case 3: return [4,1]; //box number 4 (row->4,column->1)
    case 4: return [4,4]; //box number 5 (row->4,column->4)
    case 5: return [4,7]; //box number 6 (row->4,column->7)
    case 6: return [7,1]; //box number 7 (row->7,column->1)
    case 7: return [7,4]; //box number 8 (row->7,column->4)
    default: return [7,7]; //box number 9 (row->7,column->7)
  }
}
// Gets the index of cell given: 1. Box 2. Cell
/* [Box]=[cell1 cell2 cell 3
          cell4 cell5 cell 6
          cell7 cell8 cell 9
        ] 
  cell5 is the box center
*/
function GetIndexOfCell(box, cell) {
  let [row, column] = GetBoxCenter(box)
  // eslint-disable-next-line
  switch(cell) {
    case 0: {row--; column--; break;} //cell number 1 
    case 1: {row--; break;} //cell number 2 
    case 2: {row--; column++; break;} //cell number 3 
    case 3: {column--; break;} //cell number 4 
    case 4: {break;} //cell number 5 
    case 5: {column++; break;} //cell number 6 
    case 6: {row++; column--; break;} //cell number 7 
    case 7: {row++; break;} //cell number 8 
    case 8: {row++; column++; break;} //cell number 9 
  }
  return row * 9 + column;
}
//Checks if Cell is available (empty) or not (filled)
function CellAvailable(InitArray, box, value) {
  return InitArray[GetIndexOfCell(box, value)] === '0' ? 0 : 1;
}
//Generates a Unique Sudoku puzzle from a solved Sudoku.
function SudokuSolution(solvedArray, difficulty, e) {
  let minimumCells, maximumCells, totalCells, box, cell;
  let InitArray = BLANK_BOARD.slice();
  let boxCounts = [ 0,0,0,
                    0,0,0,
                    0,0,0 ];
  let boxesAvailable = [];
  let cellsAvailable = [];
  if (e) difficulty = e.target.value;
  if (difficulty === 'Easy') {
    minimumCells = 3;
    maximumCells = 7;
    totalCells = 50;
  }
  else if (difficulty === 'Medium') {
    minimumCells = 2;
    maximumCells = 6;
    totalCells = 40;
  }
  else {
    minimumCells = 1;
    maximumCells = 5;
    totalCells = 30;
  }
  for (let j = 0; j < 9; j++) {
    boxCounts[j] =  CellAvailable(InitArray, j, 0) +
                    CellAvailable(InitArray, j, 1) +
                    CellAvailable(InitArray, j, 2) +
                    CellAvailable(InitArray, j, 3) +
                    CellAvailable(InitArray, j, 4) +
                    CellAvailable(InitArray, j, 5) +
                    CellAvailable(InitArray, j, 6) +
                    CellAvailable(InitArray, j, 7) +
                    CellAvailable(InitArray, j, 8);
  }
  for (let i = 0; i < totalCells; i++) {
    boxesAvailable = [];
    for (let j = 0; j < 9; j++) {
      if (boxCounts[j] < minimumCells) {
        boxesAvailable.push(j);
      }
    }
    if (boxesAvailable) {
      for (let j = 0; j < 9; j++) {
        if (boxCounts[j] < maximumCells) {
          boxesAvailable.push(j);
        }
      }
    }
    box = boxesAvailable[Math.random() * boxesAvailable.length | 0];
    cellsAvailable = [];
    for (let j = 0; j < 9; j++) {
      if ( InitArray[GetIndexOfCell(box, j)] === '0') {
        cellsAvailable.push(j);
      }
    }
    cell = cellsAvailable[Math.random() * cellsAvailable.length | 0];
    let index = GetIndexOfCell(box, cell);
    InitArray[index] = solvedArray[index]
    boxCounts[box]++;
  }
  return InitArray;
}

export const getNewSudoku = (difficulty, e) => {
  let InitialState = BLANK_BOARD.slice(); //New Sudoku 
  let FinalState = BLANK_BOARD.slice(); //Sudoku Solution
  let sudoku = getSudoku();//get sudoku from sudoku solver
  let str = sudoku.generate(60);
  [...str].forEach((value, index) => {
    InitialState[index] = value === '.' //if cell is empty(.)=>put 0 else put the cell value
                        ? '0'
                        : value;
  });
  str = sudoku.solve(str);//get sudoku solution from sudoku solver
  [...str].forEach((value, index) => {
    FinalState[index] = value;
  });
  InitialState = SudokuSolution(FinalState, difficulty, e);
  return [InitialState, FinalState];
}