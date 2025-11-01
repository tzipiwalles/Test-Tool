import React, { useState, useRef, useEffect } from 'react';

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

  useEffect(() => {
      setInputValue(value || '');
  }, [value]);

  const handleFocus = () => {
    setIsOpen(true);
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Check if the new focused element is outside the component
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
        setIsOpen(false);
        // Persist the potentially new value from input
        if (inputValue !== value) {
            onChange(inputValue || null);
        }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className={`relative ${className || ''}`} ref={containerRef} onBlur={handleBlur}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={inputClassName}
        autoComplete="off"
      />
      {isOpen && (
        <ul className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {filteredOptions.map(option => (
            <li
              key={option}
              // Use onMouseDown to handle click before blur event fires
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
