import React, { useRef, useState, useEffect } from 'react';
import { BoldIcon, ItalicIcon, UnderlineIcon, ListUnorderedIcon, ListOrderedIcon, ImageIcon, TableIcon } from './icons/editorIcons';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const EditorButton: React.FC<{ onClick: (e: React.MouseEvent) => void; title: string; children: React.ReactNode }> = ({ onClick, title, children }) => (
    <button
      type="button"
      onMouseDown={onClick} // Use onMouseDown to prevent the editor from losing focus
      title={title}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
    >
      {children}
    </button>
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, disabled }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Synchronize the editor's content when the external value changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string | null = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput(); // reflect changes immediately
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target?.result;
        if (typeof base64Image === 'string') {
          const imgHtml = `<img src="${base64Image}" style="max-width: 100%; height: auto;" />`;
          execCommand('insertHTML', imgHtml);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const insertTable = () => {
      const tableHtml = `<table style="border-collapse: collapse; width: 100%;">
        <tbody>
          <tr>
            <td style="border: 1px solid #ccc; padding: 4px;"> </td>
            <td style="border: 1px solid #ccc; padding: 4px;"> </td>
          </tr>
          <tr>
            <td style="border: 1px solid #ccc; padding: 4px;"> </td>
            <td style="border: 1px solid #ccc; padding: 4px;"> </td>
          </tr>
        </tbody>
      </table><p><br></p>`;
      execCommand('insertHTML', tableHtml);
  }

  return (
    <div className={`border border-gray-300 dark:border-gray-600 rounded-lg ${disabled ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-700'}`}>
      {!disabled && (
        <div className="flex items-center space-x-1 p-2 border-b border-gray-300 dark:border-gray-600 flex-wrap">
          <EditorButton onClick={() => execCommand('bold')} title="Bold"><BoldIcon className="w-4 h-4" /></EditorButton>
          <EditorButton onClick={() => execCommand('italic')} title="Italic"><ItalicIcon className="w-4 h-4" /></EditorButton>
          <EditorButton onClick={() => execCommand('underline')} title="Underline"><UnderlineIcon className="w-4 h-4" /></EditorButton>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
          <EditorButton onClick={() => execCommand('insertUnorderedList')} title="Bulleted List"><ListUnorderedIcon className="w-4 h-4" /></EditorButton>
          <EditorButton onClick={() => execCommand('insertOrderedList')} title="Numbered List"><ListOrderedIcon className="w-4 h-4" /></EditorButton>
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2"></div>
          <EditorButton onClick={() => fileInputRef.current?.click()} title="Insert Image"><ImageIcon className="w-4 h-4" /></EditorButton>
          <EditorButton onClick={insertTable} title="Insert Table"><TableIcon className="w-4 h-4" /></EditorButton>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
        </div>
      )}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        className="prose dark:prose-invert max-w-none p-4 min-h-[200px] focus:outline-none overflow-y-auto"
        style={{ caretColor: 'auto' }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
};

export default RichTextEditor;
