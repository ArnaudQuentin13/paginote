
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface HiddenTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onContentOverflow?: () => void;
  getHiddenHeight: (height: number) => void;
  setBlockWriting: (block: boolean) => void;
}

// A4 height in pixels at 96 DPI
const A4_HEIGHT_PX = 1123;


const HiddenTextEditor = ({ content, onChange, onContentOverflow, getHiddenHeight, setBlockWriting }: HiddenTextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  
  // Initialize editor with content
  useEffect(() => {
    if (editorRef.current && content !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = content;
      
      // Check if content is already overflowing on initialization
      setTimeout(() => {
        checkContentHeight();
      }, 0);
    }
  }, [content]);



  // Monitor content height and trigger overflow event
  useEffect(() => {
    const checkHeight = () => {
      checkContentHeight();
    };

    // Create a MutationObserver to watch for content changes
    if (editorRef.current && onContentOverflow) {
      const observer = new MutationObserver(checkHeight);
      observer.observe(editorRef.current, { 
        childList: true, 
        subtree: true, 
        characterData: true 
      });

      return () => observer.disconnect();
    }
  }, [onContentOverflow]);
  
  const checkContentHeight = () => {
    if (editorRef.current) {
      
      
      const currentHeight = editorRef.current.scrollHeight;
      const visibleHeight = editorRef.current.clientHeight;
      console.log("currentHeight hidden: ", currentHeight);
      getHiddenHeight(currentHeight);
      if(currentHeight >= 1080) {
        setBlockWriting(true);
      } else {
        setBlockWriting(false);
      }
      
      // Check if content exceeds the visible area
      if (currentHeight > visibleHeight) {
        if (!isOverflowing && onContentOverflow) {
          setIsOverflowing(true);
          onContentOverflow();
        }
      } else {
        setIsOverflowing(false);
      }
      
    }
  };

  // Handle input changes
  const handleInput = (e: React.SyntheticEvent) => {
    
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
      checkContentHeight();
    }
  };

  return (
    <div 
      ref={editorRef}
      className={cn(
        "absolute top-[-9999px] left-[-9999px] editor-content outline-none min-h-[calc(1123px-4rem)] max-h-[1123px] overflow-y-auto",
        "focus:ring-0 focus:outline-none"
      )}
      contentEditable
      onInput={(e) => handleInput(e)}
      suppressContentEditableWarning
      data-placeholder="Commencez à écrire..."
    />
  );
};

export default HiddenTextEditor;
