import { readAsText } from "../common/input";

function findMaches(input: string, filter?: (m: RegExpExecArray) => boolean) {
    const regex = /mul\((?<a>\d+),(?<b>\d+)\)/g;
    const matches = [...input.matchAll(regex)];

    return matches.filter(m => !!filter ? filter(m) : true).reduce((sum, match) => match.groups
        ? Number(match.groups['a']) * Number(match.groups['b']) + sum
        : sum, 0);
}

const lookBehind = (text: string) => (match: RegExpExecArray) => {
    const slice = text.substring(0, match.index);
    const allow = slice.matchAll(/do\(\)/g).reduce((curr, m) => Math.max(m.index, curr), -1);
    const disallow = slice.matchAll(/don\'t\(\)/g).reduce((curr, m) => Math.max(m.index, curr), -1);
    return disallow === -1 || allow > disallow;
}

async function partOne() {
    const input = await readAsText();
    return findMaches(input);
}

async function partTwo() {
    const input = await readAsText();
    return findMaches(input, lookBehind(input));
}

console.log(await partOne());
console.log(await partTwo());
