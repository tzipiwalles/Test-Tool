import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface EditableDatalistInputProps {
  value: string | null;
  onChange: (value: string | null) => void;
  options: string[];
  placeholder?: string;
  className?: string; // For the outer container
  inputClassName?: string; // For the input element itself
}

const EditableDatalistInput: React.FC<EditableDatalistInputProps> = ({ 
  value, 
  onChange, 
  options, 
  placeholder,
  className,
  inputClassName 
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [listStyle, setListStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
      setInputValue(value || '');
  }, [value]);

  const updateListPosition = useCallback(() => {
    if (inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setListStyle({
            position: 'fixed',
            top: `${rect.bottom}px`,
            left: `${rect.left}px`,
            width: `${rect.width}px`,
            zIndex: 1000, // High z-index to appear on top of other UI
        });
    }
  }, []);

  useEffect(() => {
      if (isOpen) {
          updateListPosition();
          window.addEventListener('resize', updateListPosition);
          window.addEventListener('scroll', updateListPosition, true);
      }
      return () => {
          window.removeEventListener('resize', updateListPosition);
          window.removeEventListener('scroll', updateListPosition, true);
      };
  }, [isOpen, updateListPosition]);
  
  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (
              isOpen &&
              containerRef.current && !containerRef.current.contains(event.target as Node) &&
              listRef.current && !listRef.current.contains(event.target as Node)
          ) {
              setIsOpen(false);
              if (inputValue !== value) {
                  onChange(inputValue || null);
              }
          }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
          document.removeEventListener('mousedown', handleClickOutside);
      };
  }, [isOpen, inputValue, value, onChange]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    onChange(option);
    setIsOpen(false);
  };
  
  const toggleDropdown = () => {
    if (isOpen && inputValue !== value) {
        onChange(inputValue || null);
    }
    setIsOpen(prev => !prev);
  };

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={`relative ${className || ''}`} ref={containerRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`${inputClassName} pr-8`}
          autoComplete="off"
        />
        <button 
            type="button" 
            onClick={toggleDropdown} 
            className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            tabIndex={-1}
        >
            <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <ul ref={listRef} style={listStyle} className="mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {filteredOptions.map(option => (
            <li
              key={option}
              onMouseDown={() => handleOptionClick(option)}
              className="px-3 py-1.5 text-sm cursor-pointer hover:bg-blue-accent hover:text-white text-gray-800 dark:text-gray-200"
            >
              {option}
            </li>
          ))}
          {filteredOptions.length === 0 && (
             <li className="px-3 py-1.5 text-sm text-gray-500 italic">No matches found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default EditableDatalistInput;
