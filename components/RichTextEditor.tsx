import React, { useRef, useEffect, useState } from 'react';
import { BoldIcon, ItalicIcon, UnderlineIcon, ListUnorderedIcon, ListOrderedIcon, ImageIcon, TableIcon, LinkIcon, UnlinkIcon } from './icons/editorIcons';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const EditorButton: React.FC<{ onClick: (e: React.MouseEvent) => void; title: string; children: React.ReactNode }> = ({ onClick, title, children }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
    >
      {children}
    </button>
);

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, disabled }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedSelection = useRef<Range | null>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('https://');
  
  // Synchronize the editor's content when the external value changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelection.current = selection.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (savedSelection.current && selection) {
      selection.removeAllRanges();
      selection.addRange(savedSelection.current);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value: string | null = null) => {
    // We focus before executing the command to ensure the selection is in the editor
    editorRef.current?.focus(); 
    document.execCommand(command, false, value);
    // handleInput() will be called by the onInput event of the div, which is triggered by execCommand
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target?.result;
        if (typeof base64Image === 'string') {
          const imgHtml = `<img src="${base64Image}" style="max-width: 100%; height: auto; border-radius: 4px;" />`;
          execCommand('insertHTML', imgHtml);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleLinkClick = () => {
    const selection = window.getSelection();
    
    if (!selection || selection.rangeCount === 0) {
        alert("Please select the text you want to turn into a link.");
        return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (!selectedText || selectedText.trim() === '') {
        alert("Please select the text you want to turn into a link.");
        return;
    }
    
    saveSelection();
    setShowLinkModal(true);
  };

  const insertLink = () => {
    restoreSelection();
    const selection = window.getSelection();
    
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();
      
      if (linkUrl && linkUrl.trim() !== '' && linkUrl !== 'https://') {
        const link = document.createElement('a');
        link.href = linkUrl;
        link.textContent = selectedText;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        
        range.deleteContents();
        range.insertNode(link);
        
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.setStartAfter(link);
        newRange.collapse(true);
        selection.addRange(newRange);
        
        handleInput();
      }
    }
    
    setShowLinkModal(false);
    setLinkUrl('https://');
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
    <>
      <style>{`
        .prose a {
          color: #3b82f6;
          text-decoration: underline;
          cursor: pointer;
        }
        .prose a:hover {
          color: #2563eb;
        }
        .dark .prose a {
          color: #60a5fa;
        }
        .dark .prose a:hover {
          color: #93c5fd;
        }
      `}</style>
      
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-4 dark:text-white">Add Link</h3>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mb-4 dark:bg-gray-700 dark:text-white"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  insertLink();
                } else if (e.key === 'Escape') {
                  setShowLinkModal(false);
                  setLinkUrl('https://');
                }
              }}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowLinkModal(false);
                  setLinkUrl('https://');
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}
      
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
            <EditorButton onClick={handleLinkClick} title="Add Link"><LinkIcon className="w-4 h-4" /></EditorButton>
            <EditorButton onClick={() => execCommand('unlink')} title="Remove Link"><UnlinkIcon className="w-4 h-4" /></EditorButton>
            <EditorButton onClick={() => fileInputRef.current?.click()} title="Insert Image"><ImageIcon className="w-4 h-4" /></EditorButton>
            <EditorButton onClick={() => insertTable()} title="Insert Table"><TableIcon className="w-4 h-4" /></EditorButton>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
          </div>
        )}

        <div
          ref={editorRef}
          contentEditable={!disabled}
          onInput={handleInput}
          onMouseUp={saveSelection}
          onKeyUp={saveSelection}
          className="prose dark:prose-invert max-w-none p-4 min-h-[200px] focus:outline-none overflow-y-auto"
          style={{ direction: 'ltr', textAlign: 'left' }}
        />
      </div>
    </>
  );
};

export default RichTextEditor;