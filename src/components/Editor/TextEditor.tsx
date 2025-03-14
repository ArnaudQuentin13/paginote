
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TextEditor = ({ content, onChange }: TextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  
  // Initialize editor with content
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
    }
  }, [content]);

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
        "editor-content outline-none min-h-[calc(29.7cm-4rem)]",
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
