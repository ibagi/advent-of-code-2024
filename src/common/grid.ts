export type Coordinates = [number, number];

export class Grid {
    constructor(public rows: string[]) {
    }

    valueAt(x: number, y: number) {
        const row = this.rows[y];
        if (!row) {
            return undefined;
        }

        return row[x];
    }

    neighbours(x: number, y: number) {
        return {
            topLeft: this.valueAt(x - 1, y - 1),
            top: this.valueAt(x, y - 1),
            topRight: this.valueAt(x + 1, y - 1),
            right: this.valueAt(x + 1, y),
            bottomRight: this.valueAt(x + 1, y + 1),
            bottom: this.valueAt(x, y + 1),
            bottomLeft: this.valueAt(x - 1, y + 1),
            left: this.valueAt(x - 1, y),
        }
    }

    toArray() {
        return Array.from(this);
    }

    *[Symbol.iterator]() {
        for (let y = 0; y < this.rows.length; y++) {
            for (let x = 0; x < this.rows[0].length; x++) {
                yield [x, y] as Coordinates;
            }
        }
    }
}