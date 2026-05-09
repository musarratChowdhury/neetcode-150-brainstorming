/**
 * DSA Visualizer - Core Drawing Engine
 * Provides primitives for visualizing data structures
 */

class VisualizerEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.colors = {
            read: '#4cc9f0',
            write: '#f72585',
            compare: '#ffaa00',
            found: '#2ecc71',
            current: '#e94560',
            text: '#eee',
            bg: '#0f0f1e',
            grid: '#1a1a3e'
        };
    }

    clear() {
        this.ctx.fillStyle = this.colors.bg;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    resize() {
        const parent = this.canvas.parentElement;
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.clear();
    }

    // Draw array element
    drawArrayElement(value, index, x, y, size = 50, highlight = null) {
        const ctx = this.ctx;
        
        // Draw cell background
        ctx.fillStyle = highlight ? this.colors[highlight] : this.colors.grid;
        ctx.fillRect(x, y, size, size);
        
        // Draw border
        ctx.strokeStyle = this.colors.text;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, size, size);
        
        // Draw value
        ctx.fillStyle = this.colors.text;
        ctx.font = 'bold 20px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(value), x + size / 2, y + size / 2);
        
        // Draw index
        ctx.fillStyle = '#888';
        ctx.font = '12px monospace';
        ctx.fillText(String(index), x + size / 2, y + size + 15);
    }

    // Draw array
    drawArray(arr, startX, startY, highlights = {}, size = 50, gap = 10) {
        arr.forEach((val, idx) => {
            const x = startX + idx * (size + gap);
            const highlight = highlights[idx] || null;
            this.drawArrayElement(val, idx, x, startY, size, highlight);
        });
    }

    // Draw hash map bucket
    drawHashMap(map, startX, startY, cellWidth = 80, cellHeight = 40, gap = 5) {
        const ctx = this.ctx;
        const entries = Object.entries(map);
        
        entries.forEach(([key, val], idx) => {
            const y = startY + idx * (cellHeight + gap);
            
            // Key cell
            ctx.fillStyle = '#0f3460';
            ctx.fillRect(startX, y, cellWidth, cellHeight);
            ctx.strokeStyle = this.colors.text;
            ctx.strokeRect(startX, y, cellWidth, cellHeight);
            
            ctx.fillStyle = this.colors.text;
            ctx.font = '14px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(key, startX + cellWidth / 2, y + cellHeight / 2);
            
            // Value cell
            ctx.fillStyle = '#16213e';
            ctx.fillRect(startX + cellWidth + 5, y, cellWidth, cellHeight);
            ctx.strokeRect(startX + cellWidth + 5, y, cellWidth, cellHeight);
            
            ctx.fillStyle = this.colors.found;
            ctx.fillText(String(val), startX + cellWidth + 5 + cellWidth / 2, y + cellHeight / 2);
            
            // Arrow
            this.drawArrow(
                startX + cellWidth + 2, y + cellHeight / 2,
                startX + cellWidth + 5, y + cellHeight / 2,
                this.colors.text
            );
        });
    }

    // Draw pointer/arrow
    drawArrow(fromX, fromY, toX, toY, color = '#eee', label = '') {
        const ctx = this.ctx;
        const headLength = 10;
        const angle = Math.atan2(toY - fromY, toX - fromX);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        
        // Arrowhead
        ctx.beginPath();
        ctx.moveTo(toX, toY);
        ctx.lineTo(
            toX - headLength * Math.cos(angle - Math.PI / 6),
            toY - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            toX - headLength * Math.cos(angle + Math.PI / 6),
            toY - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        
        // Label
        if (label) {
            ctx.fillStyle = color;
            ctx.font = '12px monospace';
            ctx.textAlign = 'center';
            const midX = (fromX + toX) / 2;
            const midY = (fromY + toY) / 2;
            ctx.fillText(label, midX, midY - 10);
        }
    }

    // Draw text annotation
    drawText(text, x, y, color = '#eee', fontSize = 16, align = 'left') {
        const ctx = this.ctx;
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        ctx.textAlign = align;
        ctx.textBaseline = 'top';
        ctx.fillText(text, x, y);
    }

    // Draw two pointers on array
    drawTwoPointers(arr, leftIdx, rightIdx, startX, startY, size = 50, gap = 10) {
        const leftX = startX + leftIdx * (size + gap) + size / 2;
        const rightX = startX + rightIdx * (size + gap) + size / 2;
        const pointerY = startY - 30;
        
        this.drawArrow(leftX, pointerY, leftX, startY, this.colors.current, 'L');
        this.drawArrow(rightX, pointerY, rightX, startY, this.colors.compare, 'R');
    }

    // Draw linked list node
    drawLinkedListNode(value, x, y, size = 50, highlight = null) {
        const ctx = this.ctx;
        
        // Node circle
        ctx.beginPath();
        ctx.arc(x, y, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = highlight ? this.colors[highlight] : this.colors.grid;
        ctx.fill();
        ctx.strokeStyle = this.colors.text;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Value
        ctx.fillStyle = this.colors.text;
        ctx.font = 'bold 16px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(value), x, y);
    }

    // Draw linked list
    drawLinkedList(nodes, startX, startY, spacing = 100, size = 50) {
        nodes.forEach((node, idx) => {
            const x = startX + idx * spacing;
            this.drawLinkedListNode(node.value, x, startY, size, node.highlight);
            
            if (idx < nodes.length - 1) {
                this.drawArrow(x + size / 2, startY, x + spacing - size / 2, startY);
            }
        });
    }

    // Draw tree node
    drawTreeNode(value, x, y, radius = 25, highlight = null) {
        const ctx = this.ctx;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = highlight ? this.colors[highlight] : this.colors.grid;
        ctx.fill();
        ctx.strokeStyle = this.colors.text;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        ctx.fillStyle = this.colors.text;
        ctx.font = 'bold 14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(value), x, y);
    }

    // Draw binary tree
    drawBinaryTree(root, x, y, level = 0, spacing = 200) {
        if (!root) return;
        
        const yOffset = 80;
        const xOffset = spacing / Math.pow(2, level + 1);
        
        this.drawTreeNode(root.value, x, y, 25, root.highlight);
        
        if (root.left) {
            const leftX = x - xOffset;
            const leftY = y + yOffset;
            this.drawArrow(x, y + 25, leftX, leftY - 25);
            this.drawBinaryTree(root.left, leftX, leftY, level + 1, spacing);
        }
        
        if (root.right) {
            const rightX = x + xOffset;
            const rightY = y + yOffset;
            this.drawArrow(x, y + 25, rightX, rightY - 25);
            this.drawBinaryTree(root.right, rightX, rightY, level + 1, spacing);
        }
    }
}
