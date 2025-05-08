/**
 * File Upload Component Index
 * 
 * Demonstrates various types of file upload interfaces including drag-and-drop
 * and button-based selection.
 */
'use client';

import React from 'react';
import FileUpload, { FileUploadProps } from './FileUpload';

const FileUploadDemo: React.FC = () => {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-xl font-semibold mb-4">File Upload</h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          A component for selecting and uploading files, supporting both button-based selection
          and drag-and-drop functionality. This component provides visual feedback during interaction
          and displays selected files with size information.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drag and Drop Upload */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Drag and Drop Upload</h3>
            <FileUpload
              dragDropEnabled={true}
              accept="image/*,.pdf"
              maxSizeMB={5}
              dragDropText="Drag images or PDFs here"
            />
          </div>
          
          {/* Multiple File Upload */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Multiple File Upload</h3>
            <FileUpload
              multiple={true}
              dragDropEnabled={true}
              accept=".jpg,.png,.pdf,.docx"
              maxSizeMB={10}
              dragDropText="Drop multiple files here"
            />
          </div>
          
          {/* Button-only Upload */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Button-only Upload</h3>
            <FileUpload
              dragDropEnabled={false}
              buttonText="Choose a Document"
              accept=".doc,.docx,.pdf,.txt"
            />
          </div>
          
          {/* Specialized Upload */}
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Image Upload with Preview</h3>
            <FileUpload
              dragDropEnabled={true}
              accept="image/*"
              maxSizeMB={2}
              dragDropText="Drop image files here"
            />
            <p className="text-xs text-gray-500 mt-2">
              * In a real implementation, this would include image previews
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Common Use Cases</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Form inputs for file uploads (profile pictures, documents, etc.)</li>
          <li>Media upload interfaces for galleries and collections</li>
          <li>Document management systems</li>
          <li>Content management systems</li>
          <li>Email attachments</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Technical Details</h3>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Alternative Names</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">File Dropzone, File Picker, File Select, Attachment Input</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Related Components</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Button, Progress Bar, Form Input</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Implementation</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Uses HTML5 File API, drag and drop events, and hidden input elements</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900 dark:text-white">Accessibility</dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">Supports keyboard navigation via the button interface</dd>
          </div>
        </dl>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-3">Variant Options</h3>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Variant</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Drag & Drop</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Provides a dropzone area for dragging files from the file system</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Button-only</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Simple button that opens the file selection dialog</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">Multiple Files</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Allows selection of multiple files in a single interaction</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">File Type Restricted</td>
              <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">Limits selection to specific file types (images, documents, etc.)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FileUploadDemo;
