import * as pattern from "../patterns" 

export type Level = {
    name: string
    rows: number
    cols: number
    locations: number
    patterns: [pattern.Pattern, pattern.Pattern, pattern.Pattern, pattern.Pattern]
}

export const LEVELS: Level[] = [
    {
        name: "Sunrise Park",
        rows: 12,
        cols: 20,
        locations: 4,
        patterns: [pattern.LINEAR, pattern.REPEAT, pattern.LINEAR, pattern.REPEAT]
    },
    {
        name: "Billings",
        rows: 12,
        cols: 32,
        locations: 4,
        patterns: [pattern.LINEAR, pattern.REPEAT, pattern.LINEAR, pattern.REPEAT]
    },
    {
        name: "Cold Harbor",
        rows: 12,
        cols: 40,
        locations: 8,
        patterns: [pattern.LINEAR, pattern.REPEAT, pattern.LINEAR, pattern.SQUARE]
    },
]
