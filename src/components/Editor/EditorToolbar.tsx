
import { cn } from '@/lib/utils';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
  Type,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';
import { useCallback } from 'react';

type ToolbarButtonProps = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isActive?: boolean;
};

// This is a simple toolbar for the demo. In a real implementation,
// you would integrate this with Lexical's toolbar functionality.
const EditorToolbar = () => {
  const execCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
  }, []);

  const ToolbarButton = ({ icon, label, onClick, isActive }: ToolbarButtonProps) => (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 w-8 rounded-md flex items-center justify-center",
        "hover:bg-accent hover:text-accent-foreground",
        "transition-colors duration-200",
        isActive && "bg-accent text-accent-foreground"
      )}
      title={label}
      aria-label={label}
    >
      {icon}
    </button>
  );

  const ToolbarSeparator = () => (
    <div className="h-4 w-px bg-border mx-1" />
  );

  return (
    <div className="border-t p-1 overflow-x-auto">
      <div className="flex items-center space-x-1 container">
        <ToolbarButton 
          icon={<Type size={16} />} 
          label="Texte normal" 
          onClick={() => execCommand('formatBlock', 'p')} 
        />
        <ToolbarButton 
          icon={<Heading1 size={16} />} 
          label="Titre 1" 
          onClick={() => execCommand('formatBlock', 'h1')} 
        />
        <ToolbarButton 
          icon={<Heading2 size={16} />} 
          label="Titre 2" 
          onClick={() => execCommand('formatBlock', 'h2')} 
        />
        <ToolbarButton 
          icon={<Heading3 size={16} />} 
          label="Titre 3" 
          onClick={() => execCommand('formatBlock', 'h3')} 
        />

        <ToolbarSeparator />

        <ToolbarButton 
          icon={<Bold size={16} />} 
          label="Gras" 
          onClick={() => execCommand('bold')} 
        />
        <ToolbarButton 
          icon={<Italic size={16} />} 
          label="Italique" 
          onClick={() => execCommand('italic')} 
        />
        <ToolbarButton 
          icon={<Underline size={16} />} 
          label="Souligné" 
          onClick={() => execCommand('underline')} 
        />

        <ToolbarSeparator />

        <ToolbarButton 
          icon={<AlignLeft size={16} />} 
          label="Aligner à gauche" 
          onClick={() => execCommand('justifyLeft')} 
        />
        <ToolbarButton 
          icon={<AlignCenter size={16} />} 
          label="Centrer" 
          onClick={() => execCommand('justifyCenter')} 
        />
        <ToolbarButton 
          icon={<AlignRight size={16} />} 
          label="Aligner à droite" 
          onClick={() => execCommand('justifyRight')} 
        />

        <ToolbarSeparator />

        <ToolbarButton 
          icon={<List size={16} />} 
          label="Liste à puces" 
          onClick={() => execCommand('insertUnorderedList')} 
        />
        <ToolbarButton 
          icon={<ListOrdered size={16} />} 
          label="Liste numérotée" 
          onClick={() => execCommand('insertOrderedList')} 
        />

        <ToolbarSeparator />

        <ToolbarButton 
          icon={<Link size={16} />} 
          label="Insérer un lien" 
          onClick={() => {
            const url = prompt('Entrez l\'URL du lien:', 'https://');
            if (url) execCommand('createLink', url);
          }} 
        />
        <ToolbarButton 
          icon={<Image size={16} />} 
          label="Insérer une image" 
          onClick={() => {
            const url = prompt('Entrez l\'URL de l\'image:', 'https://');
            if (url) execCommand('insertImage', url);
          }} 
        />
      </div>
    </div>
  );
};

export default EditorToolbar;
