'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Types for the Toast Notification component
type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  position?: ToastPosition;
  onClose?: () => void;
}

interface ToastContainerProps {
  position?: ToastPosition;
  children: React.ReactNode;
}

/**
 * Toast Notification Component
 * 
 * A small, non-intrusive notification that appears temporarily, 
 * typically at the edge of the interface, to provide feedback for an action.
 * 
 * @param message - The text message to display in the toast
 * @param type - The type of toast (success, error, warning, info)
 * @param duration - How long the toast should display in milliseconds
 * @param position - Where the toast should appear on the screen
 * @param onClose - Callback function that runs when the toast closes
 */
const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  position = 'top-right',
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Auto-dismiss the toast after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300); // Allow exit animation to complete
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  // Get appropriate icon and color based on toast type
  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-500',
          textColor: 'text-white',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      case 'error':
        return {
          bgColor: 'bg-red-500',
          textColor: 'text-white',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-500',
          textColor: 'text-white',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-blue-500',
          textColor: 'text-white',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
    }
  };
  
  const { bgColor, textColor, icon } = getToastStyles();
  
  return (
    <div 
      className={`
        flex items-center px-4 py-3 rounded-lg shadow-lg ${bgColor} ${textColor}
        transform transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-shrink-0 mr-3">
        {icon}
      </div>
      <div>{message}</div>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex focus:outline-none focus:ring-2 focus:ring-white"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

// Position container for the toasts
const ToastContainer: React.FC<ToastContainerProps> = ({ position = 'top-right', children }) => {
  // Map position to Tailwind classes
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };
  
  return (
    <div 
      className={`fixed ${positionClasses[position]} z-50 flex flex-col gap-2`}
    >
      {children}
    </div>
  );
};

// Toast Manager for creating and managing multiple toasts
const useToastManager = () => {
  const [toasts, setToasts] = useState<Array<{ id: string; props: ToastProps }>>([]);

  // Add a new toast
  const showToast = (props: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    setToasts(currentToasts => [
      ...currentToasts,
      { 
        id, 
        props: { 
          ...props, 
          onClose: () => {
            setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
          } 
        } 
      }
    ]);
    
    return id;
  };

  // Remove a toast by ID
  const removeToast = (id: string) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  };
  
  // Clear all toasts
  const clearToasts = () => {
    setToasts([]);
  };
  
  return {
    showToast,
    removeToast,
    clearToasts,
    toasts
  };
};

// Example component to showcase Toast Notifications
const ToastNotificationExample: React.FC = () => {
  const { showToast, toasts, clearToasts } = useToastManager();
  const [position, setPosition] = useState<ToastPosition>('top-right');
  const [type, setType] = useState<ToastType>('info');
  const [duration, setDuration] = useState<number>(3000);
  const [message, setMessage] = useState<string>('This is a sample notification.');
  
  // Only create portal on the client side
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const handleShowToast = () => {
    showToast({
      message,
      type,
      duration,
      position
    });
  };
  
  return (
    <div className="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Toast Notification Demo</h2>
      
      {/* Toast configuration controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Message input */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1">Message</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        {/* Type selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ToastType)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
        
        {/* Duration selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Duration (ms)</label>
          <select
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value={1000}>1000</option>
            <option value={2000}>2000</option>
            <option value={3000}>3000</option>
            <option value={5000}>5000</option>
          </select>
        </div>
        
        {/* Position selection */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-sm font-medium mb-1">Position</label>
          <div className="grid grid-cols-3 gap-2">
            {['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos as ToastPosition)}
                className={`
                  py-2 px-3 text-sm rounded-md
                  ${position === pos 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                `}
              >
                {pos}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Action buttons */}
      <div className="flex space-x-4 pt-4">
        <button
          onClick={handleShowToast}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Show Toast
        </button>
        
        <button
          onClick={clearToasts}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Clear All
        </button>
      </div>
      
      {/* Quick examples */}
      <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
        <h3 className="text-lg font-medium mb-2">Quick Examples</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => showToast({ message: 'Operation successful!', type: 'success' })}
            className="px-3 py-1.5 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
          >
            Success
          </button>
          <button
            onClick={() => showToast({ message: 'Error! Something went wrong.', type: 'error' })}
            className="px-3 py-1.5 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
          >
            Error
          </button>
          <button
            onClick={() => showToast({ message: 'Warning: Be careful!', type: 'warning' })}
            className="px-3 py-1.5 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600"
          >
            Warning
          </button>
          <button
            onClick={() => showToast({ message: 'Info: This is a helpful tip.', type: 'info' })}
            className="px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
          >
            Info
          </button>
        </div>
      </div>
      
      {/* Portal for toasts */}
      {isMounted && createPortal(
        <ToastContainer position={position}>
          {toasts.map(toast => (
            <Toast key={toast.id} {...toast.props} />
          ))}
        </ToastContainer>,
        document.body
      )}
    </div>
  );
};

export default ToastNotificationExample;
