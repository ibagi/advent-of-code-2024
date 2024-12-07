import { readByLine } from '../common/input';

type Rules = Map<number, Set<number>>;

function updateRules(rules: Rules, target: number, before: number) {
  if (rules.has(target)) {
    rules.get(target)?.add(before);
    return;
  }

  const set = new Set<number>();
  set.add(before);
  rules.set(target, set);
}

function isCorrect(sequence: number[], rules: Rules) {
  for (let i = 0; i < sequence.length; i++) {
    const befores = rules.get(sequence[i]);
    if (sequence.slice(0, i).some((b) => befores?.has(b))) {
      return false;
    }
  }

  return true;
}

function sortByRules(sequence: number[], rules: Rules) {
  const result = [...sequence];
  const rulesToSatisfy = result.flatMap((a) =>
    [...(rules.get(a) ?? new Set<number>())]
      .filter((b) => result.indexOf(b) >= -1)
      .map((b) => [a, b])
  );

  function ruleSatisfied(target: number, before: number) {
    const targetIndex = result.indexOf(target);
    if (targetIndex === -1) {
      return true;
    }

    const beforeIndex = result.indexOf(before);
    if (beforeIndex === -1) {
      return true;
    }

    return targetIndex < beforeIndex;
  }

  while (true) {
    const rule = rulesToSatisfy.find(([target, before]) =>
      !ruleSatisfied(target, before)
    );
    if (!rule) {
      break;
    }

    const [target, before] = rule;
    result.splice(result.indexOf(target), 1);
    result.splice(result.indexOf(before), 0, target);
  }

  return result;
}

async function partOne() {
  const input = await readByLine();
  const rules = new Map<number, Set<number>>();
  let result = 0;

  for (const line of input) {
    if (line.includes('|')) {
      const [target, before] = line.split('|');
      updateRules(rules, Number(target), Number(before));
    }

    if (line.includes(',')) {
      const sequence = line.split(',').map(Number);
      if (isCorrect(sequence, rules)) {
        result += sequence[Math.floor(sequence.length / 2)];
      }
    }
  }

  return result;
}

async function partTwo() {
  const input = await readByLine();
  const rules = new Map<number, Set<number>>();
  let result = 0;

  for (const line of input) {
    if (line.includes('|')) {
      const [target, before] = line.split('|');
      updateRules(rules, Number(target), Number(before));
    }

    if (line.includes(',')) {
      const sequence = line.split(',').map(Number);
      if (!isCorrect(sequence, rules)) {
        const sorted = sortByRules(sequence, rules);
        result += sorted[Math.floor(sorted.length / 2)];
      }
    }
  }

  return result;
}

console.log(await partOne());
console.log(await partTwo());
