import { readByLine } from '../common/input';

async function parseInput() {
  const left = [];
  const right = [];

  for (const line of await readByLine()) {
    const [l, r] = line.split('  ');
    if (l && r) {
      left.push(Number(l));
      right.push(Number(r));
    }
  }

  return [left, right];
}

async function partOne() {
  let [left, right] = await parseInput();
  let result = 0;

  left.sort();
  right.sort();

  for (let i = 0; i < left.length; i++) {
    result += Math.abs(left[i] - right[i]);
  }

  return result;
}

async function partTwo() {
  const [left, right] = await parseInput();
  return left.reduce(
    (acc, x) => x * (right.filter((y) => x === y).length) + acc,
    0,
  );
}

console.log(await partOne());
console.log(await partTwo());
