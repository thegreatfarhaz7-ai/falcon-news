'use server';

import { summarizeArticle, type SummarizeArticleInput } from '@/ai/flows/ai-summarize-external-articles';
import { z } from 'zod';

const SummarizeSchema = z.object({
  articleContent: z.string().min(100, { message: "Article content must be at least 100 characters." }),
  editorPreferences: z.string().min(10, { message: "Editor preferences must be at least 10 characters." }),
});

type SummarizationState = {
  message?: string | null;
  errors?: {
    articleContent?: string[] | undefined;
    editorPreferences?: string[] | undefined;
  } | null;
  summary?: string | null;
};

export async function handleSummarization(
  prevState: SummarizationState,
  formData: FormData
): Promise<SummarizationState> {
  const rawFormData = {
    articleContent: formData.get('articleContent'),
    editorPreferences: formData.get('editorPreferences'),
  };

  const validatedFields = SummarizeSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data.',
      errors: validatedFields.error.flatten().fieldErrors,
      summary: null,
    };
  }

  try {
    const result = await summarizeArticle(validatedFields.data as SummarizeArticleInput);
    if (result.summary) {
        return { message: 'Success!', summary: result.summary, errors: null };
    } else {
        return { message: 'Summarization failed to produce a result.', summary: null, errors: null };
    }
  } catch (error) {
    console.error(error);
    return { message: 'An unexpected error occurred during summarization.', summary: null, errors: null };
  }
}
