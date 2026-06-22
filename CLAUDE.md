# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

No centralized build system — everything runs per file.

**C++ solution (build + run embedded test harness):**
```bash
g++ -std=c++17 -o /tmp/problem solutions/<problem>.cpp && /tmp/problem
```

**Visualizer:** Open `visualizer/index.html` directly in a browser — no bundler or dev server needed.

**JS template:** `node templates/problem-template.js`

**C# template:** `csc templates/problem-template.cs && mono problem-template.exe`

## Architecture

Two main components:

### 1. Practice workspace
- `templates/` — starter files with a `Solution` class and embedded test harness (C++, C#, JS)
- `solutions/` — standalone solved problem files, each self-contained and executable
- `neetcode-progress.json` — spaced repetition tracking (confidence 1–5, review dates, notes per problem)
- `concepts/` and `sessions/` — study notes and session logs

### 2. Browser visualizer (`visualizer/`)
- `js/engine.js` — canvas drawing primitives; defines canonical color keys: `read`, `write`, `compare`, `found`, `current` — reuse these in all scene highlights instead of ad-hoc colors
- `js/scenes.js` — `SceneManager` class: scene registry, step navigation (prev/next), autoplay, panel updates
- `js/drawings/*.js` — scene generator functions per topic (e.g., `arrays.js`, `floyd-warshall.js`)
- `js/app.js` — instantiates engine/manager, registers scenes, binds UI events
- `index.html` — wires UI controls, canvas, script loading order, and dropdown entries

**Scene contract:** each scene function returns a `steps` array; each step has `explanation` (string), optional `timeComplexity`/`spaceComplexity`, and `render(engine)` callback.

**Wiring a new visualization requires four manual steps:**
1. Define scene function in `visualizer/js/drawings/*.js`
2. Register in `visualizer/js/app.js` via `sceneManager.register('<id>', createXxxScene)`
3. Add dropdown `<option>` in `visualizer/index.html`
4. If adding a new drawings file, add its `<script src="...">` in `index.html`

## Key conventions

**C++ style:** `#include <bits/stdc++.h>`, `using namespace std;`, fast I/O (`ios::sync_with_stdio(false); cin.tie(nullptr)`) in `main()`.

**Solution structure:** problem logic in `class Solution` methods; test harness in `main()` using a lambda test runner; returns non-zero on any failed case and prints PASS/FAIL per case.

**Skills:** root `SKILL.md` defines a 7-phase Socratic tutoring protocol for NeetCode 150 problems and references `neetcode-progress.json` for spaced repetition. `visualizer/SKILL.md` prescribes the workflow for building new visualizations.
