import { LightningElement, api } from 'lwc';

export default class ExperienceCard extends LightningElement {
    @api company;
    @api role;
    @api location;
    @api period;
    @api impact;
    @api tags;
    @api points;
}
