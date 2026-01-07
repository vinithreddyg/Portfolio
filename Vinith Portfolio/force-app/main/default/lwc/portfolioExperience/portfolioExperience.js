import { LightningElement, track } from 'lwc';

export default class PortfolioExperience extends LightningElement {
  @track currentIndex = 0;
  @track isDragging = false;
  startX = 0;
  currentTranslate = 0;
  prevTranslate = 0;
  animationFrame = 0;

  get experiences() {
    return [
      {
        id: 'td-bank',
        company: 'TD Bank',
        role: 'Salesforce Consultant',
        location: 'Mt Laurel, NJ',
        period: '04/2024 - Present',
        impact: '15% ↑ case resolution efficiency, 75% ↓ manual processing',
        tags: ['Financial Services Cloud', 'Agentforce AI', 'REST', 'Batch Apex', 'Queueable', 'CDC'],
        points: [
          'Designed LWCs, Apex, and Flows for card loss reporting, replacement, and authentication in FSC.',
          'Implemented Agentforce AI on Account and Case pages improving first-contact resolution by 15%.',
          'Built API-driven Flows integrating REST endpoints for real-time card service requests/updates.',
          'Developed secure @RestResource endpoints for external systems to fetch/update card data.',
          'Integrated high-volume data sync with Batch Apex to reconcile financial data and reduce timeouts.',
          'Used Queueable Apex and async callouts for fraud checks and verification without blocking UI.',
          'Leveraged Platform Events and CDC to maintain 99.9% near real-time sync across downstream systems.',
          'Automated async API tasks and scheduled jobs, reducing manual back-office work by 75%.',
          'Architected scalable data framework ensuring Data Cloud, auth, encryption, and limits optimization.',
          'Automated migration validation and smoke tests reducing QA effort and deployment defects.',
          'Built AI Agents for lead qualification reducing response/triage time by 30%.',
          'Maintained 85%+ Apex coverage incl. async mocks, batch, queueable, and LWC Jest tests.'
        ]
      },
      {
        id: 'cigna',
        company: 'Cigna Health Care',
        role: 'Salesforce Consultant',
        location: 'Morris Plains, NJ',
        period: '08/2023 - 04/2024',
        impact: '30% ↑ care plan visibility, 80% ↓ mean time to deploy',
        tags: ['Health Cloud', 'REST', 'OAuth 2.0', 'Pipelines', 'Security'],
        points: [
          'Developed LWC, Apex, and Flows in Health Cloud for patient records, care plans, and service requests.',
          'Gathered requirements with stakeholders; translated into functional/technical specs.',
          'Improved care plan visibility by 30% with custom LWC for patient workflows.',
          'Built HIPAA-compliant REST integrations for real-time patient/provider data exchange.',
          'Led Scrum ceremonies to improve team velocity and delivery cadence.',
          'Configured role hierarchies, sharing, and security for PHI protection.',
          'Built SFDX + GitHub Actions pipelines to validate PRs and deploy across environments.',
          'Implemented OAuth 2.0, security protocols, and wrapper classes for JSON/XML.',
          'Created callouts to third-party services using HTTP methods.'
        ]
      },
      {
        id: 'ksolves',
        company: 'Ksolves India Ltd',
        role: 'Software Developer',
        location: 'India',
        period: '05/2021 - 07/2023',
        impact: '25% ↑ agent efficiency, 30% ↓ future dev effort',
        tags: ['Sales/Service Cloud', 'MuleSoft', 'REST', 'Design Patterns'],
        points: [
          'Built custom LWC, Apex, Triggers for Sales/Service Cloud objects; +25% agent efficiency.',
          'Implemented Service Console customization, validation rules, roll-up summaries.',
          'Created Reports, Dashboards, and schedules for data-driven insights.',
          'Configured Flows, Approvals, and automations for lead/case processes.',
          'Developed REST integrations with third-party systems for seamless data exchange.',
          'Designed API-led architecture (System, Process, Experience APIs) in MuleSoft.',
          'Built real-time sync using MuleSoft connectors and Salesforce Bulk/Composite APIs.',
          'Apex callouts to MuleSoft Process APIs for onboarding to downstream systems.',
          'Multi-step orchestration across 3+ systems, unified responses into Salesforce.',
          'Implemented error handling, logging, and modular design patterns.'
        ]
      },
      {
        id: 'tech-vedika',
        company: 'Tech Vedika Software Pvt Ltd',
        role: 'Salesforce Administrator',
        location: 'India',
        period: '09/2019 - 04/2021',
        impact: '30% ↑ operational efficiency, 99% data accuracy',
        tags: ['Admin', 'Flows', 'Security', 'Reporting'],
        points: [
          'Configured objects, fields, record types, layouts, and Lightning App Builder assets.',
          'Built Flows, Process Builder, and validation rules; +30% operational efficiency.',
          'Managed user lifecycle, roles, profiles, permission sets, and sharing.',
          'Provided Tier 2 support, documentation, and training for adoption.',
          'Maintained data quality, imports/exports, dedupe, and validation; 99% accuracy.',
          'Administered release management and sandbox deployments via Change Sets.',
          'Built reports/dashboards with schedules for actionable insights.',
          'Implemented email templates and inbound handling via Visualforce.',
          'Optimized account hierarchy and lead conversion logic.',
          'Oversaw ongoing maintenance and health checks.'
        ]
      }
    ];
  }

  get currentExperience() {
    return this.experiences[this.currentIndex];
  }

  get trackStyle() {
    const translateX = -(this.currentIndex * 100) + (this.isDragging ? this.currentTranslate : 0);
    return `transform: translateX(${translateX}%);`;
}

  connectedCallback() {
    // nothing for now
  }

  handlePrev() {
    this.gotoIndex(this.currentIndex - 1);
  }

  handleNext() {
    this.gotoIndex(this.currentIndex + 1);
  }

  handleDotClick(event) {
    const idx = Number(event.currentTarget.dataset.index);
    this.gotoIndex(idx);
  }

  handleKeydown(event) {
    if (event.key === 'ArrowLeft') {
      this.handlePrev();
    } else if (event.key === 'ArrowRight') {
      this.handleNext();
    }
  }

  gotoIndex(idx) {
    const max = this.experiences.length - 1;
    if (idx < 0) {
      this.currentIndex = max;
    } else if (idx > max) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = idx;
    }
    // No need for requestUpdate in LWC 2 - the @track will trigger reactivity
  }

  // Swipe/drag support (mouse + touch)
  onMouseDown(event) {
    this.isDragging = true;
    this.startX = event.clientX;
    this.prevTranslate = -this.currentIndex * 100;
    this.currentTranslate = 0;
    const vp = this.template.querySelector('.viewport');
    if (vp) vp.focus();
  }

  onMouseMove(event) {
    if (!this.isDragging) return;
    const deltaX = event.clientX - this.startX;
    const viewport = this.template.querySelector('.viewport');
    const width = viewport ? viewport.clientWidth : 1;
    this.currentTranslate = (deltaX / width) * 100;
  }

  onMouseUp() {
    if (!this.isDragging) return;
    this.isDragging = false;
    // Snap logic
    if (this.currentTranslate < -15) {
      this.handleNext();
    } else if (this.currentTranslate > 15) {
      this.handlePrev();
    } else {
      // Reset if not enough drag
      this.currentTranslate = 0;
    }
    // Ensure we're not stuck in dragging state
    this.isDragging = false;
  }

  onTouchStart(event) {
    const touch = event.touches && event.touches[0] ? event.touches[0] : event;
    this.isDragging = true;
    this.startX = touch.clientX;
    this.prevTranslate = -this.currentIndex * 100;
    this.currentTranslate = 0;
    const vp = this.template.querySelector('.viewport');
    if (vp) vp.focus();
  }

  onTouchMove(event) {
    if (!this.isDragging) return;
    const touch = event.touches && event.touches[0] ? event.touches[0] : event;
    const deltaX = touch.clientX - this.startX;
    const viewport = this.template.querySelector('.viewport');
    const width = viewport ? viewport.clientWidth : 1;
    this.currentTranslate = (deltaX / width) * 100;
  }

  onTouchEnd() {
    this.onMouseUp();
  }

  // Template helpers for classes and aria
  computeAriaCurrent(index) {
    return index === this.currentIndex ? 'true' : 'false';
    // aria-current on slides isn't standard; using string values for safety
  }

  get computeSlideClass() {
    // applied on each article via class={computeSlideClass}
    return 'slide-outer slds-is-relative';
  }

  computeAriaSelected(index) {
    return index === this.currentIndex ? 'true' : 'false';
  }

  get computeDotClass() {
    // used on each dot via class={computeDotClass}
    return 'dot';
  }
}
