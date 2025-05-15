import { Suspense } from "react";
import { History } from "lucide-react";
import { HistoryContent, HistorySkeleton } from "./history-content";

export default function HistoryPage() {

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
              <History className="h-8 w-8 text-secondary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Match History</h1>
          <p className="text-muted-foreground">
            Review your past matches and performance
          </p>
        </div>
        
        <Suspense fallback={<HistorySkeleton />}>
          <HistoryContent />
        </Suspense>
      </div>
    </div>
  );
}