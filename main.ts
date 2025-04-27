import { View, ViewConfig } from "./source/view"
import { Model } from "./source/model"
import { LEVELS } from "./source/model/levels"

// init state
const nextLevel = new URLSearchParams(location.search).get("level") || "0"

// dom selector
const $ = (x: string) => document.querySelector(x) as HTMLElement

// game
function start() {
    const view = new View({
        target: $("table"),
        level: $("#level"),
        progress: $("#progress"),
        bins: [$("#bin1"), $("#bin2"), $("#bin3"), $("#bin4")],
        overlay: $("#overlay"),
        app: $("#app")
    } as ViewConfig)

    const model = new Model(view, parseInt(nextLevel, 10))

    model.onLevelComplete = (level) => {
        console.log(`Level: ${level} complete!`)

        const { celebrationImage } = LEVELS[level]

        view.showOverlay(celebrationImage)

        setTimeout(() => {
            level = (level + 1) % LEVELS.length
            window.location.href =`/mdr/?level=${level}`
        }, 10000)
    }

    view.hideOverlay()
}

// cursor
function updateCursor(e: MouseEvent) {
    const cursor = $("#cursor")
    const x = e.pageX, y = e.pageY
    cursor.style.left = `${x}px`
    cursor.style.top = `${y}px`
}

document.addEventListener("mousemove", updateCursor)

// dom loaded
document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("loaded", "cursor-none")
    
    $("#playbtn").addEventListener("click", () => {        
        start()
        document.body.classList.add("active")
    })
})
