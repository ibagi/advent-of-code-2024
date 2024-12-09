import { readByLine } from '../common/input';

type Equation = {
  result: number;
  operands: number[];
};

type Operation = '+' | '*' | '||';

const operations: Record<Operation, (a: number, b: number) => number> = {
  '+': (a: number, b: number) => a + b,
  '*': (a: number, b: number) => a * b,
  '||': (a: number, b: number) => Number(a + '' + b),
};

function permutate(length: number, possibilities: Operation[]): Operation[][] {
  return Array(Math.pow(possibilities.length, length - 1))
    .fill('0')
    .map((_, i) =>
      i
        .toString(possibilities.length)
        .padStart(length - 1, '0')
        .split('')
        .map((i) => possibilities[Number(i)])
    );
}

async function parseInput(): Promise<Equation[]> {
  const lines = await readByLine();
  return lines.map((line) => {
    const [result, operands] = line.split(':');
    return {
      result: Number(result),
      operands: operands.split(' ').filter((o) => o.trim()).map(Number),
    };
  });
}

function isSolvable(equation: Equation, permutation: Operation[]) {
  let acc = equation.operands[0];

  for (let i = 1; i < equation.operands.length; i++) {
    const b = equation.operands[i];
    acc = operations[permutation[i - 1]](acc, b);
  }

  return acc === equation.result;
}

async function getSolution(possibleOperations: Operation[]) {
  const equations = await parseInput();
  return equations
    .filter((eq) =>
      permutate(eq.operands.length, possibleOperations).some((perm) =>
        isSolvable(eq, perm)
      )
    )
    .reduce((sum, eq) => sum + eq.result, 0);
}

async function partOne() {
  return getSolution(['+', '*']);
}

async function partTwo() {
  return getSolution(['+', '*', '||']);
}

console.log(await partOne());
console.log(await partTwo());
