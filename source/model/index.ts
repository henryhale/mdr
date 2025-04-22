import { createGrid, NO_VALUE } from "../common";
import { Point, Cell, Layer } from "../layer";
import { IAudioManager, AudioManager } from "../audio";
import { IView } from "../view";
import { LEVELS } from "./levels";

export interface IModel {
    onLevelComplete?: (level: number) => void
}

export class Model implements IModel {
    private view: IView
    private viewGrid: (Cell | null)[][]
    private layers: Layer[]
    public onLevelComplete?: (level: number) => void;
    private audio: IAudioManager

    constructor(view: IView, levelID: number) {
        this.view = view

        const { name, rows, cols, locations, patterns } = LEVELS[levelID]

        this.layers = patterns.map((p, id) => {
            return new Layer(id, {
                pattern: p(),
                rows,
                cols,
                locations
            })
        })

        this.viewGrid = createGrid<Cell | null>(rows, cols, () => NO_VALUE)

        this.view.init(rows, cols)

        this.view.updateLevel(name)

        this.view.onCellClick = (center: string) => {
            // click sound effect 
            this.audio.playClickSound()

            // check if the clicked cell is part of subgrid 
            // on any of the layers, then clear that subgrid.
            // - pattern identified
            const scored = this.matchSelected(center)
            if (scored) {
                const layerScores = this.layers.map(layer => layer.score)
                const totalScore = layerScores.reduce((sum, current) => sum + current, 0)
                const progress = Math.floor(totalScore / layerScores.length)

                this.view.updateProgress(progress)
                this.view.updateBins(layerScores)

                // losing is no option, play until it's a win
                if (progress >= 100) { 
                    this.audio.playGameOverSound()
                    this.onLevelComplete?.call(undefined, levelID)
                }

                // scored? play match sound
                this.audio.playMatchSound()
            } else {
                this.audio.playErrorSound()
            }
        }

        this.render()

        // init sound manager
        this.audio = new AudioManager()
        this.audio.playBackgroundMusic()
    }

    // merge all points on each layer on to one grid preserving precedence
    private mergeLayersView() {
        for (const layer of this.layers) {
            for (const grid of layer.points) {
                const visible = grid.every(point => {
                    const { x, y, center } = point
                    if (this.viewGrid[y][x] == NO_VALUE) return true
                    const { x: vx, y: vy, center: vc } = this.viewGrid[y][x]
                    return (vx === x && vy === y && vc === center) 
                })

                for (const point of grid) {
                    const { x, y } = point
                    if (this.viewGrid[y][x] == NO_VALUE) {
                        this.viewGrid[y][x] = visible ? point : { ...point, center: `${x}-${y}` }
                    }
                }
            }
        }
    }

    // render the entiregrid or simply the updated cells
    private render() {
        this.mergeLayersView()
        this.view.render(this.viewGrid)
    }

    // check if the clicked cell belongs to a pattern on any layer
    private matchSelected(center: string) {
        let cleared = false

        const removeFromView = (point: Point) => {
            const { x, y } = point
            this.viewGrid[y][x] = NO_VALUE
            this.view.clear(x, y)
        }

        for (const layer of this.layers) {
            if (layer.clearPointsByCenter(center, removeFromView)) {
                cleared = true
                break
            }
        }

        if (cleared) this.render()

        return cleared
    }
}
