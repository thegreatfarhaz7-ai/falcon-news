import { SummarizationTool } from '@/components/dashboard/SummarizationTool';
import { Sparkles } from 'lucide-react';

export default function SummarizePage() {
  return (
    <div>
      <div className="flex items-center gap-4">
        <Sparkles className="h-10 w-10 text-primary" />
        <div>
            <h1 className="font-headline text-4xl font-bold">AI Summarization Tool</h1>
            <p className="mt-2 text-muted-foreground">
                Generate concise summaries of external articles for quick review and approval.
            </p>
        </div>
      </div>

      <div className="mt-8">
        <SummarizationTool />
      </div>
    </div>
  );
}
