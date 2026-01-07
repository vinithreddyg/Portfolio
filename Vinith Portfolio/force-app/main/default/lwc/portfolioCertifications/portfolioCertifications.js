import { LightningElement } from 'lwc';

export default class PortfolioCertifications extends LightningElement {
    connectedCallback() {
        // Add a subtle animation when component loads
        const cards = this.template.querySelectorAll('.certification-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }
}
