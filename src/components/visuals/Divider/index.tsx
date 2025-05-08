'use client';

import React, { useState } from 'react';

// Types for the Divider component
type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge';
type DividerThickness = 'thin' | 'medium' | 'thick' | 'custom';
type DividerAlignment = 'start' | 'center' | 'end';

interface DividerProps {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  thickness?: DividerThickness;
  customThickness?: number;
  color?: string;
  length?: string;
  className?: string;
  text?: React.ReactNode;
  textPosition?: DividerAlignment;
  withIcon?: React.ReactNode;
  withAnimation?: boolean;
}

/**
 * Divider Component
 * 
 * A visual separation element used to divide content into sections or groups,
 * typically represented as a horizontal or vertical line.
 * 
 * @param orientation - The direction of the divider (horizontal or vertical)
 * @param variant - The style of the line (solid, dashed, dotted, etc.)
 * @param thickness - Predefined thickness of the divider line
 * @param customThickness - Custom thickness value in pixels (when thickness="custom")
 * @param color - Color of the divider
 * @param length - Length of the divider (width for horizontal, height for vertical)
 * @param className - Additional CSS class for the divider
 * @param text - Optional text to display in the middle of the divider
 * @param textPosition - Position of text when present (start, center, end)
 * @param withIcon - Optional icon to display in the middle of the divider
 * @param withAnimation - Whether to animate the divider on mount
 */
const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  thickness = 'thin',
  customThickness,
  color = 'gray',
  length = '100%',
  className = '',
  text,
  textPosition = 'center',
  withIcon,
  withAnimation = false,
}) => {
  // Map thickness to pixel values
  const getThicknessValue = (): number => {
    if (thickness === 'custom' && customThickness !== undefined) {
      return customThickness;
    }
    
    switch (thickness) {
      case 'thin': return 1;
      case 'medium': return 2;
      case 'thick': return 4;
      default: return 1;
    }
  };
  
  // Map color to Tailwind classes or use custom color
  const getColorClass = (): string => {
    const validTailwindColors = ['gray', 'red', 'blue', 'green', 'yellow', 'indigo', 'purple', 'pink'];
    
    if (validTailwindColors.includes(color)) {
      return `border-${color}-200 dark:border-${color}-700`;
    }
    
    // If not a valid Tailwind color class, return empty string (will use style prop)
    return '';
  };
  
  // Map variant to border style
  const getBorderStyle = (): string => {
    switch (variant) {
      case 'solid': return 'border-solid';
      case 'dashed': return 'border-dashed';
      case 'dotted': return 'border-dotted';
      case 'double': return 'border-double';
      case 'groove': return 'border-groove';
      case 'ridge': return 'border-ridge';
      default: return 'border-solid';
    }
  };
  
  // Generate animation class
  const getAnimationClass = (): string => {
    if (!withAnimation) return '';
    
    return orientation === 'horizontal' 
      ? 'animate-grow-x' 
      : 'animate-grow-y';
  };
  
  // Text alignment class
  const getTextPositionClass = (): string => {
    if (orientation === 'horizontal') {
      switch (textPosition) {
        case 'start': return 'justify-start';
        case 'center': return 'justify-center';
        case 'end': return 'justify-end';
        default: return 'justify-center';
      }
    } else {
      switch (textPosition) {
        case 'start': return 'items-start';
        case 'center': return 'items-center';
        case 'end': return 'items-end';
        default: return 'items-center';
      }
    }
  };
  
  // Base style properties
  const baseStyle: React.CSSProperties = {
    ...(color && !getColorClass() ? { borderColor: color } : {}),
  };
  
  // If there's content (text or icon), render divider with content
  if (text || withIcon) {
    return (
      <div 
        className={`
          flex ${orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col justify-center'} 
          ${getTextPositionClass()} 
          w-full
          ${className}
        `}
      >
        {/* First segment of divider */}
        <div 
          className={`
            ${orientation === 'horizontal' ? 'w-full' : 'h-full'} 
            border-${orientation === 'horizontal' ? 'b' : 'l'} 
            ${getBorderStyle()} 
            ${getColorClass()} 
            ${getAnimationClass()}
          `}
          style={{
            ...(orientation === 'horizontal' 
              ? { borderBottomWidth: getThicknessValue() } 
              : { borderLeftWidth: getThicknessValue() }),
            ...baseStyle,
            ...(orientation === 'horizontal' 
              ? { width: length, flex: 1 } 
              : { height: length, flex: 1 })
          }}
        />
        
        {/* Content */}
        <div 
          className={`
            ${orientation === 'horizontal' ? 'px-3' : 'py-3'} 
            text-gray-500 dark:text-gray-400
          `}
        >
          {withIcon || text}
        </div>
        
        {/* Second segment of divider */}
        <div 
          className={`
            ${orientation === 'horizontal' ? 'w-full' : 'h-full'} 
            border-${orientation === 'horizontal' ? 'b' : 'l'} 
            ${getBorderStyle()} 
            ${getColorClass()} 
            ${getAnimationClass()}
          `}
          style={{
            ...(orientation === 'horizontal' 
              ? { borderBottomWidth: getThicknessValue() } 
              : { borderLeftWidth: getThicknessValue() }),
            ...baseStyle,
            ...(orientation === 'horizontal' 
              ? { width: length, flex: 1 } 
              : { height: length, flex: 1 })
          }}
        />
      </div>
    );
  }
  
  // Plain divider without content
  return (
    <div 
      className={`
        border-${orientation === 'horizontal' ? 'b' : 'l'} 
        ${getBorderStyle()} 
        ${getColorClass()} 
        ${getAnimationClass()} 
        ${className}
      `}
      style={{
        ...(orientation === 'horizontal' 
          ? { borderBottomWidth: getThicknessValue(), width: length } 
          : { borderLeftWidth: getThicknessValue(), height: length }),
        ...baseStyle,
      }}
      role="separator"
      aria-orientation={orientation}
    />
  );
};

// Define animations in a style component
const DividerAnimations = () => (
  <style jsx global>{`
    @keyframes growX {
      from { transform: scaleX(0); }
      to { transform: scaleX(1); }
    }
    
    @keyframes growY {
      from { transform: scaleY(0); }
      to { transform: scaleY(1); }
    }
    
    .animate-grow-x {
      transform-origin: left;
      animation: growX 0.5s ease-out forwards;
    }
    
    .animate-grow-y {
      transform-origin: top;
      animation: growY 0.5s ease-out forwards;
    }
  `}</style>
);

// Example component to showcase the Divider
const DividerExample: React.FC = () => {
  // State for divider options
  const [orientation, setOrientation] = useState<DividerOrientation>('horizontal');
  const [variant, setVariant] = useState<DividerVariant>('solid');
  const [thickness, setThickness] = useState<DividerThickness>('thin');
  const [customThickness, setCustomThickness] = useState(3);
  const [color, setColor] = useState('gray');
  const [withText, setWithText] = useState(false);
  const [withIcon, setWithIcon] = useState(false);
  const [animation, setAnimation] = useState(false);
  const [textPosition, setTextPosition] = useState<DividerAlignment>('center');

  // Generate icon for the divider
  const Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
  );
  
  return (
    <div className="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
      <DividerAnimations />
      
      <h2 className="text-xl font-semibold mb-4">Divider Demo</h2>
      
      {/* Basic example */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Basic Divider</h3>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
          <p className="mb-4">Content above the divider</p>
          <Divider />
          <p className="mt-4">Content below the divider</p>
        </div>
      </div>
      
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Orientation */}
        <div>
          <label className="block text-sm font-medium mb-1">Orientation</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                checked={orientation === 'horizontal'}
                onChange={() => setOrientation('horizontal')}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span>Horizontal</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                checked={orientation === 'vertical'}
                onChange={() => setOrientation('vertical')}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span>Vertical</span>
            </label>
          </div>
        </div>
        
        {/* Line Style */}
        <div>
          <label className="block text-sm font-medium mb-1">Line Style</label>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as DividerVariant)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
            <option value="groove">Groove</option>
            <option value="ridge">Ridge</option>
          </select>
        </div>
        
        {/* Thickness */}
        <div>
          <label className="block text-sm font-medium mb-1">Thickness</label>
          <select
            value={thickness}
            onChange={(e) => setThickness(e.target.value as DividerThickness)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="thin">Thin (1px)</option>
            <option value="medium">Medium (2px)</option>
            <option value="thick">Thick (4px)</option>
            <option value="custom">Custom</option>
          </select>
          
          {thickness === 'custom' && (
            <div className="mt-2">
              <label className="block text-xs font-medium mb-1">Custom Thickness ({customThickness}px)</label>
              <input
                type="range"
                min={1}
                max={10}
                value={customThickness}
                onChange={(e) => setCustomThickness(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}
        </div>
        
        {/* Color */}
        <div>
          <label className="block text-sm font-medium mb-1">Color</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="gray">Gray</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="indigo">Indigo</option>
            <option value="purple">Purple</option>
            <option value="pink">Pink</option>
            <option value="#f0ad4e">Custom (Orange)</option>
          </select>
        </div>
        
        {/* Content Options */}
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={withText}
              onChange={(e) => {
                setWithText(e.target.checked);
                if (e.target.checked) setWithIcon(false);
              }}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>With Text</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={withIcon}
              onChange={(e) => {
                setWithIcon(e.target.checked);
                if (e.target.checked) setWithText(false);
              }}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>With Icon</span>
          </label>
        </div>
        
        {/* Text Position */}
        {(withText || withIcon) && (
          <div>
            <label className="block text-sm font-medium mb-1">Text/Icon Position</label>
            <div className="flex space-x-4">
              {['start', 'center', 'end'].map((pos) => (
                <label key={pos} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={textPosition === pos as DividerAlignment}
                    onChange={() => setTextPosition(pos as DividerAlignment)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="capitalize">{pos}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        
        {/* Animation */}
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={animation}
              onChange={(e) => setAnimation(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span>Animate on Display</span>
          </label>
        </div>
      </div>
      
      {/* Interactive Preview */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Interactive Preview</h3>
        <div className={`p-6 border border-gray-200 dark:border-gray-700 rounded-md ${orientation === 'vertical' ? 'h-48 flex' : ''}`}>
          {orientation === 'horizontal' ? (
            <>
              <p className="mb-4">Content above the divider</p>
              <Divider 
                orientation={orientation}
                variant={variant}
                thickness={thickness}
                customThickness={customThickness}
                color={color}
                text={withText ? "Section Divider" : undefined}
                withIcon={withIcon ? <Icon /> : undefined}
                textPosition={textPosition}
                withAnimation={animation}
              />
              <p className="mt-4">Content below the divider</p>
            </>
          ) : (
            <>
              <div className="pr-4">Left content</div>
              <Divider 
                orientation={orientation}
                variant={variant}
                thickness={thickness}
                customThickness={customThickness}
                color={color}
                text={withText ? "Section Divider" : undefined}
                withIcon={withIcon ? <Icon /> : undefined}
                textPosition={textPosition}
                withAnimation={animation}
                length="100%"
              />
              <div className="pl-4">Right content</div>
            </>
          )}
        </div>
      </div>
      
      {/* Common Use Cases */}
      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">Common Use Cases</h3>
        
        <div className="space-y-8">
          {/* Text Divider */}
          <div>
            <h4 className="text-md font-medium mb-2">Text Divider</h4>
            <div className="py-4">
              <Divider text="SECTION TITLE" />
            </div>
          </div>
          
          {/* Colored Divider */}
          <div>
            <h4 className="text-md font-medium mb-2">Colored Divider</h4>
            <div className="py-4 space-y-4">
              <Divider color="blue" thickness="medium" />
              <Divider color="red" thickness="medium" />
              <Divider color="green" thickness="medium" />
            </div>
          </div>
          
          {/* Vertical Dividers */}
          <div>
            <h4 className="text-md font-medium mb-2">Vertical Dividers</h4>
            <div className="py-4 flex h-20 items-center">
              <div className="px-4">Item 1</div>
              <Divider orientation="vertical" />
              <div className="px-4">Item 2</div>
              <Divider orientation="vertical" variant="dashed" />
              <div className="px-4">Item 3</div>
            </div>
          </div>
          
          {/* Divider with Icon */}
          <div>
            <h4 className="text-md font-medium mb-2">Divider with Icon</h4>
            <div className="py-4">
              <Divider 
                withIcon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                } 
              />
            </div>
          </div>
          
          {/* Styled Dividers */}
          <div>
            <h4 className="text-md font-medium mb-2">Styled Dividers</h4>
            <div className="py-4 space-y-6">
              <Divider variant="dashed" />
              <Divider variant="dotted" />
              <Divider variant="double" thickness="thin" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DividerExample;
