'use server';

/**
 * @fileOverview An AI-powered tool to generate concise summaries of fetched external articles, incorporating details that align with editor preferences.
 *
 * - summarizeArticle - A function that handles the article summarization process.
 * - SummarizeArticleInput - The input type for the summarizeArticle function.
 * - SummarizeArticleOutput - The return type for the summarizeArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeArticleInputSchema = z.object({
  articleContent: z
    .string()
    .describe('The full content of the external news article to summarize.'),
  editorPreferences: z
    .string()
    .describe(
      'The editor\u2019s preferences for article summaries, such as preferred topics, style, and length.'
    ),
});
export type SummarizeArticleInput = z.infer<typeof SummarizeArticleInputSchema>;

const SummarizeArticleOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the external news article, incorporating the editor\u2019s preferences.'
    ),
});
export type SummarizeArticleOutput = z.infer<typeof SummarizeArticleOutputSchema>;

export async function summarizeArticle(
  input: SummarizeArticleInput
): Promise<SummarizeArticleOutput> {
  return summarizeArticleFlow(input);
}

const summarizeArticlePrompt = ai.definePrompt({
  name: 'summarizeArticlePrompt',
  input: {schema: SummarizeArticleInputSchema},
  output: {schema: SummarizeArticleOutputSchema},
  prompt: `You are an AI assistant that specializes in summarizing news articles.

  Summarize the following news article, incorporating the editor's preferences as much as possible.

  Article Content: {{{articleContent}}}

  Editor Preferences: {{{editorPreferences}}}

  Summary:`
});

const summarizeArticleFlow = ai.defineFlow(
  {
    name: 'summarizeArticleFlow',
    inputSchema: SummarizeArticleInputSchema,
    outputSchema: SummarizeArticleOutputSchema,
  },
  async input => {
    const {output} = await summarizeArticlePrompt(input);
    return output!;
  }
);
