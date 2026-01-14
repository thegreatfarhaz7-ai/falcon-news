'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleSummarization } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Copy } from 'lucide-react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        'Generate Summary'
      )}
    </Button>
  );
}

const initialState = { message: null, errors: null, summary: null };

export function SummarizationTool() {
  const [state, formAction] = useFormState(handleSummarization, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message === 'Success!') {
      toast({
        title: 'Summary Generated',
        description: 'Your article summary is ready.',
      });
      formRef.current?.reset();
    } else if (state.message && state.message !== 'Invalid form data.') {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: state.message,
      });
    }
  }, [state, toast]);

  const handleCopyToClipboard = () => {
    if (state.summary) {
      navigator.clipboard.writeText(state.summary);
      toast({
        title: "Copied to clipboard!",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card className="shadow-lg">
        <form ref={formRef} action={formAction}>
          <CardHeader>
            <CardTitle>Input Content</CardTitle>
            <CardDescription>
              Paste the article content and any specific preferences for the summary style.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="articleContent">Article Content</Label>
              <Textarea
                id="articleContent"
                name="articleContent"
                placeholder="Paste the full text of the external news article here..."
                className="min-h-[250px]"
                required
              />
              {state.errors?.articleContent && (
                <p className="text-sm font-medium text-destructive">{state.errors.articleContent[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="editorPreferences">Editor Preferences</Label>
              <Textarea
                id="editorPreferences"
                name="editorPreferences"
                placeholder="e.g., Focus on financial impact, keep it under 150 words, use a formal tone."
                className="min-h-[100px]"
                required
              />
               {state.errors?.editorPreferences && (
                <p className="text-sm font-medium text-destructive">{state.errors.editorPreferences[0]}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Generated Summary</CardTitle>
          <CardDescription>The AI-generated summary will appear below.</CardDescription>
        </CardHeader>
        <CardContent className="relative min-h-[400px]">
          {state.summary ? (
            <>
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 h-8 w-8" onClick={handleCopyToClipboard}>
                    <Copy className="h-4 w-4"/>
                    <span className="sr-only">Copy summary</span>
                </Button>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                    <p>{state.summary}</p>
                </div>
            </>
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-md border border-dashed">
              <p className="text-muted-foreground">Waiting for input...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
