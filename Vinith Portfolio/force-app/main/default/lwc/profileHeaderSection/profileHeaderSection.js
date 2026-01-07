/**
 * Profile Header Section LWC
 * Exposes @api hasAnySection and @api showVinith for parent-controlled visibility.
 * Dispatches 'primaryaction' event when the button is clicked.
 * Dispatches 'navigate' events for tab navigation.
 */
import { LightningElement, api } from 'lwc';
import agentforceimg from '@salesforce/resourceUrl/agenforce_png';

export default class ProfileHeaderSection extends LightningElement {
    @api hasAnySection;
    @api showVinith;
    homePage = false;
    experiencePage = false;
    certificationsPage = false;
    contactPage = false;
    aboutSection = false;
    agentforcePngUrl = agentforceimg;
    
    connectedCallback() {
        // Default to home page on load
        this.aboutSection = true;
        console.log('agentforcePngUrl:', this.agentforcePngUrl);
    }

    handleAction() {
        this.dispatchEvent(new CustomEvent('primaryaction'));
    }

    handleAboutClick() {
        this.homePage = true;
        this.experiencePage = false;
        this.certificationsPage = false;
        this.contactPage = false;
        this.aboutSection = false;
    }

    handleHomeClick() {
        this.homePage = false;
        this.experiencePage = false;
        this.certificationsPage = false;
        this.contactPage = false;
        this.aboutSection = true;
    }

    handleExperienceClick() {
        this.homePage = false;
        this.experiencePage = true;
        this.certificationsPage = false;
        this.contactPage = false;
        this.aboutSection = false;
    }

    handleCertificationsClick() {
        this.homePage = false;
        this.experiencePage = false;
        this.certificationsPage = true;
        this.contactPage = false;
        this.aboutSection = false;
    }

    handleContactClick() {
        this.contactPage = true;
        this.homePage = false;
        this.experiencePage = false;
        this.certificationsPage = false;
        this.aboutSection = false;
    }
}
