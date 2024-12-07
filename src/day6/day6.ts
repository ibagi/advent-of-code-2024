import { type Coordinates, Grid } from '../common/grid';
import { readByLine } from '../common/input';

const directionVectors: Record<string, Coordinates> = {
  '^': [0, -1],
  '>': [1, 0],
  'v': [0, 1],
  '<': [-1, 0],
};

function findStartPos(grid: Grid) {
  for (const pos of grid) {
    const [x, y] = pos;
    const node = grid.valueAt(x, y);

    if (Object.keys(directionVectors).includes(node!)) {
      return pos;
    }
  }
}

async function partOne() {
  const grid = new Grid(await readByLine());
  const visited = new Set<string>();
  const startPos = findStartPos(grid)!;

  let [x, y] = startPos;
  let direction = grid.valueAt(startPos[0], startPos[1])!;

  while (true) {
    const node = grid.valueAt(x, y);
    if (!node) {
      break;
    }

    const dir = directionVectors[direction];
    if (grid.valueAt(x + dir[0], y + dir[1]) === '#') {
      switch (direction) {
        case '^':
          direction = '>';
          break;
        case '>':
          direction = 'v';
          break;
        case 'v':
          direction = '<';
          break;
        case '<':
          direction = '^';
          break;
      }
    }

    const [dx, dy] = directionVectors[direction];
    visited.add(`${x},${y}`);

    x += dx;
    y += dy;
  }

  return [...visited].length;
}

console.log(await partOne());
