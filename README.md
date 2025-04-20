# Micro Data Recognition (MDR)

Based on the Apple TV series titled, "Severance".

Inspired by the Macro Data Refinement team in the series.

Each team member had a workstation with a grid of numbers and required to refine the data 
basing on the emotion triggers they had with certain numbers on the screen. 

## Why?

I love numbers, maths, played sudoku, watched Severance. Why not?

## Live Demo

- [Launch](henryhale.github.io/mdr) - _for desktop use only_

## How it works?

Basically, you are presented with a grid of single digit numbers and 
required to identify those that belong to a specific mathematical pattern.

The grid is made up of several layers stacked together.
Each layer consists of smaller grid containing numbers of a mathematical pattern with a certain complexity.
The layers are merged enforcing precedence by preserving slots of layers on top.
Think about it as an unordered stack of several cards viewed from above.

Scores are awarded when;
- you select one of the numbers belonging to a subgrid on the same layer
- the subgrid is in completely view (all numbers are on top)

For all valid scores, the subgrid is then cleared to give room for numbers in a lower layer at any of those positions or replaced with a random number

There is no penalty is awarded when a wrong number is selected, it just messes with your mind.

The game is complete when;
- the grid consist of random numbers
- all subgrids on each layer are detected and cleared

For a win on any level,
- game progress must be 100%

## Conclusion

Basically a proof of concept made with love by [Henry Hale](github.com/henryhale), enjoy!
    
