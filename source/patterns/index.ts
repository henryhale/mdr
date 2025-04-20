import { randomInt } from "../common"
import { FILL_MAP } from "../layer/fill"

export interface PatternConfig {
    complexity: number
    values: number[]
    fill: number
}

export type Pattern = () => PatternConfig

export const LINEAR: Pattern = () => ({
    // rank the pattern on a range of 1-9
    complexity: 2,
    // values in the pattern
    values: [1,2,3,4,5,6,7,8,9],
    // the size of subgrids: split values into AxA grid
    fill: 3
})

export const SQUARE: Pattern = () => ({
    complexity: 4,
    values: [0,1,4,9],
    fill: 2
})

export const REPEAT: Pattern = () => {
    const config: PatternConfig = {
        complexity: 1,
        values: [],
        fill: 2
    }
    // create the values
    const fillings = [...Object.keys(FILL_MAP)]
    const fill = fillings[randomInt(fillings.length - 1)]
    const count = Number(fill) * randomInt(4, 2)
    const x = randomInt()
    for (let i = 0; i < count; i++) config.values.push(x)
    return config
}

