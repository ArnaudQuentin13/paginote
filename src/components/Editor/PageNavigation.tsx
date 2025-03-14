
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const PageNavigation = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PageNavigationProps) => {
  return (
    <div className="flex items-center space-x-1 bg-secondary rounded-md p-1">
      <button
        onClick={onPrevious}
        disabled={currentPage <= 1}
        className={cn(
          "h-6 w-6 rounded-md flex items-center justify-center transition-colors",
          currentPage <= 1
            ? "text-muted-foreground"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
        aria-label="Page précédente"
      >
        <ChevronLeft size={14} />
      </button>
      
      <div className="text-xs font-medium">
        {currentPage} / {totalPages}
      </div>
      
      <button
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className={cn(
          "h-6 w-6 rounded-md flex items-center justify-center transition-colors",
          currentPage >= totalPages
            ? "text-muted-foreground"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
        aria-label="Page suivante"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default PageNavigation;
