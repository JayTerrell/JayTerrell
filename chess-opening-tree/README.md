# The …e6 Opening Tree

An interactive opening explorer for two openings where Black answers with …e6:

- **English:** 1.c4 e6 (Agincourt, Mikenas–Carls, Queen's Gambit Declined by transposition, Dutch and English Defence exits)
- **French:** 1.e4 e6 (Winawer, Classical, Rubinstein, Tarrasch, Advance, Exchange, King's Indian Attack and other second moves)

Open `index.html` in a browser. It is a single self-contained page; it loads fonts from Google Fonts and chess.js from cdnjs.

## What it shows

- **Board and move tree.** Click any move in the outline or the "Next moves" table. Step through with the arrow buttons or the ← → keys. Hovering a next move draws its arrow.
- **Win rates.** Each position shows White / draw / Black percentages and an approximate game count. Pick "I play White" or "I play Black" to see your expected score.
- **Transpositions.** Positions are matched by their FEN, so every "same position as" link is exact. Four of them connect the English and French trees (for example 1.c4 e6 2.e4 d5 3.e5 and 1.e4 e6 2.c4 d5 3.e5).
- **Traps.** Eight traps, four for each colour, each with the losing move, the refutation and the engine swing.

## About the data

- **Win rates are approximate.** They are rounded master-level (2200+, over-the-board) figures in line with databases such as the Lichess Masters explorer. They were not fetched live, because the Lichess explorer API now needs a login. Every position links to Lichess so you can check current numbers.
- **Game counts belong to the position**, not the move order. A transposed position like 1.c4 e6 2.Nc3 d5 3.d4 (the Queen's Gambit Declined) carries the QGD's count, which is why it can show more games than its parent.
- **Traps were checked with Stockfish 16** at depth 16–20. Every move in the tree and in every trap line was validated as legal with chess.js. Several well-known "traps" did not survive the engine check and were left out.

## Editing

The tree and traps live in `src/data.js`; the page layout and code are in `src/template.html`. After editing either file, rebuild with:

```bash
node build.js
```
