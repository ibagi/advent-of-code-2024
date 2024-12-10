import { type Coordinates, Grid } from '../common/grid';
import { readByLine } from '../common/input';

type AntinodeFn = (grid: Grid, a: Coordinates, b: Coordinates) => Coordinates[];

function getAntinode(grid: Grid, a: Coordinates, b: Coordinates) {
  const x = a[0] + a[0] - b[0];
  const y = a[1] + a[1] - b[1];
  return (grid.valueAt(x, y) ? [[x, y]] : []) as Coordinates[];
}

function getAntinodes(grid: Grid, a: Coordinates, b: Coordinates) {
  const result: Coordinates[] = [[...a], [...b]];
  let iterations = 1;
  let x = a[0] + (iterations * (a[0] - b[0]));
  let y = a[1] + (iterations * (a[1] - b[1]));

  while (grid.valueAt(x, y)) {
    result.push([x, y]);
    iterations++;
    x = a[0] + (iterations * (a[0] - b[0]));
    y = a[1] + (iterations * (a[1] - b[1]));
  }

  return result;
}

async function solution(antinodesFn: AntinodeFn) {
  const grid = new Grid(await readByLine());
  const groups = new Map<string, Coordinates[]>();
  const antinodes = new Set<string>();

  for (const [x, y] of grid) {
    const node = grid.valueAt(x, y)!;
    if (node === '.') {
      continue;
    }

    if (!groups.has(node)) {
      groups.set(node, [[x, y]]);
    } else {
      groups.get(node)?.push([x, y]);
    }
  }

  for (const [_, coords] of groups.entries()) {
    for (const a of coords) {
      for (const b of coords) {
        if (a[0] !== b[0] && a[1] !== b[1]) {
          for (const [x, y] of antinodesFn(grid, a, b)) {
            antinodes.add(`${x},${y}`);
          }
        }
      }
    }
  }

  return [...antinodes].length;
}

async function partOne() {
  return solution(getAntinode);
}

async function partTwo() {
  return solution(getAntinodes);
}

console.log(await partOne());
console.log(await partTwo());
