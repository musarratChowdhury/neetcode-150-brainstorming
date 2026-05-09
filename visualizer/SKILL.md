---
name: neetcode-visualizer
description: "Generate HTML5 Canvas visualizations for NeetCode 150 DSA problems. Used to draw arrays, hash maps, trees, graphs, and animate algorithms step-by-step."
---

# NeetCode 150 Visualizer Skill

## Purpose

When explaining a DSA problem becomes complex with text alone, use this skill to generate interactive canvas-based visualizations. The student can open `visualizer/index.html` in a browser and step through the algorithm animation.

## When to Use

✅ **USE this skill when:**

- The student says "draw it" or "show me visually"
- Explaining pointer movements, sliding windows, or tree traversals
- Demonstrating how hash maps fill up or how graphs are explored
- The student is stuck on a concept and needs visual intuition
- Teaching spatial algorithms (matrix operations, geometry)

❌ **DON'T use this skill when:**

- The concept is simple enough with text (e.g., basic array iteration)
- The student is in the middle of coding and wants to focus on implementation
- Quick yes/no questions

## How to Generate Visualizations

### Step 1: Identify What to Draw

Determine the data structures involved:
- **Arrays:** Use `engine.drawArray()` with highlight colors
- **Hash Maps:** Use `engine.drawHashMap()` for key-value pairs
- **Pointers:** Use `engine.drawTwoPointers()` for left/right indices
- **Trees:** Use `engine.drawBinaryTree()` for recursive structures
- **Linked Lists:** Use `engine.drawLinkedList()` for node chains
- **Graphs:** Use `engine.drawArray()` for adjacency + arrows for edges

### Step 2: Break Into Steps

Each visualization should have 3-8 steps:
1. **Introduction:** Show the input, state the problem
2. **Setup:** Initialize data structures
3. **Iterations:** Show each key operation
4. **Result:** Highlight the answer

### Step 3: Write the Scene Function

Create a function in the appropriate `js/drawings/<category>.js` file:

```javascript
function createProblemNameScene() {
    const steps = [];
    
    // Step 0: Introduction
    steps.push({
        explanation: "Clear description of what this step shows",
        timeComplexity: "O(?)",
        spaceComplexity: "O(?)",
        render: (engine) => {
            // Draw the scene
            engine.drawText("Title", x, y, color, size);
            engine.drawArray(arr, x, y, highlights, size, gap);
            // ... more drawing
        }
    });
    
    return steps;
}
```

### Step 4: Register and Explain

Register in `js/app.js`:
```javascript
sceneManager.register('problem-name', createProblemNameScene);
```

Then tell the student:
> "I've created a visualization for this problem. Open `visualizer/index.html` and select '[Problem Name]' from the dropdown. Click 'Next' to step through the algorithm."

## Color Coding Legend

| Color | Hex | Meaning |
|-------|-----|---------|
| Read | `#4cc9f0` | Reading/accessing data |
| Write | `#f72585` | Writing/inserting data |
| Compare | `#ffaa00` | Comparing two values |
| Found | `#2ecc71` | Target found, success |
| Current | `#e94560` | Current index/element |

## Drawing API Reference

### Arrays
```javascript
engine.drawArray(arr, x, y, highlights, cellSize, gap)
// highlights: { index: 'color_key', ... }
```

### Hash Maps
```javascript
engine.drawHashMap(map, x, y, cellWidth, cellHeight, gap)
// map: { key: value, ... }
```

### Pointers
```javascript
engine.drawTwoPointers(arr, leftIdx, rightIdx, startX, startY, size, gap)
```

### Arrows
```javascript
engine.drawArrow(fromX, fromY, toX, toY, color, label)
```

### Text
```javascript
engine.drawText(text, x, y, color, fontSize, align)
```

### Trees
```javascript
engine.drawBinaryTree(root, x, y, level, spacing)
// root: { value, highlight, left, right }
```

### Linked Lists
```javascript
engine.drawLinkedList(nodes, startX, startY, spacing, size)
// nodes: [{ value, highlight }, ...]
```

## Example: Complete Visualization Code

Here's a template for a new problem visualization:

```javascript
function createMyProblemScene() {
    const input = [1, 2, 3, 4, 5];
    const steps = [];
    
    // Introduction
    steps.push({
        explanation: "Problem: Find X in the array.\\nApproach: Use Y algorithm.",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        render: (engine) => {
            engine.drawText("Problem Title", 50, 30, '#e94560', 24);
            engine.drawArray(input, 50, 100, {}, 50, 10);
            engine.drawText("Input array", 50, 170, '#888', 14);
        }
    });
    
    // Step 1
    steps.push({
        explanation: "Step 1: Check element at index 0.",
        render: (engine) => {
            engine.drawArray(input, 50, 100, {0: 'current'}, 50, 10);
            engine.drawText("Checking index 0", 50, 170, '#4cc9f0', 14);
        }
    });
    
    // Result
    steps.push({
        explanation: "Found it! Return the answer.",
        render: (engine) => {
            engine.drawArray(input, 50, 100, {2: 'found'}, 50, 10);
            engine.drawText("Answer found!", 50, 170, '#2ecc71', 18);
        }
    });
    
    return steps;
}
```

## Tips for Effective Visualizations

1. **Keep it simple:** 3-6 steps is ideal. Too many steps becomes tedious.
2. **Use colors purposefully:** Highlight what changed from the previous step.
3. **Show the data structure:** Always visualize the main DS (array, tree, etc.).
4. **Annotate:** Use text to explain what's happening at each step.
5. **Show pointers:** For index-based problems, always draw the pointer arrows.
6. **Compare before/after:** For modifying algorithms, show old vs new state.

## Common Visualization Patterns

### Array Traversal
- Highlight current index in `current` color
- Show previously visited in lighter color
- Mark found element in `found` color

### Two Pointers
- Draw `L` and `R` arrows above the array
- Show pointer movement between steps
- Highlight elements being compared

### Sliding Window
- Draw bracket `[ ]` over the window
- Show window expansion/contraction
- Track max/min inside window

### Hash Map Build
- Show array on left, map on right
- Animate insertions one by one
- Highlight lookups and collisions

### Tree/Graph Traversal
- Show visited nodes in `found` color
- Show current node in `current` color
- Draw traversal path with arrows
- Show queue/stack state for BFS/DFS

## Integration with Teaching Protocol

When using the visualizer during a session:

1. **Phase 1 (Pattern Primer):** Use visualizer to show the pattern in action on a simple example.
2. **Phase 2 (Problem Deconstruction):** Visualize the brute force approach to show why it's inefficient.
3. **Phase 3 (Guided Optimization):** Show the optimized approach side-by-side with brute force.
4. **Phase 5 (Critical Review):** Use visualizer to trace through edge cases (empty input, single element, etc.).

## File Locations

- Main page: `visualizer/index.html`
- Engine: `visualizer/js/engine.js`
- Scenes: `visualizer/js/drawings/arrays.js`, `hashmap.js`, `pointers.js`
- App logic: `visualizer/js/app.js`
- Styles: `visualizer/css/style.css`
