export const NO_VALUE = null

export const randomInt = (max = 9, min = 0) => Math.floor(Math.random() * (max - min) + min)

type ValueGenerator<T> = (x: number, y: number) => T

// make a 2d grid filled with values from a generator function
export function createGrid<T>(rows: number, cols: number, gen: ValueGenerator<T>) {
    return Array.from({ length: rows }, (_, y) => {
        return Array.from({ length: cols }, (_, x) => gen(x, y))
    })
}
