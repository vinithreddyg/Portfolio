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
    @api showCertifications = false;

    // Modal state
    @track isContactModalOpen = false;
    
    // Animation state
    @track isAnimated = false;

    // Example reactive state
    @track skills = {
        languages: [
            'Java',
            'Apex',
            'SOQL',
            'SOSL',
            'JavaScript',
            'HTML5',
            'CSS3'
        ],

        webTechnologies: [
            'HTML5',
            'CSS3',
            'JavaScript',
            'jQuery',
            'AJAX'
        ],

        salesforce: [
            'Lightning Web Components',
            'Aura Components',
            'Visualforce Pages',
            'Triggers',
            'Controllers',
            'Batch Apex',
            'Bulk Api',
            'Apex Data Loaders',
            'App Exchange',
            'Dashboards',
            'Sales Cloud',
            'Service Cloud',
            'Marketing Cloud',
            'APPTUS CPQ',
            'AgentForce'
        ],

        devOps: [
            'SFDX',
            'Git',
            'GitHub',
            'GitHub Actions',
            'Jenkins',
            'Bitbucket',
            'Copado',
            'Gearset',
            'CI/CD Pipelines'
        ],

        operatingSystems: [
            'Windows',
            'Linux',
            'Ubuntu'
        ],

        agentforce: [
            'LLM',
            'NLP',
            'Prompt Builder',
            'Atlas Reasoning Engine (ARE)',
            'Einstein trust layer'
        ],

        integrations: [
            'REST API',
            'SOAP API',
            'Web Service API',
            'Jitterbit',
            'Mulesoft'
        ],

        security: [
            'OAuth',
            'JWT',
            'Field-Level Security',
            'Sharing Rules',
            'Permission Sets',
            'Shield Platform Encryption',
            'Event Monitoring',
            'Health Check'
        ]
    };

    // Certifications data
    @track certifications = [
        {
            title: 'Salesforce Certified Platform Developer I',
            issuer: 'Salesforce'
        },
        {
            title: 'Salesforce Certified Administrator',
            issuer: 'Salesforce'
        },
        {
            title: 'Salesforce Certified Platform Foundations',
            issuer: 'Salesforce'
        },
        {
            title: 'Salesforce Certified AI Associate',
            issuer: 'Salesforce'
        },
        {
            title: 'Salesforce Certified Agentforce Specialist',
            issuer: 'Salesforce'
        }
    ];

    connectedCallback() {
        // Default visible sections for demo
        this.showVinith = true;
        this.showAbout = true;
        this.showSkills = true;
        this.showProjects = true;
        this.showCertifications = true;
        
        // Set up scroll listeners for animations
        this.setupScrollAnimations();
    }

    disconnectedCallback() {
        // Clean up scroll listener
        if (this.scrollListener) {
            window.removeEventListener('scroll', this.scrollListener);
        }
    }

    // Set up scroll animation detection
    setupScrollAnimations() {
        this.scrollListener = () => {
            this.animateOnScroll();
        };
        window.addEventListener('scroll', this.scrollListener);
        // Trigger initial check
        this.animateOnScroll();
    }

    // Handle scroll animations for elements with animate-on-scroll class
    animateOnScroll() {
        const elements = this.template.querySelectorAll('.animate-on-scroll:not(.animated)');
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            
            // If element is in viewport, animate it
            if (rect.top <= windowHeight * 0.75) {
                element.classList.add('animated');
                element.classList.add(`animate-${element.dataset.animation}`);
            }
        });
    }

    // Computed helpers
    get hasAnySection() {
        return this.showVinith || this.showAbout || this.showSkills || this.showProjects;
    }

    get skillsJson() {
        return JSON.stringify(this.skills);
    }

    // Modal handlers
    handleOpenContactModal() {
        this.isContactModalOpen = true;
    }

    handleCloseContactModal() {
        this.isContactModalOpen = false;
    }

// Smooth scroll helpers with enhanced visual feedback
    handleScrollToProjects(event) {
        const el = this.template.querySelector('#projects');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Add visual feedback to the button
            if (event && event.target) {
                const button = event.target.closest('lightning-button');
                if (button) {
                    button.classList.add('clicked');
                    setTimeout(() => button.classList.remove('clicked'), 300);
                }
            }
        }
    }

    handleScrollToContact(event) {
        const el = this.template.querySelector('#contact');
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Add visual feedback to the button
            if (event && event.target) {
                const button = event.target.closest('lightning-button');
                if (button) {
                    button.classList.add('clicked');
                    setTimeout(() => button.classList.remove('clicked'), 300);
                }
            }
        }
    }

    // Public method example to refresh/reload content later
    @api
    refresh() {
        // Placeholder for future data reload
    }
}
