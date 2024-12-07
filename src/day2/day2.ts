import { readByLine } from '../common/input';

type Direction = 'asc' | 'desc' | undefined;

function isSafe(sequence: number[]) {
  let dir = undefined;

  for (let i = 1; i < sequence.length; i++) {
    const diff = sequence[i] - sequence[i - 1];
    const absDiff = Math.abs(diff);
    if (absDiff < 1 || absDiff > 3) {
      return false;
    }

    const currentDir: Direction = diff < 0 ? 'desc' : 'asc';
    if (dir && currentDir !== dir) {
      return false;
    }

    dir = currentDir;
  }

  return true;
}

function* getSlices(arr: number[]) {
  yield [...arr];

  for (let i = 0; i < arr.length; i++) {
    const slice = [...arr];
    slice.splice(i, 1);
    yield slice;
  }
}

async function partOne() {
  const lines = await readByLine();
  return lines.filter((line) => isSafe(line.split(' ').map(Number))).length;
}

async function partTwo() {
  const lines = await readByLine();
  return lines.filter((line) =>
    getSlices(line.split(' ').map(Number)).some(isSafe)
  ).length;
}

console.log(await partOne());
console.log(await partTwo());
