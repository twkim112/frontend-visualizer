'use client';

import React, { useState } from 'react';
import Modal from './Modal';

/**
 * Example component to showcase the Modal Dialog
 */
const ModalExample: React.FC = () => {
  // State for modal configuration
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  
  // Demo modal configuration options
  const [size, setSize] = useState<'small' | 'medium' | 'large' | 'fullscreen'>('medium');
  const [position, setPosition] = useState<'center' | 'top' | 'right' | 'bottom' | 'left'>('center');
  const [closeOnOverlayClick, setCloseOnOverlayClick] = useState(true);
  const [closeOnEscape, setCloseOnEscape] = useState(true);
  const [showCloseButton, setShowCloseButton] = useState(true);
  const [disableAnimation, setDisableAnimation] = useState(false);
  
  // Form state for the demo
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  
  // Demo function for form submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle the form submission here
    alert(`Form submitted with Name: ${formName}, Email: ${formEmail}`);
    setIsFormModalOpen(false);
    setFormName('');
    setFormEmail('');
  };
  
  return (
    <div className="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Modal Dialog Demo</h2>
      
      {/* Basic example */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Basic Modal</h3>
        <button
          onClick={() => setIsBasicModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Open Basic Modal
        </button>
        
        <Modal
          isOpen={isBasicModalOpen}
          onClose={() => setIsBasicModalOpen(false)}
          title="Basic Modal"
        >
          <p>This is a basic modal dialog with default settings.</p>
          <p className="mt-2">Modals are used to display content that requires user attention or interaction.</p>
        </Modal>
      </div>
      
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Size Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="fullscreen">Fullscreen</option>
          </select>
        </div>
        
        {/* Position Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Position</label>
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="center">Center</option>
            <option value="top">Top</option>
            <option value="right">Right</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
          </select>
        </div>
        
        {/* Toggle Options */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={closeOnOverlayClick}
              onChange={(e) => setCloseOnOverlayClick(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Close on Overlay Click</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={closeOnEscape}
              onChange={(e) => setCloseOnEscape(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Close on Escape Key</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showCloseButton}
              onChange={(e) => setShowCloseButton(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Show Close Button</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={disableAnimation}
              onChange={(e) => setDisableAnimation(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Disable Animation</span>
          </label>
        </div>
        
        {/* Open Custom Modal Button */}
        <div className="flex items-end">
          <button
            onClick={() => setIsCustomModalOpen(true)}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Open Customized Modal
          </button>
        </div>
      </div>
      
      {/* Custom Modal */}
      <Modal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        title="Customized Modal"
        size={size}
        position={position}
        closeOnOverlayClick={closeOnOverlayClick}
        closeOnEscape={closeOnEscape}
        showCloseButton={showCloseButton}
        disableAnimation={disableAnimation}
        footer={
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setIsCustomModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsCustomModalOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Confirm
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <p>This modal uses the configuration options you've selected.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Size: <span className="font-medium">{size}</span></li>
            <li>Position: <span className="font-medium">{position}</span></li>
            <li>Close on Overlay Click: <span className="font-medium">{closeOnOverlayClick ? 'Yes' : 'No'}</span></li>
            <li>Close on Escape Key: <span className="font-medium">{closeOnEscape ? 'Yes' : 'No'}</span></li>
            <li>Show Close Button: <span className="font-medium">{showCloseButton ? 'Yes' : 'No'}</span></li>
            <li>Disable Animation: <span className="font-medium">{disableAnimation ? 'Yes' : 'No'}</span></li>
          </ul>
          <p>Try interacting with the modal based on your settings!</p>
        </div>
      </Modal>
      
      {/* Common Use Cases */}
      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Common Use Cases</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Form Modal */}
          <div>
            <h4 className="text-md font-medium mb-2">Form Modal</h4>
            <button
              onClick={() => setIsFormModalOpen(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Open Form Modal
            </button>
            
            <Modal
              isOpen={isFormModalOpen}
              onClose={() => setIsFormModalOpen(false)}
              title="Contact Form"
              size="small"
            >
              <form onSubmit={handleFormSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input
                      id="name"
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setIsFormModalOpen(false)}
                      className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </Modal>
          </div>
          
          {/* Confirmation Modal */}
          <div>
            <h4 className="text-md font-medium mb-2">Confirmation Modal</h4>
            <button
              onClick={() => setIsConfirmModalOpen(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Open Confirmation Modal
            </button>
            
            <Modal
              isOpen={isConfirmModalOpen}
              onClose={() => setIsConfirmModalOpen(false)}
              title="Confirm Action"
              size="small"
              footer={
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsConfirmModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      alert('Action confirmed!');
                      setIsConfirmModalOpen(false);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                </div>
              }
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 bg-red-100 rounded-full p-2">
                  <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-medium">Delete Item</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Are you sure you want to delete this item? This action cannot be undone.</p>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      
      {/* Accessibility Notes */}
      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-2">Accessibility Features</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Focus is trapped within the modal when open</li>
          <li>Focus returns to the trigger element when closed</li>
          <li>ESC key support for closing the modal</li>
          <li>Proper ARIA attributes for screen readers</li>
          <li>Proper role assignments and labeling</li>
          <li>Background scroll lock when modal is open</li>
        </ul>
      </div>
    </div>
  );
};

export default ModalExample;
