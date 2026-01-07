import { LightningElement, api } from 'lwc';

export default class SkillsCarousel extends LightningElement {
    @api skills; // JSON string
    parsedSkills = {};

    currentSlide = 0;
    slideInterval;
    isCarouselActive = true;

    connectedCallback() {
        try {
            this.parsedSkills = this.skills
                ? JSON.parse(this.skills)
                : {};
        } catch (e) {
            console.error('Invalid skills JSON', e);
            this.parsedSkills = {};
        }

        // Start auto rotation after a short delay to allow DOM to render and data to populate
        setTimeout(() => {
            // Check if we have skill categories before starting auto rotation
            if (this.skillCategories && this.skillCategories.length > 1) {
                this.startAutoRotation();
            }
        }, 1000);
    }

    disconnectedCallback() {
        this.clearAutoRotation();
    }

    get skillCategories() {
        return Object.keys(this.parsedSkills).map(key => ({
            name: this.formatCategoryName(key),
            skills: this.parsedSkills[key]
        }));
    }

    formatCategoryName(key) {
        return key.replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase());
    }

    startAutoRotation() {
        this.clearAutoRotation();
        // Double-check that we have multiple slides before starting rotation
        if (this.isCarouselActive && this.skillCategories && this.skillCategories.length > 1) {
            this.slideInterval = setInterval(() => {
                this.nextSlide();
            }, 5000);
        }
    }

    clearAutoRotation() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }

    nextSlide() {
        if (!this.isCarouselActive) return;
        if (this.skillCategories && this.skillCategories.length > 0) {
            this.currentSlide =
                (this.currentSlide + 1) % this.skillCategories.length;
        }
    }

    prevSlide() {
        if (!this.isCarouselActive) return;
        if (this.skillCategories && this.skillCategories.length > 0) {
            this.currentSlide =
                (this.currentSlide - 1 + this.skillCategories.length) %
                this.skillCategories.length;
        }
    }

    goToSlide(event) {
        if (!this.isCarouselActive) return;
        if (this.skillCategories && this.skillCategories.length > 0) {
            const index = parseInt(event.target.dataset.slide);
            this.currentSlide = index;
            this.restartAutoRotation();
        }
    }

    restartAutoRotation() {
        this.clearAutoRotation();
        this.startAutoRotation();
    }

    get carouselTrackStyle() {
        return `transform: translateX(-${this.currentSlide * 100}%)`;
    }

    get isFirstSlide() {
        return this.currentSlide === 0;
    }

    get isLastSlide() {
        return this.currentSlide === this.skillCategories.length - 1;
    }

    get hasSkillCategories() {
        return this.skillCategories && this.skillCategories.length > 0;
    }

    get indicatorButtons() {
        return this.skillCategories.map((category, index) => ({
            index: index,
            label: `Go to slide ${index + 1}`,
            icon: this.currentSlide === index 
                ? 'utility:check' 
                : 'utility:radio_button_unchecked'
        }));
    }

    // Handle mouse enter/leave to pause/resume auto rotation
    handleMouseEnter() {
        this.isCarouselActive = false;
        this.clearAutoRotation();
    }

    handleMouseLeave() {
        this.isCarouselActive = true;
        // Restart auto rotation with a slight delay to ensure it's ready
        setTimeout(() => {
            this.startAutoRotation();
        }, 100);
    }
}
