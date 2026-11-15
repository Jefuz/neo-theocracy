# Neo-Theocracy

A text-based strategy game played through questions. You are a shaman who truly reincarnates. Play begins in a nomadic Stone Age band and runs through clans, kings and empires to the Age of Engines. In each life you rule until the body dies; then you are born again, somewhere, into a world that went on without you, and must be recognized before you can rule again.

Decisions echo generations later as shifts in which peoples, tongues, faiths, classes and organizations hold power.

## Play

Open `index.html` in a browser. It is one self-contained file: no network, no libraries. Progress is saved in the browser after every choice, and saves can be exported as text from the Menu.

With GitHub Pages enabled for this repository (Settings, Pages, deploy from branch `main`, folder `/`), the game is playable at `https://<user>.github.io/<repository>/`.

Keys: 1 to 9 choose, Enter continues.

## What you can know

Numbers appear only when your realm has the means to count them. Before writing, everything is reported in words, through counsellors who shade what they say about their own people. Far and unintegrated lands are known vaguely. After each return you first get the regents' account, which may be false.

## Self-test

Open `index.html#debug` (or `?debug=1`). It validates the data and simulates 500 band-era games and 120 full games with bot players.

## Build

`./build.sh` concatenates `src/` into `index.html`.

- `src/data.js`, `ev1.js`, `ev2.js`, `data2.js`: peoples, lands, laws, events, strings
- `src/eng1.js`, `eng2.js`: simulation, council, lives, recognition
- `src/band.js`: the Age of Bands
- `src/know.js`: knowledge levels and sources
- `src/debug.js`: validation and bots
- `src/ui.js`, `shell.html`: interface

## Docs

- `docs/fable-build-prompt.md`: the design and build prompt the game was generated from.

## Status

The Age of Bands is tuned up to the point of settling. The later game has not been rebalanced since the new opening was added.
