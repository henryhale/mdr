import { COLS, randomInt, ROWS } from "./common.js"

let centers = {}

// random center position
export function getRandomCenter(layer){
    let x, y

    do {
        x = randomInt(COLS, 1)
        y = randomInt(ROWS, 1)
        if (!centers[`${y}-${x}`]) {
            centers[`${y}-${x}`] = layer
            break
        }
    } while(true)

    return { x, y }
}

// get 3x3 grid points from the center (x,y)
export function getPoints({x, y}) {
    return [
        { x: x - 1, y: y - 1 },
        { x: x, y: y - 1 },
        { x: x + 1, y: y - 1 },

        { x: x - 1, y: y },
        { x: x, y: y },
        { x: x + 1, y: y },

        { x: x - 1, y: y + 1 },
        { x: x, y: y + 1 },
        { x: x + 1, y: y + 1 },
    ].filter((p => p.x >= 0 && p.x < COLS && p.y >= 0 && p.y < ROWS))
}