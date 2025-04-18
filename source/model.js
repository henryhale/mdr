import { createGrid, NO_VALUE } from "./common.js"
import { numOfLocations } from "./layer.js"
import { Renderer } from "./renderer.js"

const MAX_CHANCES = 5

export class Model {
    constructor(target, progress, progressBars) {
        this.layers = []
        this.view = createGrid(() => NO_VALUE)
        this.renderer = new Renderer(target)

        this.netScore = 0
        this.hearts = MAX_CHANCES

        this.ongameover = undefined

        this.renderer.onClick = (center) => {
            // check if its a layer value
            const scored = this.#clearPointsByCenter(center)
            // update score
            if (scored) {
                let totalScore = 0
                for (const [i, layer] of Object.entries(this.layers)) {
                    progressBars[i].setAttribute("style", "--progress:" + layer.score + "%")
                    totalScore += layer.score
                }
                this.netScore = Math.floor((totalScore * 100) / (numOfLocations * 100))
            } else {
                // penalty for click wrong number - reduce hearts
                this.hearts--
            }
            progress.innerText = `${this.netScore < 10 ? '0' + this.netScore : this.netScore}%` 

            // win flag:
            if (this.hearts <= 0 || this.netScore >= 100) this.ongameover?.call()
        }
    }

    pushLayer(...layers) {
        this.layers.push(...layers)
    }

    #mergeLayersView(update = false) {
        // merge remaining layers
        for (const layer of this.layers) {
            for (const row of layer.points) {
                for (const point of row) {
                    const { x: col, y: row, value, center } = point
                    if (this.view[row][col] == NO_VALUE) {
                        this.view[row][col] = { value, center, layer: layer.id }
                        if (update) this.renderer.update(point)
                    }
                }
            }
        }
    }

    render(update = false) {
        this.#mergeLayersView(update)
        this.renderer.render(this.view)
    }

    #clearPointsByCenter(center) {
        let status = false

        const removeFromView = (point) => {
            const { x: col, y: row } = point
            this.view[row][col] = NO_VALUE
            this.renderer.clear(row, col)
        }

        for (const layer of this.layers) {
            if (layer.clearByCenter(center, removeFromView)) {
                status = true
                break
            }
        }

        if (status) this.render(true)

        return status
    }

}
