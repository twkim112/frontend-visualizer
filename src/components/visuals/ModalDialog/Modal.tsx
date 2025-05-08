'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

// Types for the Modal Dialog component
export type ModalSize = 'small' | 'medium' | 'large' | 'fullscreen';
export type ModalPosition = 'center' | 'top' | 'right' | 'bottom' | 'left';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  position?: ModalPosition;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  initialFocus?: React.RefObject<HTMLElement>;
  disableAnimation?: boolean;
}

/**
 * Modal Dialog Component
 * 
 * A window that appears on top of the main content, requiring user interaction
 * before returning to the parent application.
 * 
 * @param isOpen - Whether the modal is currently visible
 * @param onClose - Function called when the modal is closed
 * @param title - Content for the modal header
 * @param children - Content for the modal body
 * @param footer - Content for the modal footer
 * @param size - Size of the modal dialog
 * @param position - Position of the modal on the screen
 * @param closeOnOverlayClick - Whether clicking the overlay closes the modal
 * @param closeOnEscape - Whether pressing Escape closes the modal
 * @param showCloseButton - Whether to show a close button in the header
 * @param className - Additional CSS class for the modal container
 * @param overlayClassName - Additional CSS class for the modal overlay
 * @param contentClassName - Additional CSS class for the modal content
 * @param headerClassName - Additional CSS class for the modal header
 * @param bodyClassName - Additional CSS class for the modal body
 * @param footerClassName - Additional CSS class for the modal footer
 * @param initialFocus - Ref of element to focus when modal opens
 * @param disableAnimation - Whether to disable open/close animations
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium',
  position = 'center',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  initialFocus,
  disableAnimation = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>(
    isOpen ? 'entering' : 'exited'
  );
  
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  
  // Handle mounting/unmounting (client-side only)
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Store previous active element when modal opens
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
    }
  }, [isOpen]);
  
  // Handle animation states
  useEffect(() => {
    if (!disableAnimation) {
      let animationTimeout: NodeJS.Timeout;
      
      if (isOpen) {
        setAnimationState('entering');
        animationTimeout = setTimeout(() => {
          setAnimationState('entered');
        }, 20); // Small delay to ensure 'entering' class is applied
      } else if (animationState !== 'exited') {
        setAnimationState('exiting');
        animationTimeout = setTimeout(() => {
          setAnimationState('exited');
        }, 300); // Match transition duration
      }
      
      return () => clearTimeout(animationTimeout);
    } else {
      setAnimationState(isOpen ? 'entered' : 'exited');
    }
  }, [isOpen, disableAnimation, animationState]);
  
  // Focus management
  useEffect(() => {
    if (isOpen && animationState === 'entered') {
      const focusElement = initialFocus?.current || modalRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
      
      if (focusElement) {
        focusElement.focus();
      } else if (modalRef.current) {
        modalRef.current.focus();
      }
    } else if (!isOpen && previousActiveElement.current instanceof HTMLElement) {
      previousActiveElement.current.focus();
    }
  }, [isOpen, initialFocus, animationState]);
  
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (closeOnEscape && isOpen && event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeOnEscape, isOpen, onClose]);
  
  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);
  
  // Handle focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    
    const handleFocusTrap = (event: KeyboardEvent) => {
      if (event.key !== 'Tab' || !modalRef.current) return;
      
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    };
    
    document.addEventListener('keydown', handleFocusTrap);
    
    return () => {
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, [isOpen]);
  
  // Size classes
  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'max-w-sm';
      case 'medium': return 'max-w-md';
      case 'large': return 'max-w-lg';
      case 'fullscreen': return 'max-w-full m-4';
      default: return 'max-w-md';
    }
  };
  
  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top': return 'items-start mt-16';
      case 'right': return 'justify-end items-center mr-16';
      case 'bottom': return 'items-end mb-16';
      case 'left': return 'justify-start items-center ml-16';
      case 'center':
      default: return 'items-center justify-center';
    }
  };
  
  // Animation classes
  const getAnimationClasses = () => {
    if (disableAnimation) return '';
    
    switch (animationState) {
      case 'entering': return 'opacity-0 scale-95';
      case 'entered': return 'opacity-100 scale-100';
      case 'exiting': return 'opacity-0 scale-95';
      case 'exited': return 'opacity-0 scale-95';
      default: return '';
    }
  };
  
  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Don't render anything on the server or if not mounted
  if (!isMounted || animationState === 'exited' && !isOpen) {
    return null;
  }
  
  const modalElement = (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto ${overlayClassName}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
    >
      {/* Overlay backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${animationState === 'entered' ? 'bg-opacity-50' : 'bg-opacity-0'}`}
        aria-hidden="true"
      />
      
      {/* Modal positioning */}
      <div className={`flex min-h-screen ${getPositionClasses()}`}>
        {/* Modal content */}
        <div
          ref={modalRef}
          className={`
            relative z-10 w-full ${getSizeClass()} 
            bg-white dark:bg-gray-800 rounded-lg shadow-xl 
            transition-all duration-300 ease-in-out
            transform ${getAnimationClasses()}
            ${className}
          `}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modal-title"
        >
          {/* Modal header */}
          {(title || showCloseButton) && (
            <div className={`px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between ${headerClassName}`}>
              {title && (
                <h3 
                  className="text-lg font-medium text-gray-900 dark:text-gray-100" 
                  id="modal-title"
                >
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1 rounded-full"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}
          
          {/* Modal body */}
          <div className={`px-6 py-4 ${bodyClassName}`}>
            {children}
          </div>
          
          {/* Modal footer */}
          {footer && (
            <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${footerClassName}`}>
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
  
  // Use createPortal to render the modal at the document body level
  return createPortal(modalElement, document.body);
};

export default Modal;
