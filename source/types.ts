export type ValueGenerator<T> = (x: number, y: number) => T

export type Point = {
    x: number
    y: number
}

export interface CellValue extends Point {
    center: string
    value: string
} 

export interface Layer {
    id: number
    score: number
    points: CellValue[]
}

export interface GameManager {
    pushLayer(...layers: Layer)
}