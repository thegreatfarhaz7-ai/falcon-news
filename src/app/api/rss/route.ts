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
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const feedKey = searchParams.get('feed');

    if (!feedKey || !allowedFeeds[feedKey]) {
        return NextResponse.json({ error: 'Invalid or missing feed parameter.' }, { status: 400 });
    }

    const feedUrl = allowedFeeds[feedKey];

    try {
        const feed = await parser.parseURL(feedUrl);
        return NextResponse.json(feed);
    } catch (error) {
        console.error(`Failed to fetch or parse RSS feed from ${feedUrl}:`, error);
        return NextResponse.json({ error: 'Failed to fetch or parse RSS feed.' }, { status: 500 });
    }
}
