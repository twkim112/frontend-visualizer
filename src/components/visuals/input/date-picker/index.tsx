'use client';

import React, { useState, useRef, useEffect } from 'react';

// DatePicker Component - A clean, accessible calendar component for selecting dates
const DatePickerExample: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [dateFormat, setDateFormat] = useState<string>('MM/DD/YYYY');
  const [size, setSize] = useState<string>('medium');
  const [variant, setVariant] = useState<string>('default');
  
  const calendarRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Handle clicking outside to close calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Format date for display
  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    switch (dateFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'MM/DD/YYYY':
      default:
        return `${month}/${day}/${year}`;
    }
  };
  
  // Navigation functions
  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  
  const prevYear = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear() - 1, prev.getMonth(), 1));
  };
  
  const nextYear = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear() + 1, prev.getMonth(), 1));
  };
  
  // Get month and year for display
  const getMonthName = (date: Date): string => {
    return date.toLocaleString('default', { month: 'long' });
  };
  
  const getYear = (date: Date): number => {
    return date.getFullYear();
  };
  
  // Generate grid of days for current month
  const generateDays = (): React.ReactNode => {
    const days = [];
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month and last day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // Get the day of the week for the first day (0-6)
    const firstDayIndex = firstDay.getDay();
    
    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const day = prevMonthLastDay - i;
      const date = new Date(year, month - 1, day);
      days.push(
        <button
          key={`prev-${day}`}
          type="button"
          className="w-8 h-8 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => handleDateSelect(date)}
          aria-label={date.toDateString()}
        >
          {day}
        </button>
      );
    }
    
    // Add days from current month
    for (let day = 1; day <= lastDay; day++) {
      const date = new Date(year, month, day);
      const isToday = isSameDay(new Date(), date);
      const isSelected = selectedDate && isSameDay(selectedDate, date);
      
      days.push(
        <button
          key={`current-${day}`}
          type="button"
          className={`
            w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300
            ${isToday ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200' : ''}
            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
            ${!isToday && !isSelected ? 'text-gray-700 dark:text-gray-200' : ''}
          `}
          onClick={() => handleDateSelect(date)}
          aria-label={date.toDateString()}
          aria-selected={isSelected ? 'true' : 'false'}
        >
          {day}
        </button>
      );
    }
    
    // Add days from next month to fill the calendar
    const daysNeeded = 42 - days.length; // 6 rows of 7 days
    for (let day = 1; day <= daysNeeded; day++) {
      const date = new Date(year, month + 1, day);
      days.push(
        <button
          key={`next-${day}`}
          type="button"
          className="w-8 h-8 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={() => handleDateSelect(date)}
          aria-label={date.toDateString()}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };
  
  // Check if two dates are the same day
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
  
  // Handle date selection
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
    setCurrentMonth(date);
  };
  
  // Handle clicking the input
  const toggleCalendar = () => {
    setIsCalendarOpen(prev => !prev);
  };
  
  // Handle clearing the selection
  const handleClear = () => {
    setSelectedDate(null);
    setIsCalendarOpen(false);
  };
  
  // Handle selecting today
  const handleToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
  };
  
  // Day names
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  
  // Get size classes based on selected size
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'p-1 text-sm';
      case 'large':
        return 'p-3 text-lg';
      case 'medium':
      default:
        return 'p-2 text-base';
    }
  };
  
  // Get variant classes based on selected variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'outlined':
        return 'border-2 border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400';
      case 'filled':
        return 'bg-gray-100 border border-transparent focus:bg-white focus:border-blue-500 dark:bg-gray-700 dark:focus:bg-gray-600 dark:focus:border-blue-400';
      case 'default':
      default:
        return 'border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-400';
    }
  };
  
  return (
    <div className="p-6 space-y-10 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Date Picker Demo</h2>
      
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Date Format</label>
          <div className="flex flex-wrap gap-2">
            {['MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'].map((format) => (
              <button
                key={format}
                onClick={() => setDateFormat(format)}
                className={`
                  px-3 py-1 text-sm rounded-md
                  ${dateFormat === format
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
                `}
              >
                {format}
              </button>
            ))}
          </div>
        </div>
        
        {/* Size Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Size</label>
          <div className="flex space-x-2">
            {['small', 'medium', 'large'].map((s) => (
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
        
        {/* Variant Selection */}
        <div>
          <label className="block text-sm font-medium mb-1">Variant</label>
          <div className="flex flex-wrap gap-2">
            {['default', 'outlined', 'filled'].map((v) => (
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
      </div>
      
      {/* Date Picker Example */}
      <div className="md:w-1/2">
        <h3 className="text-lg font-medium mb-3">Standard Date Picker</h3>
        
        <div className="relative">
          {/* Input field */}
          <div className="relative mb-2">
            <input
              ref={inputRef}
              type="text"
              className={`w-full rounded-md px-3 py-2 pr-10 ${getSizeClasses()} ${getVariantClasses()} focus:outline-none dark:text-white dark:bg-gray-800`}
              placeholder="Select a date"
              value={formatDate(selectedDate)}
              onClick={toggleCalendar}
              readOnly
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              onClick={toggleCalendar}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          
          {/* Calendar dropdown */}
          {isCalendarOpen && (
            <div 
              ref={calendarRef}
              className="absolute z-10 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 w-64"
            >
              {/* Calendar header */}
              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={prevYear}
                  aria-label="Previous Year"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={prevMonth}
                  aria-label="Previous Month"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="text-gray-700 dark:text-gray-200 font-medium">
                  {getMonthName(currentMonth)} {getYear(currentMonth)}
                </div>
                
                <button
                  type="button"
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={nextMonth}
                  aria-label="Next Month"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={nextYear}
                  aria-label="Next Year"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Days of the week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {generateDays()}
              </div>
              
              {/* Calendar footer */}
              <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  onClick={handleClear}
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                  onClick={handleToday}
                >
                  Today
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* More Examples */}
      <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium mb-4">More Examples</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Inline Calendar */}
          <div>
            <h4 className="text-md font-medium mb-2">Inline Calendar</h4>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-4">
              {/* Calendar header */}
              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={prevMonth}
                  aria-label="Previous Month"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="text-gray-700 dark:text-gray-200 font-medium">
                  {getMonthName(currentMonth)} {getYear(currentMonth)}
                </div>
                
                <button
                  type="button"
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={nextMonth}
                  aria-label="Next Month"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Days of the week */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {generateDays()}
              </div>
            </div>
          </div>
          
          {/* Date Range Example (simplified) */}
          <div>
            <h4 className="text-md font-medium mb-2">Date Range Input</h4>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  className={`w-full rounded-md px-3 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:focus:border-blue-400 dark:text-white dark:bg-gray-800`}
                  placeholder="Start date"
                  readOnly
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <span className="text-gray-500 dark:text-gray-400">to</span>
              
              <div className="relative flex-1">
                <input
                  type="text"
                  className={`w-full rounded-md px-3 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:focus:border-blue-400 dark:text-white dark:bg-gray-800`}
                  placeholder="End date"
                  readOnly
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Disabled Date Picker */}
          <div>
            <h4 className="text-md font-medium mb-2">Disabled Date Picker</h4>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-md px-3 py-2 border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400"
                placeholder="Select a date"
                disabled
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Date Picker with Time (simplified UI) */}
          <div>
            <h4 className="text-md font-medium mb-2">Date Picker with Time</h4>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  className="w-full rounded-md px-3 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:focus:border-blue-400 dark:text-white dark:bg-gray-800"
                  placeholder="Date"
                  value={formatDate(selectedDate)}
                  readOnly
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <select className="rounded-md px-3 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:focus:border-blue-400 dark:text-white dark:bg-gray-800">
                <option>12:00 PM</option>
                <option>1:00 PM</option>
                <option>2:00 PM</option>
                <option>3:00 PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatePickerExample;
