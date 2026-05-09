/**
 * Main Application - Initializes visualizer and handles UI events
 */

// Initialize engine and scene manager
const canvas = document.getElementById('main-canvas');
const engine = new VisualizerEngine(canvas);
const sceneManager = new SceneManager(engine);

// Register scenes
sceneManager.register('contains-duplicate', createContainsDuplicateScene);
sceneManager.register('valid-anagram', createValidAnagramScene);
sceneManager.register('two-sum', createTwoSumScene);
sceneManager.register('two-pointers', createTwoPointersScene);
sceneManager.register('sliding-window', createSlidingWindowScene);

// UI Event Handlers
document.getElementById('scene-selector').addEventListener('change', (e) => {
    const scene = e.target.value;
    if (scene) {
        sceneManager.load(scene);
    }
});

document.getElementById('btn-prev').addEventListener('click', () => {
    sceneManager.prev();
});

document.getElementById('btn-next').addEventListener('click', () => {
    sceneManager.next();
});

document.getElementById('btn-play').addEventListener('click', () => {
    const btn = document.getElementById('btn-play');
    if (sceneManager.playing) {
        sceneManager.stop();
        btn.textContent = 'Play';
    } else {
        sceneManager.play();
        btn.textContent = 'Pause';
    }
});

document.getElementById('btn-reset').addEventListener('click', () => {
    const btn = document.getElementById('btn-play');
    btn.textContent = 'Play';
    sceneManager.reset();
});

// Resize handler
window.addEventListener('resize', () => {
    engine.resize();
    sceneManager.render();
});

// Initialize
engine.resize();
engine.clear();
engine.drawText("NeetCode 150 DSA Visualizer", canvas.width / 2, canvas.height / 2 - 30, '#e94560', 32, 'center');
engine.drawText("Select a visualization from the dropdown above", canvas.width / 2, canvas.height / 2 + 20, '#888', 16, 'center');
engine.drawText("Arrays & Hashing | Two Pointers | Sliding Window | Stack | Trees | Graphs | DP", canvas.width / 2, canvas.height / 2 + 50, '#0f3460', 14, 'center');
