import * as pattern from "../patterns" 

export type Level = {
    name: string
    rows: number
    cols: number
    locations: number
    patterns: [pattern.Pattern, pattern.Pattern, pattern.Pattern, pattern.Pattern]
    celebrationImage: string 
}

export const LEVELS: Level[] = [
    {
        name: "Sunrise Park",
        rows: 12,
        cols: 20,
        locations: 4,
        patterns: [pattern.LINEAR, pattern.REPEAT, pattern.LINEAR, pattern.REPEAT],
        celebrationImage: "img/gameover0.webp"
    },
    {
        name: "Hide And Seek",
        rows: 12,
        cols: 32,
        locations: 4,
        patterns: [pattern.LINEAR, pattern.REPEAT, pattern.LINEAR, pattern.REPEAT],
        celebrationImage: "img/gameover1.webp"
    },
    {
        name: "Cold Harbor",
        rows: 12,
        cols: 40,
        locations: 8,
        patterns: [pattern.LINEAR, pattern.REPEAT, pattern.LINEAR, pattern.SQUARE],
        celebrationImage: "img/gameover2.webp"
    },
]
