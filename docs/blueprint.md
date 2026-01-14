# **App Name**: Falcon News

## Core Features:

- User Authentication and Roles: Firebase Authentication with role-based access control (RBAC) for Admins, Editors, Reporters, Contributors, and Readers, managed through Firestore Security Rules.
- Admin Dashboard: A comprehensive dashboard for user, article, category, tag, external news API, featured & breaking news, and comment management. Also includes analytics overview.
- Editor Dashboard: Dashboard to review submitted articles, edit content, approve/reject articles, schedule publishing, assign reporters, mark breaking news, and feature articles on the homepage.
- Reporter/Contributor Dashboard: Rich text editor to create, save drafts, and submit articles with cover image upload, tag/category selection, location metadata, YouTube video embedding, and article preview.
- External News API Integration: Scheduled fetching of news from external APIs (NewsAPI, GNews, Guardian, NYT, RSS) via Cloud Functions, stored in Firestore with editor approval workflow.
- AI-Powered Content Summarization Tool: Generate concise summaries of fetched external articles using an AI summarization tool for quick review and approval by editors. The AI tool will incorporate details in the summary that align with editor preferences that have been collected in their user profiles.
- Article Search and Filtering: Fast, full-text search across articles by title, tags, category, location, and author. Includes trending searches and SEO-friendly URLs.

## Style Guidelines:

- Primary color: Red (#C8102E) to reflect authority, urgency, and importance.
- Background color: Off-white (#FAFAFA) – close in hue to the primary color, but highly desaturated and light – provides a clean and professional backdrop to ensure readability.
- Accent color: Dark gray (#4A4A5A), an analogous color providing subtle contrast without being distracting.
- Logo font: 'Literata', a serif (NYT style). Note: currently only Google Fonts are supported.
- Headline font: 'Playfair', a serif; body font: 'PT Sans', a sans-serif. Note: currently only Google Fonts are supported.
- Dashboard UI font: 'Inter', a sans-serif. Note: currently only Google Fonts are supported.
- Clean, professional icons that are intuitive and align with the editorial style.
- Clean, editorial layout focusing on high readability and mobile-first design, optimized for all devices.
- Subtle animations and transitions for a smooth, professional user experience.