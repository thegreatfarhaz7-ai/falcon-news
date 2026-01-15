import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'general';
    const pageSize = searchParams.get('pageSize') || '20';
    const language = searchParams.get('language') || 'en';
    const apiKey = process.env.GNEWS_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'GNews API key is not configured.' }, { status: 500 });
    }

    const country = language === 'en' ? 'us' : 'in';

    const gnewsApiUrl = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${language}&country=${country}&max=${pageSize}&token=${apiKey}`;
    
    try {
        const apiResponse = await fetch(gnewsApiUrl, {
            next: { revalidate: 900 } // Revalidate every 15 minutes
        });

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error('GNews Error:', errorData);
            return NextResponse.json({ error: 'Failed to fetch news from GNews.', details: errorData }, { status: apiResponse.status });
        }

        const data = await apiResponse.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error('Failed to fetch from GNews:', error);
        return NextResponse.json({ error: 'Internal server error while fetching news.' }, { status: 500 });
    }
}
