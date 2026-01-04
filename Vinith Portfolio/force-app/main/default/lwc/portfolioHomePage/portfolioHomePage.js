import { LightningElement, track } from 'lwc';

export default class PortfolioHomePage extends LightningElement {
    @track hasAnySection = true;
    @track showVinith = true;

    handlePrimaryAction() {
        // Handle child button click from profileHeaderSection
        // For now, simply log or extend with desired behavior
        // e.g., navigate, open modal, etc.
        // eslint-disable-next-line no-console
        console.log('Primary action from profileHeaderSection');
    }
}
