async function readInput(path: string) {
  return await Bun.file(path).text();
}

export async function readByLine() {
  return (await readInput('input')).split(/\r?\n/);
}

export function readAsText() {
  return readInput('input');
}
