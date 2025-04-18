import { Layer, Model, patterns } from "./source/index.js";

// dom selector
const $ = x => document.querySelector(x)

const elements = {
    target: $("tbody"),
    cursor: $("#cursor"),
    loading: $("#loading"),
}

const progress = $("#progress")
const progressBars = [$("#bas"), $("#mid"), $("#adv"), $("#xpt")]

// init model
const m = new Model(elements.target, progress, progressBars)

m.pushLayer(
    new Layer(patterns.LINEAR),
    new Layer(patterns.RLINEAR),
    new Layer(patterns.LINEAR),
    new Layer(patterns.RLINEAR),
)

m.render()

m.ongameover = () => window.location.reload()

// cursor
const updateCursor = (e) => {
    const x = e.pageX, y = e.pageY
    elements.cursor.style.left = `${x}px`
    elements.cursor.style.top = `${y}px`
}

document.addEventListener("mousemove", updateCursor)
document.addEventListener("touchmove", updateCursor)

// dom loaded
setTimeout(() => {
    elements.loading.style.display = "none"
    document.body.classList.add("loaded")
}, 1000)