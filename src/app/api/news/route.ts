
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'general';
    const pageSize = searchParams.get('pageSize') || '20';
    const language = searchParams.get('language') || 'en';
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'News API key is not configured.' }, { status: 500 });
    }

    const country = language === 'en' ? 'us' : 'in';

    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&language=${language}&category=${category}&pageSize=${pageSize}&apiKey=${apiKey}`;

    try {
        const apiResponse = await fetch(newsApiUrl, {
            next: { revalidate: 600 } // Revalidate every 10 minutes
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error('NewsAPI Error:', errorData);
            return NextResponse.json({ error: 'Failed to fetch news from NewsAPI.', details: errorData }, { status: apiResponse.status });
        }

        const data = await apiResponse.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Failed to fetch from NewsAPI:', error);
        return NextResponse.json({ error: 'Internal server error while fetching news.' }, { status: 500 });
    }
}
