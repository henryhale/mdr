// mappings of subgrid locations on a parent grid
// originating from a single point
export const FILL_MAP: Record<number, number[][]> = {
    /**
     * "2" translates to coordinates
     *  { x: x, y: y }
     *  { x: x, y: y + 1 }
     *  { x: x + 1, y: y + 1 }
     *  { x: x + 1, y: y }
     */
    2: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
    ],
    3: [
        [-1, -1],
        [0, -1],
        [1, -1],
        [-1, 0],
        [0, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
    ],
    // 4: []
}