export const NO_VALUE = null

export const ROWS = 12
export const COLS = 12

export const randomInt = () => Math.floor(Math.random() * 9)

export const createGrid = (gen) => {
    return Array.from({ length: ROWS }, (_, y) => {
        return Array.from({ length: COLS }, (_, x) => gen(x, y))
    })
}
