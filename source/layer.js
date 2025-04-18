import { getPoints, getRandomCenter } from "./helpers.js"

let layerID = 0

export const numOfLocations = 4

export class Layer {
    constructor(pattern) {
        this.pattern = pattern.join("").split("")
        this.id = ++layerID
        this.centerToPoints = new Map()

        this.score = 0

        for (let i = 0; i < numOfLocations; i++) {
            const center = getRandomCenter(this.id)
            const points = getPoints(center)

            const centerString = `${center.x}-${center.y}`

            this.centerToPoints.set(
                centerString, 
                points.map((point, i) => {
                    return { ...point, center: centerString, value: this.pattern[i] }
                })
            )
        }
    }

    get points() {
        return [...this.centerToPoints.values()]
    }

    clearByCenter(key, deleteFn) {
        if (!key) return false
        if (this.centerToPoints.has(key)) {
            this.centerToPoints.get(key).forEach(deleteFn)
            this.centerToPoints.delete(key)

            this.updateScore()
            console.log(this.id, "cleared", this.score)

            return true
        }
        return false
    }

    updateScore() {
        this.score += Math.floor(1 * 100 / numOfLocations)
    }

    get isComplete() {
        return this.score >= 100 && this.points.length === 0
    }
}
