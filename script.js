class ProgressBlock {
    constructor() {
        this.valueElement = document.querySelector('.progress-value');
        this.bgElement = document.querySelector('.progress-bg');
        this.valueInput = document.getElementById('valueInput');
        this.animateToggle = document.getElementById('animateToggle');
        this.hideToggle = document.getElementById('hideToggle');
        this.container = document.querySelector('.progress-container');

        this.isAnimating = false;

        this.valueInput.addEventListener('input', () => this.updateValue());
        this.animateToggle.addEventListener('change', () => this.toggleAnimation());
        this.hideToggle.addEventListener('change', () => this.toggleVisibility());

        this.updateValue();
    }

    updateValue() {
        const value = Math.max(0, Math.min(100, Number(this.valueInput.value) || 0));
        const circumference = 2 * Math.PI * 90; 
        const offset = circumference - (value / 100) * circumference;
        
        this.valueElement.style.strokeDasharray = `${circumference} ${circumference}`;
        this.valueElement.style.strokeDashoffset = offset;
    }

    toggleAnimation() {
        if (this.animateToggle.checked) {
            this.startAnimation();
        } else {
            this.stopAnimation();
        }
    }

    startAnimation() {
        this.isAnimating = true;
        const animate = () => {
            if (!this.isAnimating) return;
            let value = Number(this.valueInput.value);
            value = (value + 1) % 101; 
            this.valueInput.value = value;
            this.updateValue();
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    stopAnimation() {
        this.isAnimating = false;
    }

    toggleVisibility() {
        if (this.hideToggle.checked) {
            this.container.querySelectorAll('*').forEach(element => {
                if (element !== this.hideToggle) {
                    element.style.visibility = 'hidden'; 
                }
            });
        } else {
            this.container.querySelectorAll('*').forEach(element => {
                element.style.visibility = 'visible'; 
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new ProgressBlock());

document.getElementById('valueInput').addEventListener('input', function() {
    if (this.value > 100) {
        this.value = 100; 
    }
});