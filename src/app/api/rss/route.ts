import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'mediaContent', {keepArray: false}],
        ]
    }
});

// Whitelist of allowed RSS feeds to prevent SSRF
const allowedFeeds: { [key: string]: string } = {
    'hindustan-times': 'https://www.hindustantimes.com/rss/top-news/rssfeed.xml',
    'al-jazeera': 'https://www.aljazeera.com/xml/rss/all.xml',
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const feedKey = searchParams.get('feed');

    if (!feedKey || !allowedFeeds[feedKey]) {
        return NextResponse.json({ error: 'Invalid or missing feed parameter.' }, { status: 400 });
    }

    const feedUrl = allowedFeeds[feedKey];

    try {
        const response = await fetch(feedUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/rss+xml, application/xml, text/xml',
            }
        });

        if (!response.ok) {
            console.error(`Failed to fetch RSS feed from ${feedUrl}:`, response.status, response.statusText);
            const errorText = await response.text();
            console.error('Error body:', errorText);
            return NextResponse.json({ error: 'Failed to fetch RSS feed.', details: `Status ${response.status}` }, { status: 500 });
        }
        
        const feed = await parser.parseString(await response.text());

        return NextResponse.json(feed);
    } catch (error) {
        console.error(`Failed to fetch or parse RSS feed from ${feedUrl}:`, error);
        return NextResponse.json({ error: 'Failed to fetch or parse RSS feed.' }, { status: 500 });
    }
}
