/**
 * Floyd-Warshall Algorithm Visualization
 * All-Pairs Shortest Path using Dynamic Programming
 */

function createFloydWarshallScene() {
    const INF = Infinity;
    const V = 4;

    // Adjacency matrix (initial distances)
    const initialMatrix = [
        [0, 3, INF, 7],
        [8, 0, 2, INF],
        [5, INF, 0, 1],
        [2, INF, INF, 0]
    ];

    // Precomputed matrices for each k iteration
    const matrices = [];
    matrices.push(JSON.parse(JSON.stringify(initialMatrix))); // k=-1 (initial)

    // k=0 (through vertex 0)
    const k0 = JSON.parse(JSON.stringify(initialMatrix));
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (k0[i][0] + k0[0][j] < k0[i][j]) {
                k0[i][j] = k0[i][0] + k0[0][j];
            }
        }
    }
    matrices.push(k0);

    // k=1 (through vertex 1)
    const k1 = JSON.parse(JSON.stringify(k0));
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (k1[i][1] + k1[1][j] < k1[i][j]) {
                k1[i][j] = k1[i][1] + k1[1][j];
            }
        }
    }
    matrices.push(k1);

    // k=2 (through vertex 2)
    const k2 = JSON.parse(JSON.stringify(k1));
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (k2[i][2] + k2[2][j] < k2[i][j]) {
                k2[i][j] = k2[i][2] + k2[2][j];
            }
        }
    }
    matrices.push(k2);

    // k=3 (through vertex 3)
    const k3 = JSON.parse(JSON.stringify(k2));
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (k3[i][3] + k3[3][j] < k3[i][j]) {
                k3[i][j] = k3[i][3] + k3[3][j];
            }
        }
    }
    matrices.push(k3);

    const steps = [];

    // Step 0: Introduction
    steps.push({
        explanation: "Floyd-Warshall Algorithm\n\nFinds shortest paths between ALL pairs of vertices.\nDynamic Programming: builds up solutions incrementally.\n\nHandles negative edge weights (but NOT negative cycles).\n\nGraph: 4 vertices (0-3), weighted directed edges\n\nTime: O(V³) | Space: O(V²)",
        render: (engine) => {
            engine.drawText("Floyd-Warshall Algorithm", 50, 30, '#e94560', 24);
            engine.drawText("All-Pairs Shortest Path", 50, 55, '#888', 14);

            drawMatrix(engine, initialMatrix, 50, 100, "Initial Distance Matrix", -1, -1, -1, []);
            drawGraph(engine, initialMatrix, 500, 80);

            engine.drawText("Key Idea:", 500, 400, '#ffaa00', 16);
            engine.drawText("Can we get from i to j", 500, 425, '#eee', 14);
            engine.drawText("cheaper by going through k?", 500, 445, '#eee', 14);
            engine.drawText("dist[i][j] = min(dist[i][j],", 500, 475, '#4cc9f0', 14);
            engine.drawText("          dist[i][k] + dist[k][j])", 500, 495, '#4cc9f0', 14);
        }
    });

    // Step 1: Initial matrix
    steps.push({
        explanation: "Step 1: Initialize distance matrix\n\ndiag[i][i] = 0 (distance to self)\nmatrix[i][j] = edge weight if edge exists\nmatrix[i][j] = ∞ if no direct edge\n\nThis represents 'only direct paths'.",
        render: (engine) => {
            engine.drawText("Step 1: Initialize Matrix", 50, 30, '#e94560', 24);
            drawMatrix(engine, initialMatrix, 50, 100, "Direct Paths Only", -1, -1, -1, []);
            drawGraph(engine, initialMatrix, 500, 80);

            engine.drawText("0 = distance to self", 500, 400, '#2ecc71', 14);
            engine.drawText("∞ = no direct edge", 500, 420, '#888', 14);
            engine.drawText("numbers = direct edge weight", 500, 440, '#4cc9f0', 14);
        }
    });

    // Step 2: DP concept
    steps.push({
        explanation: "The DP Recurrence:\n\nFor each intermediate vertex k:\n  For each pair (i, j):\n    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])\n\nTranslation: 'Is going through k better than what we currently know?'",
        render: (engine) => {
            engine.drawText("The Core Logic", 50, 30, '#e94560', 24);

            engine.drawText("for k = 0 to V-1:", 50, 100, '#eee', 16);
            engine.drawText("  for i = 0 to V-1:", 70, 125, '#eee', 16);
            engine.drawText("    for j = 0 to V-1:", 90, 150, '#eee', 16);
            engine.drawText("      if dist[i][k] + dist[k][j] < dist[i][j]:", 110, 175, '#4cc9f0', 15);
            engine.drawText("        dist[i][j] = dist[i][k] + dist[k][j]", 130, 200, '#f72585', 15);

            engine.drawText("This is the KEY recurrence:", 50, 250, '#ffaa00', 16);
            engine.drawText("dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])", 50, 280, '#4cc9f0', 16);

            engine.drawText("Think of it as:", 50, 330, '#eee', 16);
            engine.drawText("'Can vertex k be a useful middleman?'", 50, 355, '#eee', 16);

            const ctx = engine.ctx;
            drawNode(ctx, 100, 450, 'i', '#0f3460');
            drawNode(ctx, 300, 450, 'k', '#e94560');
            drawNode(ctx, 500, 450, 'j', '#0f3460');

            ctx.strokeStyle = '#555';
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(125, 450); ctx.lineTo(275, 450); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(325, 450); ctx.lineTo(475, 450); ctx.stroke();

            ctx.fillStyle = '#888';
            ctx.font = '14px monospace';
            ctx.textAlign = 'center';
            ctx.fillText("dist[i][k]", 200, 440);
            ctx.fillText("dist[k][j]", 400, 440);

            ctx.strokeStyle = '#555';
            ctx.setLineDash([5, 5]);
            ctx.beginPath(); ctx.moveTo(125, 450); ctx.lineTo(475, 450); ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = '#888';
            ctx.fillText("dist[i][j] (current best)", 300, 490);
        }
    });

    // Step 3: k=0 iteration
    steps.push({
        explanation: "Iteration k=0: Can vertex 0 help?\n\nCheck all pairs (i,j): is i→0→j shorter than i→j?\n\nChanges found:\n  1→3: 8+7=15 < ∞\n  2→1: 5+3=8 < ∞\n  3→1: 2+3=5 < ∞",
        render: (engine) => {
            engine.drawText("k = 0: Using vertex 0 as intermediate", 50, 30, '#e94560', 24);

            const highlights = [];
            if (initialMatrix[1][3] !== k0[1][3]) highlights.push({r: 1, c: 3});
            if (initialMatrix[2][1] !== k0[2][1]) highlights.push({r: 2, c: 1});
            if (initialMatrix[3][1] !== k0[3][1]) highlights.push({r: 3, c: 1});

            drawMatrix(engine, k0, 50, 100, "After k=0 (through vertex 0)", 0, -1, -1, highlights);
            drawGraph(engine, initialMatrix, 500, 80);

            engine.drawText("Highlighted cells improved!", 500, 400, '#f72585', 14);
            engine.drawText("1→3: ∞ → 15 (via 0)", 500, 425, '#2ecc71', 14);
            engine.drawText("  (1→0=8) + (0→3=7) = 15", 500, 445, '#888', 12);
            engine.drawText("2→1: ∞ → 8 (via 0)", 500, 465, '#2ecc71', 14);
            engine.drawText("  (2→0=5) + (0→1=3) = 8", 500, 485, '#888', 12);
            engine.drawText("3→1: ∞ → 5 (via 0)", 500, 505, '#2ecc71', 14);
            engine.drawText("  (3→0=2) + (0→1=3) = 5", 500, 525, '#888', 12);
        }
    });

    // Step 4: k=1 iteration
    steps.push({
        explanation: "Iteration k=1: Can vertex 1 help?\n\nNow we consider paths through vertex 1.\n\nChanges found:\n  0→2: 3+2=5 < ∞\n  3→2: 5+2=7 < ∞",
        render: (engine) => {
            engine.drawText("k = 1: Using vertex 1 as intermediate", 50, 30, '#e94560', 24);

            const highlights = [];
            if (k0[0][2] !== k1[0][2]) highlights.push({r: 0, c: 2});
            if (k0[3][2] !== k1[3][2]) highlights.push({r: 3, c: 2});

            drawMatrix(engine, k1, 50, 100, "After k=1 (through vertex 1)", 1, -1, -1, highlights);
            drawGraph(engine, initialMatrix, 500, 80);

            engine.drawText("New improvements:", 500, 400, '#f72585', 14);
            engine.drawText("0→2: ∞ → 5 (via 1)", 500, 425, '#2ecc71', 14);
            engine.drawText("  (0→1=3) + (1→2=2) = 5", 500, 445, '#888', 12);
            engine.drawText("3→2: ∞ → 7 (via 1)", 500, 465, '#2ecc71', 14);
            engine.drawText("  (3→1=5) + (1→2=2) = 7", 500, 485, '#888', 12);
        }
    });

    // Step 5: k=2 iteration
    steps.push({
        explanation: "Iteration k=2: Can vertex 2 help?\n\nNow paths can go through vertex 2.\n\nChanges found:\n  0→3: 5+1=6 < 7\n  1→0: 2+5=7 < 8\n  1→3: 2+1=3 < 15",
        render: (engine) => {
            engine.drawText("k = 2: Using vertex 2 as intermediate", 50, 30, '#e94560', 24);

            const highlights = [];
            if (k1[0][3] !== k2[0][3]) highlights.push({r: 0, c: 3});
            if (k1[1][0] !== k2[1][0]) highlights.push({r: 1, c: 0});
            if (k1[1][3] !== k2[1][3]) highlights.push({r: 1, c: 3});

            drawMatrix(engine, k2, 50, 100, "After k=2 (through vertex 2)", 2, -1, -1, highlights);
            drawGraph(engine, initialMatrix, 500, 80);

            engine.drawText("Major improvements:", 500, 400, '#f72585', 14);
            engine.drawText("0→3: 7 → 6 (via 2)", 500, 425, '#2ecc71', 14);
            engine.drawText("  (0→2=5) + (2→3=1) = 6", 500, 445, '#888', 12);
            engine.drawText("1→0: 8 → 7 (via 2)", 500, 465, '#2ecc71', 14);
            engine.drawText("  (1→2=2) + (2→0=5) = 7", 500, 485, '#888', 12);
            engine.drawText("1→3: 15 → 3 (via 2)", 500, 505, '#2ecc71', 14);
            engine.drawText("  (1→2=2) + (2→3=1) = 3", 500, 525, '#888', 12);
        }
    });

    // Step 6: k=3 iteration
    steps.push({
        explanation: "Iteration k=3: Can vertex 3 help?\n\nFinal iteration. Check if going through vertex 3 helps.\n\nChanges found:\n  1→0: 3+2=5 < 7\n  2→0: 1+2=3 < 5\n  2→1: 1+5=6 < 8",
        render: (engine) => {
            engine.drawText("k = 3: Using vertex 3 as intermediate", 50, 30, '#e94560', 24);

            const highlights = [];
            if (k2[1][0] !== k3[1][0]) highlights.push({r: 1, c: 0});
            if (k2[2][0] !== k3[2][0]) highlights.push({r: 2, c: 0});
            if (k2[2][1] !== k3[2][1]) highlights.push({r: 2, c: 1});

            drawMatrix(engine, k3, 50, 100, "After k=3 (FINAL)", 3, -1, -1, highlights);
            drawGraph(engine, initialMatrix, 500, 80);

            engine.drawText("Final improvements:", 500, 400, '#f72585', 14);
            engine.drawText("1→0: 7 → 5 (via 3)", 500, 425, '#2ecc71', 14);
            engine.drawText("  (1→3=3) + (3→0=2) = 5", 500, 445, '#888', 12);
            engine.drawText("2→0: 5 → 3 (via 3)", 500, 465, '#2ecc71', 14);
            engine.drawText("  (2→3=1) + (3→0=2) = 3", 500, 485, '#888', 12);
            engine.drawText("2→1: 8 → 6 (via 3)", 500, 505, '#2ecc71', 14);
            engine.drawText("  (2→3=1) + (3→1=5) = 6", 500, 525, '#888', 12);
        }
    });

    // Step 7: Final result + negative cycle check
    steps.push({
        explanation: "Final Result: All-Pairs Shortest Paths\n\nEvery cell dist[i][j] now contains the shortest path from i to j.\n\nExample: shortest 1→0 = 5 (path: 1→3→0)\n\nNegative Cycle Check: If any dist[i][i] < 0 → negative cycle exists!\nAll diagonals are 0 → no negative cycles ✓",
        render: (engine) => {
            engine.drawText("Final Result", 50, 30, '#e94560', 24);

            drawMatrix(engine, k3, 50, 100, "All-Pairs Shortest Paths", -1, -1, -1, []);

            engine.drawText("Example shortest paths:", 500, 100, '#2ecc71', 16);
            engine.drawText("0→2: 5 (0→1→2)", 500, 130, '#eee', 14);
            engine.drawText("1→0: 5 (1→3→0)", 500, 155, '#eee', 14);
            engine.drawText("1→3: 3 (1→2→3)", 500, 180, '#eee', 14);
            engine.drawText("2→0: 3 (2→3→0)", 500, 205, '#eee', 14);
            engine.drawText("2→1: 6 (2→3→0→1)", 500, 230, '#eee', 14);
            engine.drawText("3→2: 7 (3→0→1→2)", 500, 255, '#eee', 14);

            engine.drawText("Negative cycle check:", 500, 300, '#ffaa00', 16);
            engine.drawText("All diag[i][i] = 0 ✓", 500, 325, '#2ecc71', 14);
            engine.drawText("If any < 0 → negative cycle!", 500, 350, '#f72585', 14);

            engine.drawText("Time: O(V³) = 64 operations", 50, 420, '#4cc9f0', 16);
            engine.drawText("Space: O(V²) = 16 integers", 50, 445, '#4cc9f0', 16);
            engine.drawText("Can reconstruct paths with 'next' matrix", 50, 480, '#888', 14);
        }
    });

    // Step 8: When to use
    steps.push({
        explanation: "When to use Floyd-Warshall:\n\n✅ Small dense graphs (V ≤ 400-500)\n✅ Need ALL pairs shortest paths\n✅ Negative edge weights (no negative cycles)\n✅ Simple implementation (3 nested loops)\n\n❌ Large sparse graphs (use Dijkstra × V times instead)\n❌ Only need single source (use Dijkstra or Bellman-Ford)",
        render: (engine) => {
            engine.drawText("When to Use Floyd-Warshall", 50, 30, '#e94560', 24);

            const pros = [
                "✅ All-pairs shortest path",
                "✅ Handles negative weights",
                "✅ Simple code (3 nested loops)",
                "✅ Can reconstruct paths",
                "✅ Good for dense graphs"
            ];

            const cons = [
                "❌ O(V³) - slow for large V",
                "❌ O(V²) space",
                "❌ Not good for sparse graphs",
                "❌ Can't handle negative cycles"
            ];

            engine.drawText("Pros:", 50, 100, '#2ecc71', 18);
            pros.forEach((item, i) => {
                engine.drawText(item, 50, 130 + i * 28, '#eee', 15);
            });

            engine.drawText("Cons:", 350, 100, '#f72585', 18);
            cons.forEach((item, i) => {
                engine.drawText(item, 350, 130 + i * 28, '#eee', 15);
            });

            engine.drawText("Comparison:", 50, 300, '#ffaa00', 18);
            engine.drawText("V=100, E=500 (sparse): Dijkstra × V ≈ 300K", 50, 330, '#eee', 14);
            engine.drawText("V=100, E=500 (sparse): Floyd = 1,000,000", 50, 355, '#eee', 14);
            engine.drawText("V=100, E=5000 (dense): Dijkstra × V ≈ 3,000,000", 50, 385, '#eee', 14);
            engine.drawText("V=100, E=5000 (dense): Floyd = 1,000,000 ✓", 50, 410, '#2ecc71', 14);

            engine.drawText("Rule of thumb: V > 400 → consider Dijkstra per source", 50, 460, '#ffaa00', 16);
        }
    });

    return steps;
}

// Draw the distance matrix
function drawMatrix(engine, matrix, x, y, title, highlightK, highlightI, highlightJ, changedCells) {
    const ctx = engine.ctx;
    const cellSize = 55;
    const V = matrix.length;

    engine.drawText(title, x, y - 10, '#eee', 16);

    // Column headers
    ctx.fillStyle = '#0f3460';
    ctx.fillRect(x, y, cellSize, cellSize);
    ctx.strokeStyle = '#555';
    ctx.strokeRect(x, y, cellSize, cellSize);

    for (let j = 0; j < V; j++) {
        const hx = x + (j + 1) * cellSize;
        const isKCol = (j === highlightK);
        ctx.fillStyle = isKCol ? '#e94560' : '#0f3460';
        ctx.fillRect(hx, y, cellSize, cellSize);
        ctx.strokeRect(hx, y, cellSize, cellSize);
        ctx.fillStyle = '#eee';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(j), hx + cellSize/2, y + cellSize/2);
    }

    // Rows
    for (let i = 0; i < V; i++) {
        const rowY = y + (i + 1) * cellSize;
        const isKRow = (i === highlightK);

        ctx.fillStyle = isKRow ? '#e94560' : '#0f3460';
        ctx.fillRect(x, rowY, cellSize, cellSize);
        ctx.strokeRect(x, rowY, cellSize, cellSize);
        ctx.fillStyle = '#eee';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(i), x + cellSize/2, rowY + cellSize/2);

        for (let j = 0; j < V; j++) {
            const cellX = x + (j + 1) * cellSize;
            const val = matrix[i][j];
            const isChanged = changedCells.some(c => c.r === i && c.c === j);
            const isDiagonal = (i === j);

            if (isChanged) {
                ctx.fillStyle = '#f72585';
            } else if (isDiagonal) {
                ctx.fillStyle = '#16213e';
            } else {
                ctx.fillStyle = '#1a1a2e';
            }

            ctx.fillRect(cellX, rowY, cellSize, cellSize);
            ctx.strokeStyle = isChanged ? '#f72585' : '#555';
            ctx.lineWidth = isChanged ? 2 : 1;
            ctx.strokeRect(cellX, rowY, cellSize, cellSize);
            ctx.lineWidth = 1;

            ctx.fillStyle = val === Infinity ? '#555' : (isChanged ? '#2ecc71' : '#eee');
            ctx.font = isChanged ? 'bold 14px monospace' : '14px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const text = val === Infinity ? '∞' : String(val);
            ctx.fillText(text, cellX + cellSize/2, rowY + cellSize/2);
        }
    }

    if (highlightK >= 0) {
        engine.drawText(`k = ${highlightK} (intermediate)`, x, y + (V + 1) * cellSize + 15, '#e94560', 13);
    }
}

// Draw a directed graph with curved edges to avoid overlap
function drawGraph(engine, matrix, x, y) {
    const ctx = engine.ctx;

    // Diamond layout for clarity
    const positions = [
        {x: x + 125, y: y + 40},    // 0: top
        {x: x + 240, y: y + 120},   // 1: right
        {x: x + 125, y: y + 200},   // 2: bottom
        {x: x + 10,  y: y + 120}    // 3: left
    ];

    const V = matrix.length;

    // Draw edges with curves for bidirectional pairs
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (i !== j && matrix[i][j] !== Infinity) {
                const from = positions[i];
                const to = positions[j];
                const weight = matrix[i][j];

                // Check if reverse edge exists (for curve offset)
                const hasReverse = matrix[j][i] !== Infinity;
                const isReversePair = hasReverse && j < i; // Only handle once

                let startX = from.x, startY = from.y;
                let endX = to.x, endY = to.y;
                let cpX, cpY;
                let offset = 0;

                if (hasReverse) {
                    // Offset one of the bidirectional edges
                    offset = (i < j) ? 15 : -15;
                }

                // Calculate control point for quadratic curve
                const midX = (from.x + to.x) / 2;
                const midY = (from.y + to.y) / 2;
                const perpX = -(to.y - from.y);
                const perpY = (to.x - from.x);
                const len = Math.sqrt(perpX * perpX + perpY * perpY);
                if (len > 0) {
                    cpX = midX + (perpX / len) * offset;
                    cpY = midY + (perpY / len) * offset;
                } else {
                    cpX = midX;
                    cpY = midY;
                }

                // Shorten line to not overlap node
                const nodeRadius = 22;
                const tStart = nodeRadius / Math.sqrt((cpX - from.x)**2 + (cpY - from.y)**2);
                const tEnd = 1 - nodeRadius / Math.sqrt((to.x - cpX)**2 + (to.y - cpY)**2);

                const sx = (1 - tStart) * from.x + tStart * cpX;
                const sy = (1 - tStart) * from.y + tStart * cpY;
                const ex = (1 - tEnd) * cpX + tEnd * to.x;
                const ey = (1 - tEnd) * cpY + tEnd * to.y;

                // Draw curved edge
                ctx.strokeStyle = '#555';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.quadraticCurveTo(cpX, cpY, ex, ey);
                ctx.stroke();

                // Arrowhead at end
                const angle = Math.atan2(ey - cpY, ex - cpX);
                const headLen = 8;

                ctx.beginPath();
                ctx.moveTo(ex, ey);
                ctx.lineTo(ex - headLen * Math.cos(angle - Math.PI/6), ey - headLen * Math.sin(angle - Math.PI/6));
                ctx.lineTo(ex - headLen * Math.cos(angle + Math.PI/6), ey - headLen * Math.sin(angle + Math.PI/6));
                ctx.closePath();
                ctx.fillStyle = '#555';
                ctx.fill();

                // Weight label at midpoint of curve
                const labelT = 0.5;
                const labelX = (1 - labelT) * (1 - labelT) * from.x + 2 * (1 - labelT) * labelT * cpX + labelT * labelT * to.x;
                const labelY = (1 - labelT) * (1 - labelT) * from.y + 2 * (1 - labelT) * labelT * cpY + labelT * labelT * to.y;

                ctx.fillStyle = '#1a1a2e';
                ctx.beginPath();
                ctx.arc(labelX, labelY, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#555';
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.fillStyle = '#ffaa00';
                ctx.font = 'bold 11px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(String(weight), labelX, labelY);
            }
        }
    }

    // Draw nodes
    positions.forEach((pos, i) => {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = '#0f3460';
        ctx.fill();
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#eee';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(i), pos.x, pos.y);
    });

    engine.drawText("Original Graph", x + 125, y - 20, '#888', 14, 'center');
}

// Helper to draw a single node (for path illustration)
function drawNode(ctx, x, y, label, color) {
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = '#eee';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#eee';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, x, y);
}
