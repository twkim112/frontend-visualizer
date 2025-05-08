'use client';

import React, { useCallback, useState } from 'react';

// Define step status types
type StepStatus = 'completed' | 'current' | 'upcoming';
type StepperOrientation = 'horizontal' | 'vertical';
type StepperSize = 'small' | 'medium' | 'large';
type StepperVariant = 'default' | 'dots' | 'bullets' | 'numbers' | 'icons';

// Define props for individual step
interface StepProps {
  /** Label text for the step */
  label: string;
  /** Optional description/subtitle for the step */
  description?: string;
  /** Current status of the step */
  status: StepStatus;
  /** Optional icon to display instead of default step indicator */
  icon?: React.ReactNode;
  /** Whether to display a connector to the next step */
  showConnector?: boolean;
  /** Custom click handler for the step */
  onClick?: () => void;
  /** Whether the step is optional */
  optional?: boolean;
  /** Size of the step indicator */
  size?: StepperSize;
  /** Variant of the step indicator */
  variant?: StepperVariant;
  /** The step number (1-based index) */
  stepNumber: number;
  /** The total number of steps */
  totalSteps: number;
}

// Stepper component props
interface StepperProps {
  /** Array of step data objects */
  steps: Array<{
    label: string;
    description?: string;
    optional?: boolean;
    icon?: React.ReactNode;
  }>;
  /** Current active step (0-based index) */
  activeStep: number;
  /** Orientation of the stepper */
  orientation?: StepperOrientation;
  /** Size of the step indicators */
  size?: StepperSize;
  /** Variant of the step indicators */
  variant?: StepperVariant;
  /** Custom classes to apply to the stepper container */
  className?: string;
  /** Whether to alternate step label placement (above/below or left/right) */
  alternateLabels?: boolean;
  /** Whether steps can be clicked to navigate */
  clickable?: boolean;
  /** Callback when a step is clicked */
  onStepClick?: (stepIndex: number) => void;
  /** Whether to show the connector between steps */
  showConnectors?: boolean;
  /** Whether to show completed steps with checkmarks */
  showCheckmarks?: boolean;
  /** Whether to show step numbers */
  showStepNumbers?: boolean;
}

/**
 * Individual Step Component
 * 
 * Renders a single step within the stepper
 */
const Step: React.FC<StepProps> = ({
  label,
  description,
  status,
  icon,
  showConnector = true,
  onClick,
  optional = false,
  size = 'medium',
  variant = 'default',
  stepNumber,
  totalSteps,
}) => {
  // Determine step indicator size based on the size prop
  const getStepSize = useCallback(() => {
    switch (size) {
      case 'small':
        return 'w-6 h-6 text-xs';
      case 'large':
        return 'w-10 h-10 text-lg';
      case 'medium':
      default:
        return 'w-8 h-8 text-sm';
    }
  }, [size]);
  
  // Determine label and description size based on the size prop
  const getTextSize = useCallback(() => {
    switch (size) {
      case 'small':
        return 'text-xs lg:text-sm';
      case 'large':
        return 'text-base lg:text-lg';
      case 'medium':
      default:
        return 'text-sm lg:text-base';
    }
  }, [size]);
  
  // Get color classes based on status
  const getStatusColor = useCallback(() => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white border-green-500';
      case 'current':
        return 'bg-blue-500 text-white border-blue-500';
      case 'upcoming':
      default:
        return 'bg-gray-200 text-gray-500 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    }
  }, [status]);
  
  // Render step indicator based on variant
  const renderStepIndicator = useCallback(() => {
    const sizeClass = getStepSize();
    const statusClasses = getStatusColor();
    const isCompleted = status === 'completed';
    
    // If custom icon is provided, return it
    if (icon) {
      return (
        <div className={`${sizeClass} flex items-center justify-center rounded-full ${statusClasses} border-2`}>
          {icon}
        </div>
      );
    }
    
    // Otherwise render based on variant
    switch (variant) {
      case 'dots':
        return (
          <div className={`${sizeClass} flex items-center justify-center`}>
            <div className={`w-3 h-3 rounded-full ${statusClasses}`}></div>
          </div>
        );
      case 'bullets':
        return (
          <div className={`${sizeClass} flex items-center justify-center rounded-full ${statusClasses} border-2`}>
          </div>
        );
      case 'numbers':
        return (
          <div className={`${sizeClass} flex items-center justify-center rounded-full ${statusClasses} border-2`}>
            {isCompleted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              stepNumber
            )}
          </div>
        );
      case 'icons':
        return (
          <div className={`${sizeClass} flex items-center justify-center rounded-full ${statusClasses} border-2`}>
            {isCompleted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : status === 'current' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        );
      case 'default':
      default:
        return (
          <div className={`${sizeClass} flex items-center justify-center rounded-full ${statusClasses} border-2`}>
            {isCompleted ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              stepNumber
            )}
          </div>
        );
    }
  }, [getStepSize, getStatusColor, icon, status, variant, stepNumber]);
  
  // Get connector color based on status
  const getConnectorColor = useCallback(() => {
    if (status === 'completed') {
      return 'bg-green-500 dark:bg-green-500';
    }
    return 'bg-gray-300 dark:bg-gray-600';
  }, [status]);
  
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);
  
  const textSizeClass = getTextSize();
  
  return (
    <div 
      className={`flex items-center ${onClick ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-current={status === 'current' ? 'step' : undefined}
    >
      {/* Step indicator */}
      {renderStepIndicator()}
      
      {/* Connector line to next step */}
      {showConnector && stepNumber < totalSteps && (
        <div className={`flex-1 h-0.5 mx-2 ${getConnectorColor()}`} />
      )}
      
      {/* Step label and description */}
      <div className="absolute mt-10">
        <div className={`font-medium ${textSizeClass}`}>
          {label}
          {optional && <span className="ml-1 text-gray-500 dark:text-gray-400 text-xs">(Optional)</span>}
        </div>
        {description && (
          <div className={`text-gray-500 dark:text-gray-400 ${size === 'small' ? 'text-xs' : 'text-sm'}`}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Stepper Component
 * 
 * A component that displays progress through a sequence of logical and numbered steps,
 * often used for multi-step forms or checkout processes.
 */
const Stepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  orientation = 'horizontal',
  size = 'medium',
  variant = 'default',
  className = '',
  alternateLabels = false,
  clickable = false,
  onStepClick,
  showConnectors = true,
  showCheckmarks = true,
  showStepNumbers = true,
}) => {
  // Handle step click
  const handleStepClick = useCallback((index: number) => {
    if (clickable && onStepClick) {
      onStepClick(index);
    }
  }, [clickable, onStepClick]);
  
  // Determine step status
  const getStepStatus = useCallback((index: number): StepStatus => {
    if (index < activeStep) return 'completed';
    if (index === activeStep) return 'current';
    return 'upcoming';
  }, [activeStep]);
  
  // Generate classes for the stepper container
  const stepperClasses = `
    flex 
    ${orientation === 'vertical' ? 'flex-col space-y-8' : 'flex-row space-x-0 justify-between'}
    ${className}
  `.trim();
  
  return (
    <div 
      className={stepperClasses}
      role="navigation"
      aria-label="Progress"
    >
      {steps.map((step, index) => {
        const stepStatus = getStepStatus(index);
        const showConnector = showConnectors && index < steps.length - 1;
        
        return (
          <div 
            key={index}
            className={`
              ${orientation === 'vertical' ? 'flex flex-row' : alternateLabels && index % 2 !== 0 ? 'flex flex-col-reverse pt-10' : 'flex flex-col pt-0'}
              ${orientation === 'vertical' ? 'items-start' : 'items-center'}
              ${orientation === 'horizontal' ? 'flex-1' : ''}
              relative
            `}
          >
            <Step
              label={step.label}
              description={step.description}
              status={stepStatus}
              icon={step.icon}
              showConnector={showConnector}
              onClick={clickable ? () => handleStepClick(index) : undefined}
              optional={step.optional}
              size={size}
              variant={variant}
              stepNumber={index + 1}
              totalSteps={steps.length}
            />
          </div>
        );
      })}
    </div>
  );
};

// Example component to showcase the Stepper
const StepperExample: React.FC = () => {
  // Example step data
  const exampleSteps = [
    { label: 'Cart', description: 'Review your items' },
    { label: 'Shipping', description: 'Enter shipping details' },
    { label: 'Payment', description: 'Complete payment', optional: true },
    { label: 'Review', description: 'Review your order' },
    { label: 'Complete', description: 'Order completed' },
  ];
  
  // State for active step
  const [activeStep, setActiveStep] = useState(0);
  
  // State for demo controls
  const [orientation, setOrientation] = useState<StepperOrientation>('horizontal');
  const [size, setSize] = useState<StepperSize>('medium');
  const [variant, setVariant] = useState<StepperVariant>('default');
  const [alternateLabels, setAlternateLabels] = useState(false);
  const [clickable, setClickable] = useState(true);
  const [showConnectors, setShowConnectors] = useState(true);
  
  // Handle step click
  const handleStepClick = (stepIndex: number) => {
    setActiveStep(stepIndex);
  };
  
  // Navigation functions
  const handleNext = () => {
    setActiveStep(prev => Math.min(prev + 1, exampleSteps.length - 1));
  };
  
  const handleBack = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };
  
  const handleReset = () => {
    setActiveStep(0);
  };
  
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow space-y-8">
      <h2 className="text-xl font-semibold mb-4">Stepper Examples</h2>
      
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Orientation */}
        <div>
          <h3 className="text-sm font-medium mb-2">Orientation</h3>
          <div className="flex space-x-2">
            {(['horizontal', 'vertical'] as StepperOrientation[]).map((o) => (
              <button
                key={o}
                onClick={() => setOrientation(o)}
                className={`
                  px-3 py-1 text-sm rounded-md
                  ${orientation === o
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                `}
              >
                {o.charAt(0).toUpperCase() + o.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Size */}
        <div>
          <h3 className="text-sm font-medium mb-2">Size</h3>
          <div className="flex space-x-2">
            {(['small', 'medium', 'large'] as StepperSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`
                  px-3 py-1 text-sm rounded-md
                  ${size === s
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                `}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Variant */}
        <div>
          <h3 className="text-sm font-medium mb-2">Variant</h3>
          <div className="flex flex-wrap gap-2">
            {(['default', 'dots', 'bullets', 'numbers', 'icons'] as StepperVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`
                  px-3 py-1 text-sm rounded-md
                  ${variant === v
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                `}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Options */}
        <div>
          <h3 className="text-sm font-medium mb-2">Options</h3>
          <div className="flex flex-wrap gap-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={alternateLabels}
                onChange={() => setAlternateLabels(!alternateLabels)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                disabled={orientation === 'vertical'}
              />
              <span className={`ml-2 ${orientation === 'vertical' ? 'text-gray-400' : ''}`}>
                Alternate Labels
              </span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={clickable}
                onChange={() => setClickable(!clickable)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2">Clickable Steps</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={showConnectors}
                onChange={() => setShowConnectors(!showConnectors)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2">Show Connectors</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Stepper Preview */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium mb-6">Stepper Preview</h3>
        
        <div className={`${orientation === 'vertical' ? 'h-80' : ''} mb-8`}>
          <Stepper
            steps={exampleSteps}
            activeStep={activeStep}
            orientation={orientation}
            size={size}
            variant={variant}
            alternateLabels={alternateLabels}
            clickable={clickable}
            onStepClick={handleStepClick}
            showConnectors={showConnectors}
            className={orientation === 'vertical' ? 'h-full' : ''}
          />
        </div>
        
        {/* Navigation Controls */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className={`
              px-4 py-2 rounded-md
              ${activeStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}
            `}
          >
            Back
          </button>
          
          <div>
            {activeStep === exampleSteps.length - 1 ? (
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Reset
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Common Use Cases */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium mb-6">Common Use Cases</h3>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Checkout Process */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-md font-medium mb-4">Checkout Process</h4>
            <Stepper
              steps={[
                { label: 'Cart', description: 'Review items' },
                { label: 'Shipping', description: 'Address details' },
                { label: 'Payment', description: 'Credit card' },
                { label: 'Confirm', description: 'Review order' },
              ]}
              activeStep={1}
              size="small"
              variant="default"
            />
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h5 className="font-medium mb-2">Shipping Information</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Full Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Form Wizard */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-md font-medium mb-4">Account Setup Wizard</h4>
            <Stepper
              steps={[
                { label: 'Account', description: 'Create account' },
                { label: 'Profile', description: 'Complete profile' },
                { label: 'Preferences', description: 'Set preferences', optional: true },
                { label: 'Complete', description: 'Finish setup' },
              ]}
              activeStep={2}
              variant="icons"
              size="medium"
            />
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h5 className="font-medium mb-2">Preferences</h5>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                  <span className="ml-2">Receive email notifications</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <span className="ml-2">Subscribe to newsletter</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                  <span className="ml-2">Enable two-factor authentication</span>
                </label>
              </div>
            </div>
          </div>
          
          {/* Vertical Stepper */}
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h4 className="text-md font-medium mb-4">Installation Guide</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Stepper
                steps={[
                  { label: 'Prerequisites', description: 'System requirements' },
                  { label: 'Download', description: 'Get installation files' },
                  { label: 'Install', description: 'Run installer' },
                  { label: 'Configure', description: 'Setup preferences' },
                  { label: 'Finish', description: 'Complete installation' },
                ]}
                activeStep={2}
                orientation="vertical"
                variant="bullets"
                size="medium"
              />
              <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h5 className="font-medium mb-2">Installation</h5>
                <p className="text-sm mb-4">Run the following commands to install the package:</p>
                <div className="bg-gray-800 text-gray-200 p-3 rounded-md font-mono text-sm">
                  $ npm install package-name<br />
                  $ npm run setup
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Usage Examples */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-medium mb-4">Usage Examples</h3>
        
        <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-md overflow-auto">
          <pre className="text-sm">
{`// Basic Usage
<Stepper
  steps={[
    { label: 'Step 1', description: 'First step' },
    { label: 'Step 2', description: 'Second step' },
    { label: 'Step 3', description: 'Third step' },
  ]}
  activeStep={1}
/>

// Advanced Usage
<Stepper
  steps={[
    { label: 'Account', description: 'Create account' },
    { label: 'Profile', description: 'Complete profile', optional: true },
    { label: 'Review', description: 'Verification' },
  ]}
  activeStep={activeStep}
  orientation="vertical"
  size="large"
  variant="icons"
  clickable={true}
  onStepClick={handleStepClick}
  alternateLabels={true}
  showConnectors={true}
/>`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default StepperExample;
