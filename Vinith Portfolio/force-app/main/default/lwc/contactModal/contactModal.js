import { LightningElement, api } from 'lwc';

export default class ContactModal extends LightningElement {
    @api isOpen = false;
    @api phoneNumber = '9084440882';
    @api emailAddress = 'vinithreddygaddam@gmail.com';

    handleClose() {
        this.isOpen = false;
        const closeModalEvent = new CustomEvent('close', { bubbles: true, composed: true });
        this.dispatchEvent(closeModalEvent);
    }
}
