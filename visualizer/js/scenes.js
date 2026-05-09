/**
 * Scene Manager - Handles visualization steps and playback
 */

class SceneManager {
    constructor(engine) {
        this.engine = engine;
        this.scenes = {};
        this.currentScene = null;
        this.currentStep = 0;
        this.steps = [];
        this.playing = false;
        this.playInterval = null;
    }

    register(name, sceneGenerator) {
        this.scenes[name] = sceneGenerator;
    }

    load(name) {
        if (!this.scenes[name]) {
            console.error(`Scene "${name}" not found`);
            return false;
        }
        
        this.stop();
        this.currentScene = name;
        this.steps = this.scenes[name]();
        this.currentStep = 0;
        this.render();
        return true;
    }

    next() {
        if (this.currentStep < this.steps.length - 1) {
            this.currentStep++;
            this.render();
        }
    }

    prev() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.render();
        }
    }

    play() {
        if (this.playing) return;
        this.playing = true;
        this.playInterval = setInterval(() => {
            if (this.currentStep < this.steps.length - 1) {
                this.next();
            } else {
                this.stop();
            }
        }, 1000);
    }

    stop() {
        this.playing = false;
        if (this.playInterval) {
            clearInterval(this.playInterval);
            this.playInterval = null;
        }
    }

    reset() {
        this.stop();
        this.currentStep = 0;
        this.render();
    }

    render() {
        if (!this.steps.length) return;
        
        const step = this.steps[this.currentStep];
        this.engine.clear();
        
        if (step.render) {
            step.render(this.engine);
        }
        
        // Update explanation
        const explanationEl = document.getElementById('explanation-text');
        if (explanationEl && step.explanation) {
            explanationEl.textContent = step.explanation;
        }
        
        // Update step counter
        const counterEl = document.getElementById('step-counter');
        if (counterEl) {
            counterEl.textContent = `Step: ${this.currentStep + 1} / ${this.steps.length}`;
        }
        
        // Update complexity
        if (step.timeComplexity) {
            document.getElementById('time-complexity').textContent = step.timeComplexity;
        }
        if (step.spaceComplexity) {
            document.getElementById('space-complexity').textContent = step.spaceComplexity;
        }
    }
}
