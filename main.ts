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

    const { celebrationImage } = LEVELS[level]
    $("#loading").style.display = "block"
    $("#app").style.display = "none"
    $("#gameover-image").innerHTML = `<img src="${celebrationImage}" width="200" />`

    setTimeout(() => {
        level = (level + 1) % LEVELS.length
        window.location.href =`/mdr/?level=${level}`
    }, 20000)
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
