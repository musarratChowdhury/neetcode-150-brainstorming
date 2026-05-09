/**
 * Two Pointers Visualizations
 * TODO: Add more two pointer algorithms
 */

function createContainerWithMostWater() {
    const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
    const steps = [];
    
    steps.push({
        explanation: "Container With Most Water.\\nTwo pointers at ends, move the shorter one inward.\\nCalculate area = width * min(height[left], height[right])",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        render: (engine) => {
            engine.drawText("Container With Most Water", 50, 30, '#e94560', 24);
            engine.drawText("height = [1, 8, 6, 2, 5, 4, 8, 3, 7]", 50, 70, '#4cc9f0', 16);
            engine.drawArray(height, 50, 120, {0: 'current', 8: 'compare'}, 50, 10);
            engine.drawTwoPointers(height, 0, 8, 50, 120, 50, 10);
            engine.drawText("Left=0 (1), Right=8 (7)\\nArea = 8 * min(1, 7) = 8", 50, 220, '#2ecc71', 14);
        }
    });
    
    return steps;
}
