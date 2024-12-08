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

function facingObstacle(
  x: number,
  y: number,
  directionVector: Coordinates,
  obstacle?: Coordinates,
) {
  return obstacle &&
    obstacle[0] === (x + directionVector[0]) &&
    obstacle[1] === (y + directionVector[1]);
}

function turn(
  grid: Grid,
  x: number,
  y: number,
  direction: string,
  obstacle?: Coordinates,
) {
  let newDirection = direction;
  let dir = directionVectors[direction];

  while (
    grid.valueAt(x + dir[0], y + dir[1]) === '#' ||
    facingObstacle(x, y, dir, obstacle)
  ) {
    switch (newDirection) {
      case '^':
        newDirection = '>';
        break;
      case '>':
        newDirection = 'v';
        break;
      case 'v':
        newDirection = '<';
        break;
      case '<':
        newDirection = '^';
        break;
    }

    dir = directionVectors[newDirection];
  }

  return newDirection;
}

function walk(grid: Grid, startPos: Coordinates, obstacle?: Coordinates) {
  const visited = new Set<string>();
  const path = new Set<string>();

  let [x, y] = startPos;
  let direction = grid.valueAt(startPos[0], startPos[1])!;
  let loopDetected = false;

  while (true) {
    const node = grid.valueAt(x, y);
    if (!node) {
      break;
    }

    const movement = `${direction},${x},${y}`;
    if (path.has(movement)) {
      loopDetected = true;
      break;
    }

    path.add(movement);

    direction = turn(grid, x, y, direction, obstacle);

    const [dx, dy] = directionVectors[direction];
    visited.add(`${x},${y}`);

    x += dx;
    y += dy;
  }

  const visitedNodes = [...visited].map((key) => {
    const coords = key.split(',');
    return [Number(coords[0]), Number(coords[1])];
  });

  return { loopDetected, visitedNodes };
}

async function partOne() {
  const grid = new Grid(await readByLine());
  const startPos = findStartPos(grid)!;
  return walk(grid, startPos).visitedNodes.length;
}

async function partTwo() {
  const grid = new Grid(await readByLine());
  const [sx, sy] = findStartPos(grid)!;
  let result = 0;

  for (const [x, y] of grid) {
    if (x === sx && y === sy) {
      continue;
    }

    if (grid.valueAt(x, y) === '#') {
      continue;
    }

    const { loopDetected } = walk(grid, [sx, sy], [x, y]);
    if (loopDetected) {
      result++;
    }
  }

  return result;
}

console.log(await partOne());
console.log(await partTwo());
