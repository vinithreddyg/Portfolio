/**
 * Profile Header Section LWC
 * Exposes @api hasAnySection and @api showVinith for parent-controlled visibility.
 * Dispatches 'primaryaction' event when the button is clicked.
 */
import { LightningElement, api } from 'lwc';

export default class ProfileHeaderSection extends LightningElement {
    @api hasAnySection;
    @api showVinith;

    handleAction() {
        this.dispatchEvent(new CustomEvent('primaryaction'));
    }
}
