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
    @api title = 'Portfolio Home';
    @api subtitle = 'Welcome to the portfolio home component';
    @api showHero = false;
    @api showAbout = false;
    @api showSkills = false;
    @api showProjects = false;

    // Example reactive state
    @track skills = ['Salesforce', 'LWC', 'Apex'];

    // Computed helpers
    get hasAnySection() {
       this.showHero = true;
       this.showAbout = true;
       this.showSkills = true;
       this.showProjects = true;

        return this.showHero || this.showAbout || this.showSkills || this.showProjects;
    }

    // Handlers scaffold
    handleAction(event) {
        // Placeholder for future actions (navigate, open modal, etc.)
        // eslint-disable-next-line no-unused-vars
        const { name } = event.target;
    }

    // Public method example to refresh/reload content later
    @api
    refresh() {
        // Add logic to reload data if needed
    }
}
