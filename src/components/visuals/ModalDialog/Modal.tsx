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
  // State for client-side rendering and controlling the portal
  const [mounted, setMounted] = useState(false);
  
  // References for focusing and accessibility management
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);
  
  // Mount the component client-side only
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  // Save the previously focused element when the modal opens
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement;
    }
  }, [isOpen]);
  
  // Handle focus management
  useEffect(() => {
    if (!isOpen || !mounted) return;
    
    // Set focus to the first focusable element or the modal itself
    const focusElement = initialFocus?.current || 
      modalRef.current?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
    
    if (focusElement) {
      setTimeout(() => {
        focusElement.focus();
      }, 50);
    } else if (modalRef.current) {
      modalRef.current.focus();
    }
    
    // Return focus to the previously focused element when modal closes
    return () => {
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, initialFocus, mounted]);
  
  // Handle keyboard navigation (Escape to close)
  useEffect(() => {
    if (!isOpen || !mounted) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, closeOnEscape, mounted]);
  
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (!isOpen || !mounted) return;
    
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen, mounted]);
  
  // Focus trap to keep focus within the modal
  useEffect(() => {
    if (!isOpen || !mounted || !modalRef.current) return;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (!focusableElements || focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    };
    
    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen, mounted]);
  
  // Bail out if not mounted or modal is not open
  if (!mounted) {
    return null;
  }
  
  if (!isOpen) {
    return null;
  }
  
  // Size classes
  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg',
    fullscreen: 'max-w-full m-4'
  };
  
  // Position classes
  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start mt-16',
    right: 'justify-end items-center mr-16',
    bottom: 'items-end mb-16',
    left: 'justify-start items-center ml-16'
  };
  
  // Handle clicks on the backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const modalContent = (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 ${overlayClassName}`} 
        onClick={handleBackdropClick}
        aria-hidden="true"
      />
      
      {/* Modal container */}
      <div className={`flex min-h-screen w-full ${positionClasses[position] || positionClasses.center}`}>
        {/* Modal */}
        <div 
          ref={modalRef}
          className={`
            relative bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50
            w-full ${sizeClasses[size] || sizeClasses.medium}
            ${contentClassName || className}
            ${disableAnimation ? '' : 'animate-modal-appear'}
          `}
          tabIndex={-1}
        >
          {/* Modal header */}
          {(title || showCloseButton) && (
            <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 ${headerClassName}`}>
              {title && (
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100" id="modal-title">
                  {title}
                </h3>
              )}
              
              {showCloseButton && (
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1 rounded-full ml-auto"
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
  
  // Render the modal using a portal
  return createPortal(modalContent, document.body);
};

export default Modal;
