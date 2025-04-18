import { createGrid, NO_VALUE, randomInt } from "./common.js";

const el = str => document.createElement(str)

export class Renderer {
    constructor(target) {
        this.target = target

        this.onClick = undefined

        this.currentPoint = null

        this.elements = createGrid((x, y) => {
            const td = el("td")
            td.dataset.x = x
            td.dataset.y = y
            td.onclick = () => this.onClick?.call(undefined, td.dataset.center)
            const onHover = () => {
                this.currentPoint = { x, y }
            }
            td.onmouseover = onHover
            td.ontouchstart = onHover
            return td
        })
        
        target.innerHTML = ""
    
        for (const row of this.elements) {
            const tr = el("tr")
            for (const td of row) {
                tr.appendChild(td)
            }
            target.appendChild(tr)
        }

        // register events: scale numbers on mouse move
        target.addEventListener("mousemove", e => this.#onMouseMove(e))
        target.addEventListener("touchmove", e => this.#onMouseMove(e))
    }

    #onMouseMove() {
        const tds = this.target.querySelectorAll("td")

        let dx, dy, d, ax, ay


        let ox = this.currentPoint?.x ?? 0
        let oy = this.currentPoint?.y ?? 0

        for (const td of tds) {
            ax = parseInt(td.dataset.x, 10)
            ay = parseInt(td.dataset.y, 10)

            dx = ax - ox
            dy = ay - oy

            d = Math.floor(Math.sqrt((dx*dx) + (dy*dy)))

            // td.innerText = d.toString()[0]

            switch (d) {
                case 0:
                case 1:
                    td.style.transform = "scale(1.75)"
                    td.style.opacity = "1"
                    break;
                case 2:
                    td.style.transform = "scale(1.2)"
                    td.style.opacity = "0.8"
                    break;

                default:
                    td.style.transform = "scale(1)"
                    td.style.opacity = "0.5"
                    break;
            }
        }
        
    }

    update(...points) {
        for (const point of points) {
            const { x, y, value, center } = point
            const td = this.elements[y][x]
            td.innerText = value
            td.dataset.center = center
        }
    }

    render(grid) {
        // console.log(grid)
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                const point = grid[y][x]
                const td = this.elements[y][x]
                if (point == NO_VALUE) {
                    td.innerText = randomInt()
                } else {
                    td.innerText = point.value
                    td.dataset.center = point.center
                    // td.classList.add(`layer-${point.layer}`)
                }
            }
        }
    }

    clear(row, col) {
        if (this.elements[row] && this.elements[row][col]) {
            const td = this.elements[row][col]
            td.removeAttribute("data-center")
            td.classList.forEach(c => {
                if (c.startsWith("layer-")) td.classList.remove(c)
            })
        }
    }
}

