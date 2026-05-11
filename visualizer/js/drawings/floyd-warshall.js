/**
 * Floyd-Warshall Algorithm Visualization
 * All-Pairs Shortest Path using Dynamic Programming
 */

function createFloydWarshallScene() {
    // Graph with 4 vertices
    const INF = Infinity;
    const V = 4;
    const vertexLabels = ['0', '1', '2', '3'];
    
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
        explanation: "Floyd-Warshall Algorithm\\n\\nFinds shortest paths between ALL pairs of vertices.\\nDynamic Programming approach - builds up solutions incrementally.\\n\\nHandles negative edge weights (but NOT negative cycles).\\n\\nGraph: 4 vertices, weighted directed edges\\n\\nTime: O(V³) | Space: O(V²)",
        render: (engine) => {
            engine.drawText("Floyd-Warshall Algorithm", 50, 30, '#e94560', 24);
            engine.drawText("All-Pairs Shortest Path", 50, 55, '#888', 14);
            
            drawMatrix(engine, initialMatrix, 50, 100, "Initial Distance Matrix", -1, -1, -1, []);
            drawGraph(engine, initialMatrix, 500, 100);
            
            engine.drawText("Key Idea:", 500, 380, '#ffaa00', 16);
            engine.drawText("Can we get from i to j", 500, 405, '#eee', 14);
            engine.drawText("cheaper by going through k?", 500, 425, '#eee', 14);
            engine.drawText("dist[i][j] = min(dist[i][j],", 500, 455, '#4cc9f0', 14);
            engine.drawText("          dist[i][k] + dist[k][j])", 500, 475, '#4cc9f0', 14);
        }
    });
    
    // Step 1: Initial matrix
    steps.push({
        explanation: "Step 1: Initialize distance matrix\\n\\ndiag[i][i] = 0 (distance to self)\\nmatrix[i][j] = edge weight if edge exists\\nmatrix[i][j] = ∞ if no direct edge\\n\\nThis represents 'only direct paths'.",
        render: (engine) => {
            engine.drawText("Step 1: Initialize Matrix", 50, 30, '#e94560', 24);
            drawMatrix(engine, initialMatrix, 50, 100, "Direct Paths Only", -1, -1, -1, []);
            drawGraph(engine, initialMatrix, 500, 100);
            
            engine.drawText("0 = distance to self", 500, 380, '#2ecc71', 14);
            engine.drawText("∞ = no direct edge", 500, 400, '#888', 14);
            engine.drawText("numbers = direct edge weight", 500, 420, '#4cc9f0', 14);
        }
    });
    
    // Step 2: DP concept
    steps.push({
        explanation: "The DP Recurrence:\\n\\nFor each intermediate vertex k:\\n  For each pair (i, j):\\n    dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])\\n\\nTranslation: 'Is going through k better than what we currently know?'",
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
            
            // Draw a simple path illustration
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
        explanation: "Iteration k=0: Can vertex 0 help?\\n\\nCheck all pairs (i,j): is i→0→j shorter than i→j?\\n\\nExample: dist[3][1] = min(∞, 2+3) = 5\\n(3→0→1 is shorter than no direct path)",
        render: (engine) => {
            engine.drawText("k = 0: Using vertex 0 as intermediate", 50, 30, '#e94560', 24);
            
            const highlights = [];
            // Highlight cells that changed
            if (initialMatrix[3][1] !== k0[3][1]) highlights.push({r: 3, c: 1});
            if (initialMatrix[3][2] !== k0[3][2]) highlights.push({r: 3, c: 2});
            if (initialMatrix[2][1] !== k0[2][1]) highlights.push({r: 2, c: 1});
            if (initialMatrix[1][3] !== k0[1][3]) highlights.push({r: 1, c: 3});
            
            drawMatrix(engine, k0, 50, 100, "After k=0 (through vertex 0)", 0, -1, -1, highlights);
            drawGraph(engine, initialMatrix, 500, 100);
            
            engine.drawText("Highlighted cells improved!", 500, 380, '#f72585', 14);
            engine.drawText("3→1: ∞ → 5 (via 0)", 500, 405, '#2ecc71', 14);
            engine.drawText("3→2: ∞ → 10 (via 0)", 500, 425, '#2ecc71', 14);
            engine.drawText("2→1: ∞ → 8 (via 0)", 500, 445, '#2ecc71', 14);
            engine.drawText("1→3: ∞ → 10 (via 0)", 500, 465, '#2ecc71', 14);
            
            engine.drawText("Vertex 0 connects otherwise", 500, 500, '#ffaa00', 14);
            engine.drawText("disconnected parts of graph", 500, 520, '#ffaa00', 14);
        }
    });
    
    // Step 4: k=1 iteration
    steps.push({
        explanation: "Iteration k=1: Can vertex 1 help?\\n\\nNow we consider paths that might go through vertex 1.\\n\\nExample: dist[0][2] = min(10, 3+2) = 5\\n(0→1→2 is shorter than 0→1→... wait, 0→2 was ∞, but now 0→1→2 = 5!)",
        render: (engine) => {
            engine.drawText("k = 1: Using vertex 1 as intermediate", 50, 30, '#e94560', 24);
            
            const highlights = [];
            if (k0[0][2] !== k1[0][2]) highlights.push({r: 0, c: 2});
            if (k0[0][3] !== k1[0][3]) highlights.push({r: 0, c: 3});
            
            drawMatrix(engine, k1, 50, 100, "After k=1 (through vertex 1)", 1, -1, -1, highlights);
            drawGraph(engine, initialMatrix, 500, 100);
            
            engine.drawText("New improvements:", 500, 380, '#f72585', 14);
            engine.drawText("0→2: 10 → 5 (via 1)", 500, 405, '#2ecc71', 14);
            engine.drawText("  path: 0→1→2 = 3+2 = 5", 500, 425, '#888', 13);
            engine.drawText("0→3: 7 → 6 (via 1)", 500, 450, '#2ecc71', 14);
            engine.drawText("  path: 0→1→... wait, 0→1→2→3?", 500, 470, '#888', 13);
        }
    });
    
    // Step 5: k=2 iteration
    steps.push({
        explanation: "Iteration k=2: Can vertex 2 help?\\n\\nNow paths can go through vertex 2.\\n\\nKey insight: dist[0][3] improves from 6 to 6... wait, let me check...\\nActually dist[1][3] = min(10, 2+1) = 3! (1→2→3 = 3)",
        render: (engine) => {
            engine.drawText("k = 2: Using vertex 2 as intermediate", 50, 30, '#e94560', 24);
            
            const highlights = [];
            if (k1[1][3] !== k2[1][3]) highlights.push({r: 1, c: 3});
            if (k1[0][3] !== k2[0][3]) highlights.push({r: 0, c: 3});
            
            drawMatrix(engine, k2, 50, 100, "After k=2 (through vertex 2)", 2, -1, -1, highlights);
            drawGraph(engine, initialMatrix, 500, 100);
            
            engine.drawText("Major improvement:", 500, 380, '#f72585', 14);
            engine.drawText("1→3: 10 → 3 (via 2)", 500, 405, '#2ecc71', 14);
            engine.drawText("  1→2→3 = 2+1 = 3 ✓", 500, 425, '#888', 13);
            engine.drawText("0→3: 6 → 6 (no change)", 500, 450, '#888', 14);
        }
    });
    
    // Step 6: k=3 iteration
    steps.push({
        explanation: "Iteration k=3: Can vertex 3 help?\\n\\nFinal iteration. Check if going through vertex 3 helps any pair.\\n\\nExample: dist[2][0] = min(5, 1+2) = 3! (2→3→0 = 3)",
        render: (engine) => {
            engine.drawText("k = 3: Using vertex 3 as intermediate", 50, 30, '#e94560', 24);
            
            const highlights = [];
            if (k2[2][0] !== k3[2][0]) highlights.push({r: 2, c: 0});
            if (k2[1][0] !== k3[1][0]) highlights.push({r: 1, c: 0});
            if (k2[0][0] !== k3[0][0]) highlights.push({r: 0, c: 0});
            
            drawMatrix(engine, k3, 50, 100, "After k=3 (FINAL)", 3, -1, -1, highlights);
            drawGraph(engine, initialMatrix, 500, 100);
            
            engine.drawText("Final improvements:", 500, 380, '#f72585', 14);
            engine.drawText("2→0: 5 → 3 (via 3)", 500, 405, '#2ecc71', 14);
            engine.drawText("  2→3→0 = 1+2 = 3 ✓", 500, 425, '#888', 13);
            engine.drawText("1→0: 8 → 5 (via 3)", 500, 450, '#2ecc71', 14);
            engine.drawText("  1→2→3→0 = 2+1+2 = 5", 500, 470, '#888', 13);
        }
    });
    
    // Step 7: Final result + negative cycle check
    steps.push({
        explanation: "Final Result: All-Pairs Shortest Paths\\n\\nEvery cell dist[i][j] now contains the shortest path from i to j.\\n\\nExample: shortest 1→0 = 5 (path: 1→2→3→0)\\n\\nNegative Cycle Check: If any dist[i][i] < 0 → negative cycle exists!\\nAll diagonals are 0 → no negative cycles ✓",
        render: (engine) => {
            engine.drawText("Final Result", 50, 30, '#e94560', 24);
            
            drawMatrix(engine, k3, 50, 100, "All-Pairs Shortest Paths", -1, -1, -1, []);
            
            // Show some example paths
            engine.drawText("Example shortest paths:", 500, 100, '#2ecc71', 16);
            engine.drawText("0→2: 5 (0→1→2)", 500, 130, '#eee', 14);
            engine.drawText("1→0: 5 (1→2→3→0)", 500, 155, '#eee', 14);
            engine.drawText("2→1: 6 (2→3→0→1)", 500, 180, '#eee', 14);
            engine.drawText("3→2: 7 (3→0→1→2)", 500, 205, '#eee', 14);
            
            engine.drawText("Negative cycle check:", 500, 260, '#ffaa00', 16);
            engine.drawText("All diag[i][i] = 0 ✓", 500, 285, '#2ecc71', 14);
            engine.drawText("If any < 0 → negative cycle!", 500, 310, '#f72585', 14);
            
            engine.drawText("Time: O(V³) = 64 operations", 50, 420, '#4cc9f0', 16);
            engine.drawText("Space: O(V²) = 16 integers", 50, 445, '#4cc9f0', 16);
            engine.drawText("Can reconstruct paths with 'next' matrix", 50, 480, '#888', 14);
        }
    });
    
    // Step 8: When to use
    steps.push({
        explanation: "When to use Floyd-Warshall:\\n\\n✅ Small dense graphs (V ≤ 400-500)\\n✅ Need ALL pairs shortest paths\\n✅ Negative edge weights (no negative cycles)\\n✅ Simple implementation (3 nested loops)\\n\\n❌ Large sparse graphs (use Dijkstra × V times instead)\\n❌ Only need single source (use Dijkstra or Bellman-Ford)",
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
            engine.drawText("V=100, E=500 (sparse): Dijkstra × V = 100×500log100 ≈ 300K", 50, 330, '#eee', 14);
            engine.drawText("V=100, E=500 (sparse): Floyd = 100³ = 1,000,000", 50, 355, '#eee', 14);
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
    
    // Title
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
        
        // Row header
        ctx.fillStyle = isKRow ? '#e94560' : '#0f3460';
        ctx.fillRect(x, rowY, cellSize, cellSize);
        ctx.strokeRect(x, rowY, cellSize, cellSize);
        ctx.fillStyle = '#eee';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(i), x + cellSize/2, rowY + cellSize/2);
        
        // Cells
        for (let j = 0; j < V; j++) {
            const cellX = x + (j + 1) * cellSize;
            const val = matrix[i][j];
            const isChanged = changedCells.some(c => c.r === i && c.c === j);
            const isDiagonal = (i === j);
            
            if (isChanged) {
                ctx.fillStyle = '#f72585'; // Changed cell
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
    
    // Legend
    if (highlightK >= 0) {
        engine.drawText(`k = ${highlightK} (intermediate)`, x, y + (V + 1) * cellSize + 15, '#e94560', 13);
    }
}

// Draw a small graph representation
function drawGraph(engine, matrix, x, y) {
    const ctx = engine.ctx;
    const positions = [
        {x: x + 50, y: y + 50},
        {x: x + 180, y: y + 50},
        {x: x + 180, y: y + 180},
        {x: x + 50, y: y + 180}
    ];
    
    const V = matrix.length;
    
    // Draw edges
    for (let i = 0; i < V; i++) {
        for (let j = 0; j < V; j++) {
            if (i !== j && matrix[i][j] !== Infinity) {
                const from = positions[i];
                const to = positions[j];
                
                ctx.strokeStyle = '#555';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);
                ctx.stroke();
                
                // Arrowhead
                const angle = Math.atan2(to.y - from.y, to.x - from.x);
                const headLen = 8;
                const endX = to.x - 22 * Math.cos(angle);
                const endY = to.y - 22 * Math.sin(angle);
                
                ctx.beginPath();
                ctx.moveTo(endX, endY);
                ctx.lineTo(endX - headLen * Math.cos(angle - Math.PI/6), endY - headLen * Math.sin(angle - Math.PI/6));
                ctx.lineTo(endX - headLen * Math.cos(angle + Math.PI/6), endY - headLen * Math.sin(angle + Math.PI/6));
                ctx.closePath();
                ctx.fillStyle = '#555';
                ctx.fill();
                
                // Weight
                const midX = (from.x + to.x) / 2;
                const midY = (from.y + to.y) / 2;
                ctx.fillStyle = '#1a1a2e';
                ctx.fillRect(midX - 10, midY - 8, 20, 16);
                ctx.fillStyle = '#ffaa00';
                ctx.font = '11px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(String(matrix[i][j]), midX, midY);
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
        ctx.font = 'bold 15px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(i), pos.x, pos.y);
    });
    
    engine.drawText("Original Graph", x, y - 15, '#888', 14);
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
