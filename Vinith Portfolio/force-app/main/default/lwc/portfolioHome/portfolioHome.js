import { LightningElement, api, track } from 'lwc';

/**
 * Portfolio Home
 *
 * Usage: <c-portfolio-home></c-portfolio-home>
 * Targets: App Builder (Home/Record/App), optional Flow screen-ready inputs
 *
 * Follows SLDS and LWC best practices. Replace placeholder content as needed.
 */
export default class PortfolioHome extends LightningElement {
    // Public API properties to allow configuration from App Builder / (optional) Flow
    @api title = 'Vinith Portfolio';
    @api subtitle = 'Welcome to my professional portfolio!';
    @api showVinith = false;
    @api showAbout = false;
    @api showSkills = false;
    @api showProjects = false;

    // Example reactive state
    @track skills = ['Salesforce', 'LWC', 'Apex', 'Apex Triggers', 'SOQL', 'Integration', 'CI/CD'];

    connectedCallback() {
        // Default visible sections for demo
        this.showVinith = true;
        this.showAbout = true;
        this.showSkills = true;
        this.showProjects = true;
    }

    // Computed helpers
    get hasAnySection() {
        return this.showVinith || this.showAbout || this.showSkills || this.showProjects;
    }

    // Smooth scroll helpers
    handleScrollToProjects() {
        const el = this.template.querySelector('#projects');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    handleScrollToContact() {
        const el = this.template.querySelector('#contact');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Public method example to refresh/reload content later
    @api
    refresh() {
        // Placeholder for future data reload
    }
}
