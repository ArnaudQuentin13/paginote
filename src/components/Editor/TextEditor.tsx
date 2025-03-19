import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onContentOverflow?: () => void;
}

const MAX_HEIGHT = 1069;
const EDITOR_WIDTH = "calc(794px - 64px)";

const TextEditor = ({ content, onChange, onContentOverflow }: TextEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const hiddenEditorRef = useRef<HTMLDivElement>(null);
  const [isComposing, setIsComposing] = useState(false);
  const lastValidContent = useRef(content);
  const isUpdatingRef = useRef(false);

  // Vérification de hauteur
  const checkHeight = useCallback(() => {
    if (!hiddenEditorRef.current) return false;
    return hiddenEditorRef.current.getBoundingClientRect().height <= MAX_HEIGHT;
  }, []);

  // Mise à jour du contenu sans perdre la position du curseur
  const updateContent = useCallback((newHtml: string) => {
    if (isUpdatingRef.current) return;
    if (!editorRef.current || !hiddenEditorRef.current) return;
    
    // Éviter les mises à jour en cascade
    isUpdatingRef.current = true;
    
    try {
      // Validation dans l'éditeur caché
      hiddenEditorRef.current.innerHTML = newHtml;
      
      if (checkHeight()) {
        // Ne pas manipuler directement le HTML de l'éditeur pour éviter de perdre le focus et la position
        lastValidContent.current = newHtml;
        onChange(newHtml);
      } else {
        if (onContentOverflow) onContentOverflow();
        
        // Si on dépasse la hauteur maximale, on restaure à la dernière valeur valide
        // mais seulement si ce n'est pas déjà le contenu actuel
        if (editorRef.current.innerHTML !== lastValidContent.current) {
          const selection = window.getSelection();
          const range = selection?.getRangeAt(0);
          
          // Sauvegarder où est le curseur avant modification
          const previousNode = range?.startContainer;
          const previousOffset = range?.startOffset;
          
          // Mettre à jour le contenu
          editorRef.current.innerHTML = lastValidContent.current;
          
          // Tenter de restaurer la position du curseur au même endroit relatif
          if (selection && range && previousNode && previousOffset !== undefined) {
            // Restaurer le curseur au début comme solution de secours
            selection.removeAllRanges();
            const newRange = document.createRange();
            newRange.setStart(editorRef.current, 0);
            newRange.setEnd(editorRef.current, 0);
            selection.addRange(newRange);
          }
        }
      }
    } finally {
      isUpdatingRef.current = false;
    }
  }, [checkHeight, onChange, onContentOverflow]);

  // Gestionnaire d'input simplifié
  const handleInput = useCallback((e: React.FormEvent<HTMLDivElement>) => {
    if (isComposing || isUpdatingRef.current) return;
    updateContent(e.currentTarget.innerHTML);
  }, [isComposing, updateContent]);

  // Gestion des touches spéciales
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Autoriser Ctrl+C/Ctrl+V
    if ((e.ctrlKey || e.metaKey) && ['c', 'v'].includes(e.key.toLowerCase())) {
      return;
    }

    // Gestion personnalisée de la touche Entrée
    if (e.key === 'Enter' && !isComposing) {
      e.preventDefault();
      document.execCommand('insertLineBreak');
    }
  }, [isComposing]);

  // Gestion du collage
  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }, []);

  // Synchronisation initiale
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content;
    }
    if (hiddenEditorRef.current) {
      hiddenEditorRef.current.innerHTML = content;
    }
    lastValidContent.current = content;
  }, [content]);

  return (
    <>
      <div 
        ref={editorRef}
        className={cn(
          "editor-content outline-none min-h-[calc(1123px-4rem)] max-h-[1123px] overflow-y-auto",
          "focus:ring-0 focus:outline-none"
        )}
        style={{ width: EDITOR_WIDTH }}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => {
          setIsComposing(false);
          // Mettre à jour le contenu après la fin de composition IME
          if (editorRef.current) {
            updateContent(editorRef.current.innerHTML);
          }
        }}
        suppressContentEditableWarning
        data-placeholder="Commencez à écrire..."
      />

      <div
        ref={hiddenEditorRef}
        className={cn(
          "absolute top-[-9999px] left-[-9999px] editor-content",
          "outline-none overflow-y-auto"
        )}
        style={{ width: EDITOR_WIDTH }}
        aria-hidden
      />
    </>
  );
};

export default TextEditor;