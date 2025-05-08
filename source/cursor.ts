export function initCursor() {
    document.addEventListener("mousemove", function (e: MouseEvent) {
        const cursor = document.querySelector("#cursor") as HTMLElement
        const x = e.pageX, y = e.pageY
        cursor.style.left = `${x}px`
        cursor.style.top = `${y}px`
    })
}