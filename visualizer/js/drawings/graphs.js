/**
 * Graph Algorithms Visualizations
 * Bellman-Ford, Dijkstra, etc.
 */

function createBellmanFordScene() {
    // Graph: nodes A, B, C, D, E with weighted edges
    const nodes = [
        { id: 'A', x: 100, y: 300 },
        { id: 'B', x: 300, y: 150 },
        { id: 'C', x: 500, y: 300 },
        { id: 'D', x: 300, y: 450 },
        { id: 'E', x: 700, y: 300 }
    ];
    
    const edges = [
        { from: 'A', to: 'B', weight: 4 },
        { from: 'A', to: 'D', weight: 2 },
        { from: 'B', to: 'C', weight: 3 },
        { from: 'B', to: 'E', weight: 2 },
        { from: 'D', to: 'B', weight: 1 },
        { from: 'D', to: 'C', weight: 5 },
        { from: 'C', to: 'E', weight: -5 }
    ];
    
    const steps = [];
    
    // Step 0: Introduction
    steps.push({
        explanation: "Bellman-Ford Algorithm\\n\\nFinds shortest paths from a source node to all other nodes.\\nHandles NEGATIVE edge weights (unlike Dijkstra).\\n\\nGraph: 5 nodes (A-E), 7 edges\\nSource: A\\n\\nTime: O(V × E) | Space: O(V)",
        timeComplexity: "O(V × E)",
        spaceComplexity: "O(V)",
        render: (engine) => {
            engine.drawText("Bellman-Ford Algorithm", 50, 30, '#e94560', 24);
            drawGraph(engine, nodes, edges, {}, {});
            
            // Legend
            engine.drawText("Source: A (green)", 600, 80, '#2ecc71', 14);
            engine.drawText("Edge weights shown on arrows", 600, 100, '#888', 14);
            engine.drawText("Note: C→E has weight -5 (negative!)", 600, 120, '#ffaa00', 14);
        }
    });
    
    // Step 1: Initialize distances
    const distances = { 'A': 0, 'B': Infinity, 'C': Infinity, 'D': Infinity, 'E': Infinity };
    steps.push({
        explanation: "Step 1: Initialize distances\\n\\ndistance[source] = 0\\ndistance[all others] = ∞ (infinity)\\n\\nThis means we don't know the shortest path yet.",
        render: (engine) => {
            engine.drawText("Step 1: Initialize Distances", 50, 30, '#e94560', 24);
            drawGraph(engine, nodes, edges, {}, {});
            drawDistances(engine, distances, 600, 150);
            
            engine.drawText("dist[A] = 0 (source)", 600, 350, '#2ecc71', 14);
            engine.drawText("dist[B..E] = ∞", 600, 370, '#888', 14);
        }
    });
    
    // Step 2: Relaxation Round 1 - Edge A→B (4)
    const dist1 = { ...distances };
    dist1['B'] = 4;
    steps.push({
        explanation: "Round 1, Edge 1: A → B (weight 4)\\n\\nIf dist[A] + 4 < dist[B]?\\n0 + 4 < ∞ ? YES!\\n\\ndist[B] = 4 (updated)",
        render: (engine) => {
            engine.drawText("Round 1: Relax A→B", 50, 30, '#e94560', 24);
            drawGraph(engine, nodes, edges, {'A': 'found', 'B': 'write'}, {'A→B': 'current'});
            drawDistances(engine, dist1, 600, 150);
            
            engine.drawText("0 + 4 = 4 < ∞ ✓", 600, 350, '#2ecc71', 14);
            engine.drawText("dist[B] updated: 4", 600, 370, '#f72585', 14);
        }
    });
    
    // Step 3: Relaxation Round 1 - Edge A→D (2)
    const dist2 = { ...dist1 };
    dist2['D'] = 2;
    steps.push({
        explanation: "Round 1, Edge 2: A → D (weight 2)\\n\\nIf dist[A] + 2 < dist[D]?\\n0 + 2 < ∞ ? YES!\\n\\ndist[D] = 2 (updated)",
        render: (engine) => {
            engine.drawText("Round 1: Relax A→D", 50, 30, '#e94560', 24);
            drawGraph(engine, nodes, edges, {'A': 'found', 'D': 'write'}, {'A→D': 'current'});
            drawDistances(engine, dist2, 600, 150);
            
            engine.drawText("0 + 2 = 2 < ∞ ✓", 600, 350, '#2ecc71', 14);
            engine.drawText("dist[D] updated: 2", 600, 370, '#f72585', 14);
        }
    });
    
    // Step 4: Relaxation Round 1 - Edge B→C (3)
    const dist3 = { ...dist2 };
    dist3['C'] = 7; // 4 + 3
    steps.push({
        explanation: "Round 1, Edge 3: B → C (weight 3)\\n\\nIf dist[B] + 3 < dist[C]?\\n4 + 3 = 7 < ∞ ? YES!\\n\\ndist[C] = 7 (updated)",
        render: (engine) => {
            engine.drawText("Round 1: Relax B→C", 50, 30, '#e94560', 24);
            drawGraph(engine, nodes, edges, {'B': 'found', 'C': 'write'}, {'B→C': 'current'});
            drawDistances(engine, dist3, 600, 150);
            
            engine.drawText("4 + 3 = 7 < ∞ ✓", 600, 350, '#2ecc71', 14);
            engine.drawText("dist[C] updated: 7", 600, 370, '#f72585', 14);
        }
    });
    
    // Step 5: Relaxation Round 1 - Edge D→B (1)
    const dist4 = { ...dist3 };
    dist4['B'] = 3; // 2 + 1 < 4
    steps.push({
        explanation: "Round 1, Edge 5: D → B (weight 1)\\n\\nIf dist[D] + 1 < dist[B]?\\n2 + 1 = 3 < 4 ? YES! Better path found!\\n\\ndist[B] = 3 (updated from 4)",
        render: (engine) => {
            engine.drawText("Round 1: Relax D→B (Improvement!)", 50, 30, '#e94560', 24);
            drawGraph(engine, nodes, edges, {'D': 'found', 'B': 'write'}, {'D→B': 'current'});
            drawDistances(engine, dist4, 600, 150);
            
            engine.drawText("2 + 1 = 3 < 4 ✓", 600, 350, '#2ecc71', 14);
            engine.drawText("dist[B] improved: 4 → 3", 600, 370, '#f72585', 16);
            engine.drawText("Via D is shorter!", 600, 395, '#ffaa00', 14);
        }
    });
    
    // Step 6: Relaxation Round 2 - Edge C→E (-5)
    const dist5 = { ...dist4 };
    dist5['E'] = 2; // 7 + (-5) = 2
    steps.push({
        explanation: "Round 2, Edge 7: C → E (weight -5)\\n\\nIf dist[C] + (-5) < dist[E]?\\n7 + (-5) = 2 < ∞ ? YES!\\n\\nNegative weight is OK! dist[E] = 2",
        render: (engine) => {
            engine.drawText("Round 2: Relax C→E (Negative Edge!)", 50, 30, '#e94560', 24);
            drawGraph(engine, nodes, edges, {'C': 'found', 'E': 'write'}, {'C→E': 'current'});
            drawDistances(engine, dist5, 600, 150);
            
            engine.drawText("7 + (-5) = 2 < ∞ ✓", 600, 350, '#2ecc71', 14);
            engine.drawText("dist[E] updated: 2", 600, 370, '#f72585', 14);
            engine.drawText("Bellman-Ford handles negatives!", 600, 395, '#ffaa00', 14);
        }
    });
    
    // Step 7: Final distances
    steps.push({
        explanation: "Final Shortest Paths from A:\\n\\nA → A: 0\\nA → D → B: 3 (was 4 via direct)\\nA → D → B → C: 6 (was 7)\\nA → D: 2\\nA → D → B → C → E: 1 (was 2)\\n\\nAll distances converged after V-1 = 4 rounds.",
        render: (engine) => {
            engine.drawText("Final Result", 50, 30, '#e94560', 24);
            drawGraph(engine, nodes, edges, 
                {'A': 'found', 'B': 'found', 'C': 'found', 'D': 'found', 'E': 'found'}, 
                {'A→D': 'found', 'D→B': 'found', 'B→C': 'found', 'C→E': 'found'}
            );
            drawDistances(engine, dist5, 600, 150);
            
            engine.drawText("Shortest path tree:", 50, 520, '#2ecc71', 16);
            engine.drawText("A→D→B→C→E (total: 1)", 50, 545, '#eee', 14);
        }
    });
    
    // Step 8: Negative cycle detection
    steps.push({
        explanation: "Step 3: Negative Cycle Detection\\n\\nAfter V-1 rounds, try relaxing ONE MORE time.\\nIf any distance improves → NEGATIVE CYCLE exists!\\n\\nIn our graph: No negative cycles.\\nAll distances stable.",
        render: (engine) => {
            engine.drawText("Negative Cycle Check", 50, 30, '#e94560', 24);
            drawGraph(engine, nodes, edges, {}, {});
            drawDistances(engine, dist5, 600, 150);
            
            engine.drawText("Try one more relaxation round...", 600, 350, '#4cc9f0', 14);
            engine.drawText("No improvements found ✓", 600, 370, '#2ecc71', 16);
            engine.drawText("No negative cycles in this graph", 600, 395, '#2ecc71', 14);
            
            engine.drawText("IF distance improved → negative cycle!", 50, 520, '#f72585', 16);
            engine.drawText("Return error or -1", 50, 545, '#888', 14);
        }
    });
    
    return steps;
}

// Helper function to draw the graph
function drawGraph(engine, nodes, edges, nodeHighlights = {}, edgeHighlights = {}) {
    const ctx = engine.ctx;
    
    // Draw edges first (so they appear behind nodes)
    edges.forEach(edge => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);
        
        const edgeKey = `${edge.from}→${edge.to}`;
        const color = edgeHighlights[edgeKey] ? engine.colors[edgeHighlights[edgeKey]] : '#555';
        const lineWidth = edgeHighlights[edgeKey] ? 3 : 1.5;
        
        // Draw edge line
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();
        
        // Draw arrowhead
        const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
        const headLen = 12;
        const endX = toNode.x - 25 * Math.cos(angle);
        const endY = toNode.y - 25 * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(endX, endY);
        ctx.lineTo(endX - headLen * Math.cos(angle - Math.PI/6), endY - headLen * Math.sin(angle - Math.PI/6));
        ctx.lineTo(endX - headLen * Math.cos(angle + Math.PI/6), endY - headLen * Math.sin(angle + Math.PI/6));
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        
        // Draw weight label
        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        
        // Background for weight
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(midX - 12, midY - 10, 24, 20);
        
        ctx.fillStyle = edge.weight < 0 ? '#ffaa00' : '#eee';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(edge.weight), midX, midY);
    });
    
    // Draw nodes
    nodes.forEach(node => {
        const highlight = nodeHighlights[node.id];
        const radius = 25;
        
        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = highlight ? engine.colors[highlight] : '#0f3460';
        ctx.fill();
        ctx.strokeStyle = '#eee';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Node label
        ctx.fillStyle = '#eee';
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.id, node.x, node.y);
    });
}

// Helper function to draw distance array
function drawDistances(engine, distances, x, y) {
    const ctx = engine.ctx;
    const entries = Object.entries(distances);
    const cellWidth = 60;
    const cellHeight = 40;
    
    engine.drawText("Distances:", x, y - 25, '#eee', 16);
    
    entries.forEach(([node, dist], idx) => {
        const cellX = x + idx * (cellWidth + 5);
        
        // Node label
        ctx.fillStyle = '#0f3460';
        ctx.fillRect(cellX, y, cellWidth, cellHeight);
        ctx.strokeStyle = '#eee';
        ctx.strokeRect(cellX, y, cellWidth, cellHeight);
        
        ctx.fillStyle = '#eee';
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node, cellX + cellWidth/2, y + cellHeight/2);
        
        // Distance value
        ctx.fillStyle = '#16213e';
        ctx.fillRect(cellX, y + cellHeight + 2, cellWidth, cellHeight);
        ctx.strokeRect(cellX, y + cellHeight + 2, cellWidth, cellHeight);
        
        ctx.fillStyle = dist === Infinity ? '#888' : '#2ecc71';
        ctx.font = 'bold 14px monospace';
        const distText = dist === Infinity ? '∞' : String(dist);
        ctx.fillText(distText, cellX + cellWidth/2, y + cellHeight + 2 + cellHeight/2);
    });
}
