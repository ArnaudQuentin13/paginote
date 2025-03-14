import { useEffect, useState } from 'react';
import EditorToolbar from './EditorToolbar';
import TextEditor from './TextEditor';
import Pagination from './Pagination';
import { toast } from 'sonner';
import PageNavigation from './PageNavigation';
import { cn } from '@/lib/utils';

export type Page = {
  id: string;
  content: string;
  title: string;
};

const Editor = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [documentTitle, setDocumentTitle] = useState('Document sans titre');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (pages.length === 0) {
      setPages([
        {
          id: generateId(),
          content: '',
          title: 'Page 1'
        }
      ]);
    }
  }, [pages.length]);

  const currentPage = pages[currentPageIndex] || pages[0];

  const generateId = () => {
    return Math.random().toString(36).substring(2, 9);
  };

  const handlePageChange = (index: number) => {
    if (index >= 0 && index < pages.length) {
      saveCurrentPage();
      setCurrentPageIndex(index);
    }
  };

  const handleContentChange = (content: string) => {
    if (!currentPage) return;
    
    setPages(prev => 
      prev.map((page, idx) => 
        idx === currentPageIndex 
          ? { ...page, content } 
          : page
      )
    );
  };

  const addNewPage = () => {
    saveCurrentPage();
    
    const newPage: Page = {
      id: generateId(),
      content: '',
      title: `Page ${pages.length + 1}`
    };
    
    setPages(prev => [...prev, newPage]);
    setCurrentPageIndex(pages.length);
    
    toast('Nouvelle page ajoutée', {
      description: `Page ${pages.length + 1} créée avec succès.`,
      duration: 2000,
    });
  };

  const deletePage = (index: number) => {
    if (pages.length <= 1) {
      toast('Impossible de supprimer', {
        description: 'Un document doit contenir au moins une page.',
        duration: 3000,
      });
      return;
    }

    const updatedPages = pages.filter((_, idx) => idx !== index);
    setPages(updatedPages);
    
    if (currentPageIndex >= index && currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    } else if (currentPageIndex >= updatedPages.length) {
      setCurrentPageIndex(updatedPages.length - 1);
    }
    
    toast('Page supprimée', {
      description: `Page ${index + 1} supprimée avec succès.`,
      duration: 2000,
    });
  };

  const saveCurrentPage = () => {
    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      toast('Modifications enregistrées', {
        description: 'Toutes les modifications ont été sauvegardées.',
        duration: 2000,
      });
    }, 500);
  };

  const exportDocument = () => {
    try {
      const content = pages.map(page => page.content).join('\n\n--- Nouvelle Page ---\n\n');
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${documentTitle}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast('Document exporté', {
        description: `Le document "${documentTitle}" a été exporté avec succès.`,
      });
    } catch (error) {
      console.error('Error exporting document:', error);
      toast('Erreur lors de l\'exportation', {
        description: 'Une erreur est survenue lors de l\'exportation du document.',
      });
    }
  };

  const handleDocumentTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentTitle(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen animate-fade-in">
      <div className="border-b bg-white/80 backdrop-blur-sm z-10 sticky top-0">
        <div className="container py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-4 flex-1">
            <input
              type="text"
              value={documentTitle}
              onChange={handleDocumentTitleChange}
              className="text-lg sm:text-xl font-medium bg-transparent border-none focus:outline-none focus:ring-0 w-full"
              aria-label="Titre du document"
            />
            {isSaving && (
              <span className="text-xs text-muted-foreground animate-pulse">
                Enregistrement...
              </span>
            )}
          </div>
          <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-2">
            <div className="flex-1 sm:flex-initial">
              <PageNavigation
                currentPage={currentPageIndex + 1}
                totalPages={pages.length}
                onPrevious={() => handlePageChange(currentPageIndex - 1)}
                onNext={() => handlePageChange(currentPageIndex + 1)}
              />
            </div>
            <button
              onClick={exportDocument}
              className="inline-flex h-8 items-center rounded-md px-3 text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              Exporter
            </button>
          </div>
        </div>
        
        <EditorToolbar />
      </div>

      <div className={cn(
        "flex-1 overflow-auto transition-all duration-300 ease-in-out",
        "bg-gradient-to-b from-blue-50 to-gray-50"
      )}>
        <div className="container py-8 flex justify-center">
          <div className={cn(
            "paper w-full max-w-4xl min-h-[29.7cm] p-8 transition-all duration-300",
            "animate-scale-in"
          )}>
            {currentPage && (
              <TextEditor
                content={currentPage.content}
                onChange={handleContentChange}
              />
            )}
          </div>
        </div>
      </div>

      <div className="border-t bg-white/80 backdrop-blur-sm z-10 sticky bottom-0">
        <div className="container py-4">
          <Pagination
            pages={pages}
            currentPageIndex={currentPageIndex}
            onPageChange={handlePageChange}
            onAddPage={addNewPage}
            onDeletePage={deletePage}
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
