# Copilot instructions for `neetcode-150-brainstorming`

## Build, test, and lint commands

This repository does **not** use a centralized build system, test runner, or linter config. Work is run per file.

- **C++ problem file (build + run tests in that file's harness)**
  - `g++ -std=c++17 -o /tmp/problem solutions/<problem>.cpp && /tmp/problem`
  - Example: `g++ -std=c++17 -o /tmp/contains-duplicate solutions/contains-duplicate.cpp && /tmp/contains-duplicate`
- **Single-problem run (closest equivalent to "single test")**
  - Run exactly one problem file's embedded harness as above.
- **JavaScript template run**
  - `node templates/problem-template.js`
- **C# template run**
  - `csc templates/problem-template.cs && mono problem-template.exe`
- **Visualizer**
  - Open `visualizer/index.html` in a browser (no bundler or dev server required).

## High-level architecture

The repo has two main parts:

1. **Practice/workflow content**
   - `templates/` contains starter files with a `Solution` class plus a local test harness.
   - `solutions/` contains standalone solved problem files, each executable on its own.
   - `neetcode-progress.json` tracks spaced-repetition status/progress.
   - `concepts/` and `sessions/` store study notes and session logs.

2. **Browser visualizer (`visualizer/`)**
   - `visualizer/index.html` wires UI controls, canvas, and script loading order.
   - `visualizer/js/engine.js` defines canvas drawing primitives and canonical color keys.
   - `visualizer/js/scenes.js` provides `SceneManager` (scene registry, step navigation, autoplay, explanation/complexity panel updates).
   - `visualizer/js/drawings/*.js` contains scene generator functions for each topic/problem.
   - `visualizer/js/app.js` instantiates engine/manager, registers scenes, and binds UI events.

## Key conventions in this codebase

- **Use repository skills when relevant**:
  - Use root `SKILL.md` for NeetCode tutoring flow (Socratic progression, coding in templates/solutions, progress tracking in `neetcode-progress.json`).
  - Use `visualizer/SKILL.md` when the user asks for visual explanations ("draw it", "show visually", step-by-step animation).
  - For new visualizations, follow the skill-prescribed workflow: define steps in `visualizer/js/drawings/*.js`, register in `visualizer/js/app.js`, and expose in `visualizer/index.html`.
- **Solutions are standalone executables**: each C++ solution keeps problem logic and test harness in one file, returns non-zero on failed tests, and prints PASS/FAIL per case.
- **Core implementation shape**: problem logic lives in `class Solution` methods; harness code lives in `main()`.
- **C++ style in existing files**: `#include <bits/stdc++.h>`, `using namespace std;`, fast I/O setup in `main()`.
- **Visualizer scene contract**: each scene function returns a `steps` array where step objects use:
  - `explanation` (string shown in side panel)
  - optional `timeComplexity` / `spaceComplexity`
  - `render(engine)` callback
- **Visualizer wiring is manual and global-script based**:
  - add/modify scene function in `visualizer/js/drawings/*.js`
  - register in `visualizer/js/app.js` via `sceneManager.register('<id>', create...Scene)`
  - add dropdown entry in `visualizer/index.html`
  - if adding a new drawings file, add its `<script src="...">` in `index.html`
- **Color semantics are standardized by `engine.colors` keys** (`read`, `write`, `compare`, `found`, `current`); reuse these keys in scene highlights instead of ad-hoc names.
- **Project context from existing instruction files**: root `SKILL.md` defines a NeetCode-150 tutoring workflow and points to `neetcode-progress.json`; `visualizer/SKILL.md` defines how new visualizations should be structured and registered.
