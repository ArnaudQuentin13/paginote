
import { cn } from "@/lib/utils";
import { PlusCircle, XCircle } from "lucide-react";
import { Page } from "./index";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface PaginationProps {
  pages: Page[];
  currentPageIndex: number;
  onPageChange: (index: number) => void;
  onAddPage: () => void;
  onDeletePage: (index: number) => void;
}

const Pagination = ({
  pages,
  currentPageIndex,
  onPageChange,
  onAddPage,
  onDeletePage,
}: PaginationProps) => {
  const handleAddPage = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddPage();
  };

  const handleDeletePage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    onDeletePage(index);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-muted-foreground">
        {pages.length} page{pages.length !== 1 ? "s" : ""}
      </div>
      
      <div className="flex-1 overflow-x-auto px-4">
        <TransitionGroup className="flex space-x-1 justify-center">
          {pages.map((page, index) => (
            <CSSTransition
              key={page.id}
              timeout={300}
              classNames={{
                enter: "opacity-0 scale-95",
                enterActive: "opacity-100 scale-100 transition-all duration-300",
                exit: "opacity-100 scale-100",
                exitActive: "opacity-0 scale-95 transition-all duration-300",
              }}
            >
              <button
                className={cn(
                  "relative min-w-9 h-9 flex items-center justify-center rounded border text-sm transition-all",
                  currentPageIndex === index
                    ? "border-primary bg-primary text-primary-foreground font-medium"
                    : "border-border bg-background text-foreground hover:bg-accent"
                )}
                onClick={() => onPageChange(index)}
              >
                {index + 1}
                {pages.length > 1 && (
                  <button
                    className={cn(
                      "absolute -top-1 -right-1 w-4 h-4 rounded-full text-red-600 opacity-0 group-hover:opacity-100 hover:bg-white transition-opacity",
                      "group-hover:opacity-100",
                      currentPageIndex === index ? "opacity-0" : "group-hover:opacity-100",
                    )}
                    onClick={(e) => handleDeletePage(e, index)}
                    aria-label={`Supprimer la page ${index + 1}`}
                  >
                    <XCircle size={16} />
                  </button>
                )}
              </button>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      
      <div>
        <button
          onClick={handleAddPage}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4"
        >
          <PlusCircle className="mr-1" size={16} />
          <span className="sr-only sm:not-sr-only">Ajouter une page</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
