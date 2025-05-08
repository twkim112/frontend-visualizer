/**
 * File Upload Component
 * 
 * A component for selecting and uploading files, supporting both button-based selection
 * and drag-and-drop functionality.
 */
'use client';

import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';

export interface FileUploadProps {
  multiple?: boolean;
  accept?: string;
  maxSizeMB?: number;
  onFilesSelected?: (files: File[]) => void;
  className?: string;
  dragDropEnabled?: boolean;
  buttonText?: string;
  dragDropText?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  multiple = false,
  accept = '*/*',
  maxSizeMB = 10,
  onFilesSelected,
  className = '',
  dragDropEnabled = true,
  buttonText = 'Select File',
  dragDropText = 'Drag files here or click to select'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Convert bytes to readable format
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  // Handle file selection validation
  const validateAndProcessFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setError(null);
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    const validFiles: File[] = [];
    
    Array.from(files).forEach(file => {
      // Check file size
      if (file.size > maxSizeBytes) {
        setError(`File "${file.name}" exceeds the maximum size of ${maxSizeMB}MB`);
        return;
      }
      
      validFiles.push(file);
    });
    
    if (validFiles.length > 0) {
      setSelectedFiles(prev => multiple ? [...prev, ...validFiles] : validFiles);
      
      if (onFilesSelected) {
        onFilesSelected(multiple ? [...selectedFiles, ...validFiles] : validFiles);
      }
    }
  };
  
  // Trigger file input click
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    validateAndProcessFiles(e.target.files);
    
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Handle file drag events
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    validateAndProcessFiles(e.dataTransfer.files);
  };
  
  // Remove a file from the selection
  const handleRemoveFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    
    if (onFilesSelected) {
      onFilesSelected(newFiles);
    }
  };
  
  return (
    <div className={`flex flex-col space-y-4 ${className}`}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* Drag and drop area or simple button */}
      {dragDropEnabled ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
            isDragging
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="flex flex-col items-center">
            <svg
              className={`w-10 h-10 mb-3 ${
                isDragging ? 'text-blue-500' : 'text-gray-400 dark:text-gray-500'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className={`text-sm ${isDragging ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'}`}>
              {dragDropText}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {multiple ? 'You can select multiple files' : 'Only single file selection is allowed'}
            </p>
            {accept !== '*/*' && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Accepted formats: {accept.split(',').join(', ')}
              </p>
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Max size: {maxSizeMB}MB
            </p>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleButtonClick}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          {buttonText}
        </button>
      )}
      
      {/* Error message */}
      {error && (
        <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-md">
          {error}
        </div>
      )}
      
      {/* File list */}
      {selectedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Selected Files:</h4>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
            {selectedFiles.map((file, index) => (
              <li key={`${file.name}-${index}`} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-gray-400 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
