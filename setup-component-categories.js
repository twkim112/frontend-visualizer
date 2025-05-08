/**
 * Component Category Setup Script
 * 
 * This script creates the necessary directory structure and re-export files
 * for all components to be accessible through their respective category paths.
 * 
 * It automatically detects components and creates appropriate category paths based on:
 * 1. Pre-defined category mappings
 * 2. Component name analysis for new components
 */

const fs = require('fs');
const path = require('path');

// Base paths
const componentsDir = path.join(__dirname, 'src', 'components', 'visuals');

// Category definitions - used for automatic categorization and for known components
const categoryDefinitions = {
  navigation: ['Menu', 'Nav', 'Breadcrumb', 'Tab', 'Pagination', 'Link', 'Navbar', 'Sidebar'],
  input: ['Input', 'Button', 'Select', 'Checkbox', 'Radio', 'Form', 'Dropdown', 'Toggle', 'Slider'],
  feedback: ['Alert', 'Notification', 'Toast', 'Modal', 'Dialog', 'Popup', 'Tooltip', 'Snackbar'],
  container: ['Card', 'Panel', 'Container', 'Box', 'Grid', 'Layout', 'Section', 'Wrapper', 'List'],
  animation: ['Transition', 'Animation', 'Effect', 'Fade', 'Slide', 'Hover']
};

// Known component categorization
const knownComponentCategories = {
  // Navigation components
  'HamburgerMenu': { category: 'navigation', subcategory: 'hamburger-menu' },
  'Breadcrumbs': { category: 'navigation', subcategory: 'breadcrumbs' },
  'Tabs': { category: 'navigation', subcategory: 'tabs' },
  'Navbar': { category: 'navigation', subcategory: 'navbar' },
  
  // Input components
  'TextInput': { category: 'input', subcategory: 'text-input' },
  'Button': { category: 'input', subcategory: 'button' },
  'DropdownSelect': { category: 'input', subcategory: 'dropdown-select' },
  
  // Feedback & display components
  'Alert': { category: 'feedback', subcategory: 'alert' },
  'ToastNotification': { category: 'feedback', subcategory: 'toast-notification' },
  'ProgressBar': { category: 'feedback', subcategory: 'progress-bar' },
  'Tooltip': { category: 'feedback', subcategory: 'tooltip' },
  'ModalDialog': { category: 'feedback', subcategory: 'modal-dialog' },
  
  // Container components
  'Card': { category: 'container', subcategory: 'card' },
  'Accordion': { category: 'container', subcategory: 'accordion' },
  'Carousel': { category: 'container', subcategory: 'carousel' },
  'Divider': { category: 'container', subcategory: 'divider' },
  
  // Data presentation components
  'Table': { category: 'data', subcategory: 'table' },
  
  // Animation & effect components
  'FadeTransition': { category: 'animation', subcategory: 'fade-transition' },
  'HoverEffect': { category: 'animation', subcategory: 'hover-effect' }
};

/**
 * Automatically determine the category and subcategory for a component based on its name
 * @param {string} componentName - Name of the component to categorize
 * @returns {Object} category and subcategory
 */
function categorizeComponent(componentName) {
  // First check if it's a known component
  if (knownComponentCategories[componentName]) {
    return knownComponentCategories[componentName];
  }

  // Try to categorize based on component name
  for (const [category, keywords] of Object.entries(categoryDefinitions)) {
    for (const keyword of keywords) {
      if (componentName.includes(keyword)) {
        // Generate subcategory by converting PascalCase to kebab-case
        const subcategory = componentName
          .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
          .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
          .toLowerCase();
          
        return { category, subcategory };
      }
    }
  }

  // Default to 'misc' category if no match
  const subcategory = componentName
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
    
  return { category: 'misc', subcategory };
}

/**
 * Creates the re-export file for a component in its category
 */
function createCategoryReExport(componentName, category, subcategory) {
  // Skip if the original component doesn't exist
  const componentSourcePath = path.join(componentsDir, componentName);
  if (!fs.existsSync(componentSourcePath)) {
    console.log(`Component source "${componentName}" not found, skipping...`);
    return false;
  }
  
  // Create the category directory path
  const categoryPath = path.join(componentsDir, category, subcategory);
  
  // Create directories if they don't exist
  if (!fs.existsSync(categoryPath)) {
    fs.mkdirSync(categoryPath, { recursive: true });
    console.log(`Created directory: ${categoryPath}`);
  }
  
  // Create the re-export file
  const reExportFile = path.join(categoryPath, 'index.tsx');
  const reExportContent = `/**
 * Re-export of the ${componentName} component for categorization purposes
 * This file redirects imports from the ${category} category to the actual component implementation
 */
'use client';

export { default } from '@/components/visuals/${componentName}';`;

  // Only write if the file doesn't exist or is different
  if (!fs.existsSync(reExportFile) || 
      fs.readFileSync(reExportFile, 'utf8') !== reExportContent) {
    fs.writeFileSync(reExportFile, reExportContent);
    console.log(`Created/updated re-export file: ${reExportFile}`);
    return true;
  } else {
    console.log(`Re-export file already exists with correct content: ${reExportFile}`);
    return true;
  }
}

/**
 * Scans the components directory and processes all components
 */
function setupAllComponents() {
  // Get all directories in the components folder (each should be a component)
  const componentsDirectories = fs.readdirSync(componentsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  let processedCount = 0;
  
  // Process each component
  for (const componentName of componentsDirectories) {
    // Skip if it looks like a category folder (lowercase first letter)
    if (/^[a-z]/.test(componentName)) {
      continue;
    }
    
    // Get category and subcategory
    const { category, subcategory } = categorizeComponent(componentName);
    
    // Create the re-export file
    if (createCategoryReExport(componentName, category, subcategory)) {
      processedCount++;
    }
  }
  
  console.log(`Component category setup complete! Processed ${processedCount} components.`);
}

// Run the setup
setupAllComponents();

