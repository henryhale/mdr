import { createGrid, NO_VALUE, randomInt } from "../common"
import { Point, Cell } from "../layer"

export interface IView {
    onCellClick?: (center: string) => void
    init(rows: number, cols: number): void
    render(grid: (Cell | null)[][]): void
    update(cell: Cell | null): void
    clear(x: number, y: number): void
    updateLevel(level: string): void
    updateProgress(progress: number): void
    updateBins(values: number[]): void
    showOverlay(image: string): void
    hideOverlay(): void
}

export type ViewConfig = {
    rows: number
    cols: number
    target: HTMLElement
    level: HTMLElement
    progress: HTMLElement
    bins: [HTMLElement,HTMLElement,HTMLElement,HTMLElement]
    overlay: HTMLElement
    app: HTMLElement
}

export class View implements IView {
    private options: ViewConfig
    private grid!: HTMLElement[][]
    private currentPoint?: Point

    public onCellClick?: (center: string) => void

    constructor(options: ViewConfig) {
        this.options = options
        this.currentPoint = undefined
    }

    // initialize the 2d grid of cells - <td> elements
    public init(rows: number, cols: number) {
        const { target } = this.options

        this.grid = createGrid(rows, cols, (x: number, y: number) => {
            const td = document.createElement("td")
            td.dataset.x = x.toString()
            td.dataset.y = y.toString()
            td.dataset.center = `${x}-${y}`
            td.onclick = () => this.onCellClick?.call(undefined, td.dataset.center || "")
            td.onmouseover = () => {
                this.currentPoint = { x, y }
            }

            const animationName = ["horizontal", "vertical", "horizontal", "vertical"][randomInt(3,0)]
            const animationDuration = Math.random() * 2 + 2
            const style = `--duration: ${animationDuration}s; --axis: ${animationName};`
            td.setAttribute("style", style)

            td.dataset.axis = animationName

            return td
        })
        
        target.innerHTML = ""

        for (const row of this.grid) {
            const tr = document.createElement("tr")
            for (const td of row) {
                tr.appendChild(td)
            }
            target.appendChild(tr)
        }

        target.addEventListener("mousemove", this.onMouseMove.bind(this), { passive: true })

        target.parentElement!.addEventListener("wheel", this.onScroll.bind(this), { passive: true })
    }

    // hovering over a cell scales surrounding numbers basing on distance   
    private onMouseMove() {
        if (!this.currentPoint) return

        const tds = this.options.target.querySelectorAll("td")

        let dx, dy, d, ax, ay

        let ox = this.currentPoint.x
        let oy = this.currentPoint.y

        for (const td of tds) {
            ax = parseInt(td.dataset.x || "0", 10)
            ay = parseInt(td.dataset.y || "0", 10)

            dx = ax - ox
            dy = ay - oy

            d = Math.floor(Math.sqrt((dx*dx) + (dy*dy)))

            switch (d) {
                case 0:
                case 1:
                    td.style.transform = "scale(2)"
                    td.style.opacity = "1"
                    break;
                case 2:
                    td.style.transform = "scale(1.5)"
                    td.style.opacity = "0.8"
                    break;

                default:
                    td.style.transform = "scale(1)"
                    td.style.opacity = "0.65"
                    break;
            }
        }
    }

    private onScroll(e: WheelEvent) {
        this.options.target.parentElement!.scrollBy(Math.floor(e.deltaY / 2), 0)
        this.currentPoint = undefined
    }

    // update the text contents of all cells
    public render(grid: (Cell | null)[][]): void {
        for (let y = 0; y < grid.length; y++) {
            const row = grid[y];
            for (let x = 0; x < row.length; x++) {
                const cell = row[x];
                const td = this.grid[y][x]
                if (cell == NO_VALUE) {
                    if (!td.textContent?.length) {
                        td.innerText = randomInt().toString()
                    }
                } else {
                    td.innerText = cell.value
                    td.dataset.center = cell.center
                }
            }
        }
    }

    // update the text contents of one with new data
    public update(cell: Cell | null): void {
        if (!cell) return
        const { x, y, value, center } = cell
        const td = this.grid[y][x]
        td.innerText = value
        td.dataset.center = center
    }

    // reset/deactivate a cell 
    public clear(x: number, y: number): void {
        if (this.grid[y] && this.grid[y][x]) {
            const td = this.grid[y][x]
            td.removeAttribute("data-center")
            td.innerHTML = ""
        }
    }

    public updateLevel(level: string): void {
        this.options.level.innerText = level
    }
    
    public updateProgress(progress: number): void {
        this.options.progress.innerText = `${progress < 10 ? '0' + progress : progress}%`
    }
    
    // update the progress bars basing on scores of the layers
    public updateBins(values: number[]): void {
        for(const bin in values) {
            this.options.bins[bin]?.setAttribute("style", `--progress: ${values[bin]}%`)
        }
    }

    public showOverlay(image = ""): void {
        this.options.overlay.classList.remove("hidden")
        this.options.overlay.classList.add("flex")

        if (image.length) {
            this.options.overlay.children[1].innerHTML = `<b>YOU WIN!</b><img src="${image}" class="w-full min-w-[200px]" /><div>Next Level: Loading...</div>`
        }
    }
    
    public hideOverlay(): void {
        this.options.overlay.classList.remove("flex")
        this.options.overlay.classList.add("hidden")
    }
}
