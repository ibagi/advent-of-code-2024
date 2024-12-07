import { type Coordinates, Grid } from '../common/grid';
import { readByLine } from '../common/input';

type Direction = [number, number];

const directions: Direction[] = [
  [0, 1],
  [0, -1],
  [1, 0],
  [1, 1],
  [1, -1],
  [-1, 0],
  [-1, 1],
  [-1, -1],
];

function doSearch(
  grid: Grid,
  coord: Coordinates,
  dir: Direction,
  searchWord: string,
) {
  const [x, y] = coord;
  const [dX, dY] = dir;

  for (let i = 0; i < searchWord.length; i++) {
    if (searchWord[i] !== grid.valueAt(x + (i * dX), y + (i * dY))) {
      return false;
    }
  }

  return true;
}

async function partOne() {
  const searchWord = 'XMAS';
  const grid = new Grid(await readByLine());

  return grid.toArray()
    .reduce((result, pos) =>
      result + directions
        .filter((dir) => doSearch(grid, pos, dir, searchWord)).length, 0);
}

async function partTwo() {
  const crossPatterns = ['SMSM', 'MSMS'];
  const grid = new Grid(await readByLine());

  return grid.toArray()
    .filter(([x, y]) => grid.valueAt(x, y) === 'A')
    .reduce((result, [x, y]) => {
      const { topLeft, topRight, bottomLeft, bottomRight } = grid.neighbours(
        x,
        y,
      );
      const horizontalPattern = [topLeft, topRight, bottomLeft, bottomRight]
        .join('');
      const verticalPattern = [topLeft, bottomLeft, topRight, bottomRight].join(
        '',
      );
      const patternFound = crossPatterns.includes(horizontalPattern) ||
        crossPatterns.includes(verticalPattern);
      return result + (patternFound ? 1 : 0);
    }, 0);
}

console.log(await partOne());
console.log(await partTwo());
