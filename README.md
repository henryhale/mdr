# Micro Data Recognition (MDR)

A pattern recognition game inspired by the Apple TV series [_Severance_](https://wikipedia.org/wiki/Severance_(TV_series)), specifically the Macro Data Refinement (MDR) team.

In the show, each team member analyzes grids of numbers and reacts emotionally to hidden patterns. This project brings that concept to life through interactive gameplay focused on focus, logic, and number intuition.

## Motivation

As someone who enjoys working with numbers, solving Sudoku puzzles, and exploring experimental ideas, *MDR* combines all those elements. The goal is to train your brain to detect hidden patterns in randomly generated datasets.

## Live Demo

- [**Launch**](henryhale.github.io/mdr) - _(for desktop use only)_

## Roadmap

- [x] Game layout and theme
- [x] Game levels
- [x] Pattern generation logic 
- [x] Layered grid structure
- [x] Random number movements
- [x] Loading screen
- [x] Horizontal scrolling
- [x] Sound effects & Background audio
- [x] Game over display
- [ ] Number drop animations
- [ ] Retro-style font
- [ ] Advanced pattern sets
- [ ] Accessibility improvements

## Gameplay

You are presented with a grid of single-digit numbers. Your task: identify and select numbers that belong to hidden mathematical patterns.

### Grid Composition

- The game grid consists of multiple **stacked layers**.
- Each layer includes one or more **pattern-based subgrids** with increasing complexity.
- Layers are merged into one visible grid, where **top layers take visual precedence**, like overlapping transparent cards.

### Rules & Scoring

- **Correct selection** of a full subgrid on the topmost visible layer awards points.
- Once a valid pattern is cleared, it either reveals lower layers or is replaced with random digits.
- **Incorrect selections have no penalty**, but they create cognitive confusion—challenging your focus.

### Win Condition

- All subgrids in every layer must be correctly identified and cleared.
- Final grid should contain only random, patternless numbers.
- Game progress must reach **100%** to win a level.


## Installation

> For local development or offline play:

1. Clone the repository:  
    ```bash
    git clone https://github.com/henryhale/mdr.git
    ```
2. Install dependencies:
    ```bash
    cd mdr
    pnpm install
    ```
3. Run development server:
    ```bash
    pnpm dev
    ```
4. Open `http://localhost:5173` in a modern web browser.

## Contributing

Contributions, feature ideas, and bug reports are welcome.

**To contribute:**

1. Fork the repository
    ```bash
    git clone https://github.com/henryhale/mdr.git
    ```
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit changes:
    ```bash
    git commit -m "Add feature"
    ```
4. Push and open a pull request

## Credits

The game concept is inspired by the Macro Data Refinement department from [Severance](https://wikipedia.org/wiki/Severance_(TV_series)).

## License

Released under [MIT License](./LICENSE.txt), &copy; 2025 [Henry Hale](https://github.com/henryhale).
