export interface Visual {
  name: string;
  slug: string;
  category: 'navigation' | 'input' | 'feedback' | 'content' | 'animation' | 'container' | 'data';
  description: string;
  altNames?: string[];
  tags: string[];
  componentPath: string;
}

export const visuals: Visual[] = [
  // Navigation Components
  {
    name: 'Hamburger Menu',
    slug: 'hamburger-menu',
    category: 'navigation',
    description: 'An icon composed of three stacked horizontal lines that expands to reveal a navigation menu when clicked. Commonly used in mobile interfaces to save space.',
    altNames: ['Menu Button', 'Sandwich Menu', 'Three-line Menu'],
    tags: ['navigation', 'mobile', 'icon', 'collapse'],
    componentPath: 'visuals/HamburgerMenu',
  },
  {
    name: 'Navbar',
    slug: 'navbar',
    category: 'navigation',
    description: 'A horizontal bar typically placed at the top of a page containing navigation links, site branding, and sometimes search functionality.',
    altNames: ['Navigation Bar', 'Top Bar', 'Header Navigation'],
    tags: ['navigation', 'header', 'links', 'responsive'],
    componentPath: 'visuals/Navbar',
  },
  {
    name: 'Tabs',
    slug: 'tabs',
    category: 'navigation',
    description: 'Interactive elements styled as physical tabs allowing users to switch between different content views within the same context.',
    altNames: ['Tab Navigation', 'Tab Bar'],
    tags: ['navigation', 'content-switching', 'sections', 'organization'],
    componentPath: 'visuals/Tabs',
  },
  {
    name: 'Breadcrumbs',
    slug: 'breadcrumbs',
    category: 'navigation',
    description: 'A secondary navigation showing the user\'s current location within the site hierarchy and the path taken to reach it.',
    altNames: ['Breadcrumb Trail', 'Path Navigation'],
    tags: ['navigation', 'hierarchy', 'location'],
    componentPath: 'visuals/Breadcrumbs',
  },
  
  // Input Components
  {
    name: 'Button',
    slug: 'button',
    category: 'input',
    description: 'An interactive element that triggers an action when clicked. One of the most common UI elements for user interaction.',
    tags: ['input', 'action', 'click', 'interactive'],
    componentPath: 'visuals/Button',
  },
  {
    name: 'Text Input',
    slug: 'text-input',
    category: 'input',
    description: 'A field that allows users to enter and edit text. Can be single-line or multi-line (textarea).',
    altNames: ['Input Field', 'Text Field', 'Text Box'],
    tags: ['input', 'form', 'text', 'data-entry'],
    componentPath: 'visuals/TextInput',
  },
  {
    name: 'Dropdown Select',
    slug: 'dropdown-select',
    category: 'input',
    description: 'A form control that presents a menu of options when clicked. Allows users to make a single selection from multiple choices.',
    altNames: ['Select Box', 'Combo Box', 'Drop-down'],
    tags: ['input', 'form', 'selection', 'options'],
    componentPath: 'visuals/DropdownSelect',
  },
  {
    name: 'Toggle Switch',
    slug: 'toggle-switch',
    category: 'input',
    description: 'A visual control that allows users to toggle between two states, typically on/off, with a sliding action.',
    altNames: ['Switch', 'Slider Toggle'],
    tags: ['input', 'form', 'toggle', 'binary', 'on-off'],
    componentPath: 'visuals/ToggleSwitch',
  },

  // Feedback Components
  {
    name: 'Alert',
    slug: 'alert',
    category: 'feedback',
    description: 'A message that provides information, warning, error, or success feedback to the user, often color-coded by severity.',
    altNames: ['Notification', 'Message Box'],
    tags: ['feedback', 'message', 'notification', 'status'],
    componentPath: 'visuals/Alert',
  },
  {
    name: 'Toast Notification',
    slug: 'toast-notification',
    category: 'feedback',
    description: 'A small, non-intrusive notification that appears temporarily, typically at the edge of the interface, to provide feedback for an action.',
    altNames: ['Snackbar', 'Popup Notification'],
    tags: ['feedback', 'notification', 'temporary', 'message'],
    componentPath: 'visuals/ToastNotification',
  },
  {
    name: 'Progress Bar',
    slug: 'progress-bar',
    category: 'feedback',
    description: 'A visual indicator that displays the completion progress of an operation, task, or workflow.',
    altNames: ['Loading Bar', 'Progress Indicator', 'Completion Meter'],
    tags: ['feedback', 'loading', 'progress', 'indicator', 'status'],
    componentPath: 'visuals/ProgressBar',
  },
  {
    name: 'Tooltip',
    slug: 'tooltip',
    category: 'feedback',
    description: 'A small informational popup that appears when hovering over or focusing on an element, providing additional context or explanation.',
    altNames: ['Popover', 'Hint', 'Info Bubble'],
    tags: ['feedback', 'information', 'hover', 'help', 'contextual'],
    componentPath: 'visuals/Tooltip',
  },
  {
    name: 'Modal Dialog',
    slug: 'modal-dialog',
    category: 'feedback',
    description: 'A window that appears on top of the main content, requiring user interaction before returning to the parent application.',
    altNames: ['Dialog Box', 'Popup', 'Lightbox', 'Overlay Window'],
    tags: ['feedback', 'interaction', 'overlay', 'popup', 'dialog'],
    componentPath: 'visuals/ModalDialog',
  },
  
  // Container Components
  {
    name: 'Card',
    slug: 'card',
    category: 'container',
    description: 'A flexible container that groups related content and actions, often with visual separation from surrounding elements.',
    altNames: ['Tile', 'Panel', 'Content Box'],
    tags: ['container', 'layout', 'grouping'],
    componentPath: 'visuals/Card',
  },
  {
    name: 'Accordion',
    slug: 'accordion',
    category: 'container',
    description: 'A vertically stacked list of items where each item can be expanded or collapsed to reveal or hide content associated with that item.',
    altNames: ['Collapsible Panel', 'Expandable List', 'Disclosure'],
    tags: ['container', 'interactive', 'expandable', 'collapsible'],
    componentPath: 'visuals/Accordion',
  },
  {
    name: 'Carousel',
    slug: 'carousel',
    category: 'container',
    description: 'A slideshow component for cycling through elements, images or slides of content.',
    altNames: ['Slider', 'Image Slider', 'Content Slider', 'Slideshow'],
    tags: ['container', 'interactive', 'slideshow', 'gallery', 'images'],
    componentPath: 'visuals/Carousel',
  },
  {
    name: 'Divider',
    slug: 'divider',
    category: 'container',
    description: 'A visual separation element used to divide content into sections or groups, typically represented as a horizontal or vertical line.',
    altNames: ['Separator', 'Hr', 'Horizontal Rule', 'Line'],
    tags: ['container', 'separation', 'layout', 'organization'],
    componentPath: 'visuals/Divider',
  },
  
  // Data Presentation
  {
    name: 'Table',
    slug: 'table',
    category: 'data',
    description: 'A structured grid of rows and columns for organizing and displaying structured data.',
    altNames: ['Data Grid', 'Data Table', 'Grid View'],
    tags: ['data', 'layout', 'organization', 'tabular', 'grid'],
    componentPath: 'visuals/Table',
  },

  // Animation & Effects
  {
    name: 'Hover Effect',
    slug: 'hover-effect',
    category: 'animation',
    description: 'Visual changes triggered when a user\'s mouse cursor hovers over an interactive element, providing feedback and indicating interactivity.',
    altNames: ['Mouseover Effect', 'Rollover Effect'],
    tags: ['animation', 'interaction', 'feedback', 'css'],
    componentPath: 'visuals/HoverEffect',
  },
  {
    name: 'Fade Transition',
    slug: 'fade-transition',
    category: 'animation',
    description: 'A smooth transition where an element gradually changes opacity to appear or disappear.',
    tags: ['animation', 'transition', 'opacity', 'css'],
    componentPath: 'visuals/FadeTransition',
  },
  {
    name: 'Pulse Animation',
    slug: 'pulse-animation',
    category: 'animation',
    description: 'A visual effect where an element rhythmically expands and contracts to draw attention.',
    altNames: ['Beat Animation', 'Heartbeat Effect', 'Throbbing Animation'],
    tags: ['animation', 'attention', 'feedback', 'visual'],
    componentPath: 'visuals/PulseAnimation',
  }
];
