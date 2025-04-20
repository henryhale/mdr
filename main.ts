import { View, ViewConfig } from "./source/view"
import { Model } from "./source/model"
import { LEVELS } from "./source/model/levels"

// init state
const nextLevel = new URLSearchParams(location.search).get("level") || "0"

// dom selector
const $ = (x: string) => document.querySelector(x) as HTMLElement

const view = new View({
    target: $("table"),
    level: $("#level"),
    progress: $("#progress"),
    bins: [$("#bin1"), $("#bin2"), $("#bin3"), $("#bin4")]
} as ViewConfig)

const model = new Model(view, parseInt(nextLevel, 10))

model.onLevelComplete = (level) => {
    console.log(`Level: ${level} complete!`)
    setTimeout(() => {
        const nxt = Math.min(level + 1, LEVELS.length)
        window.location.href = `${window.location.origin}?level=${nxt}`
    }, 1000)
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
setTimeout(() => {
    $("#loading").style.display = "none"
    document.body.classList.add("loaded")
}, 1000)