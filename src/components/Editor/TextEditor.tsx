
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onContentOverflow?: () => void;
}

// A4 height in pixels at 96 DPI
const A4_HEIGHT_PX = 1123;

const TextEditor = ({ content, onChange, onContentOverflow }: TextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Initialize editor with content
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

  // Monitor content height and trigger overflow event
  useEffect(() => {
    const checkContentHeight = () => {
      if (editorRef.current) {
        const currentHeight = editorRef.current.scrollHeight;
        if (currentHeight > A4_HEIGHT_PX && onContentOverflow) {
          onContentOverflow();
        }
      }
    };

    // Create a MutationObserver to watch for content changes
    if (editorRef.current && onContentOverflow) {
      const observer = new MutationObserver(checkContentHeight);
      observer.observe(editorRef.current, { 
        childList: true, 
        subtree: true, 
        characterData: true 
      });

      return () => observer.disconnect();
    }
  }, [onContentOverflow]);

  // Handle input changes
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div 
      ref={editorRef}
      className={cn(
        "editor-content outline-none min-h-[calc(1123px-4rem)] max-h-[1123px] overflow-y-auto",
        "focus:ring-0 focus:outline-none"
      )}
      contentEditable
      onInput={handleInput}
      suppressContentEditableWarning
      data-placeholder="Commencez à écrire..."
    />
  );
};

export default TextEditor;
