import { randomInt } from "../common";
import type { PatternConfig } from "../patterns";
import { FILL_MAP } from "./fill";

export type LayerOptions = {
    rows: number
    cols: number
    locations: number
    pattern: PatternConfig
}

export interface Point {
    x: number
    y: number
}

export interface Cell extends Point {
    center: string
    value: string
}

// create a random point on 2d grid excluding the bounding points
function getRandomCenter(rows: number, cols: number) {
    return {
        x: randomInt(cols, 1),
        y: randomInt(rows, 1),
    }
}

// for given point, return a grid of points arranged as 2x2, 3x3, ...
function getFieldPoints(center: Point, fill: number): Point[] {
    const { x: cx, y: cy } = center
    return FILL_MAP[fill].map(([x , y]) => {
        return { x: cx + x, y: cy + y }
    })
}

export interface ILayer {
    score: number
    id: number
    points: Cell[][]
    clearPointsByCenter(centerStr: string, deleteFn: (p: Cell) => void): void
}

export class Layer implements ILayer {
    private config: LayerOptions
    public score: number
    public id: number
    private numbers: string[]
    private centerToPoints: Map<string, Cell[]>

    constructor(id: number, config: LayerOptions) {
        this.id = id
        this.config = config
        this.score = 0
        this.centerToPoints = new Map()

        this.numbers = config.pattern.values.join("").split("")

        this.fillWithPattern()
    }

    // populate the layer with small grids containing values of it's pattern
    // - only store those points instead of using a 2d array
    private fillWithPattern() {
        const { locations, rows, cols } = this.config
        for (let i = 0; i < locations; i++) {
            const center = getRandomCenter(rows, cols)
            const points = getFieldPoints(center, this.config.pattern.fill).filter(p => {
                return p.x >= 0 && p.x < cols && p.y >= 0 && p.y < rows
            })

            const centerStr = `${center.x}-${center.y}`

            // for each iteration, randomly reverse numbers
            const numbers = Math.random() > Math.random() ? this.numbers : this.numbers.reverse() 

            this.centerToPoints.set(
                centerStr,
                points.map((point, i) => {
                    return { 
                        ...point,
                        center: centerStr,
                        value: numbers[i]
                    } as Cell
                })
            )
        }
    }

    public get points() {
        return [...this.centerToPoints.values()]
    }

    // remove all points that are surrounding a center point
    public clearPointsByCenter(centerStr: string, deleteFn: (p: Cell) => void) {
        if (!centerStr) return false

        const points = this.centerToPoints.get(centerStr)

        if (points) {
            for (const point of points) deleteFn(point)

            this.centerToPoints.delete(centerStr)

            // update progress
            this.updateScore()

            return true
        }

        return false
    }
    
    // update the layer's score
    private updateScore() {
        this.score += Math.floor(100 * 1 / this.config.locations)
    }

}
