# Illawarra Cleaning Crew: Apple-style redesign

This repository contains the Apple-inspired design overlay and a pinned private Git submodule holding the COMPLETE original TanStack Start website. The source project, pages, booking/auth flows, location pages, blogs, photographs and SEO are preserved rather than rebuilt as an SEO-unfriendly single-page template.

## Setup

1. Run: git clone --recurse-submodules https://github.com/issacbalappatt/illawarracrew-apple.git
2. Run: cd illawarracrew-apple
3. Run: npm run check:seo
4. Run: npm run dev (or npm run build)

The source repository is private. Your account or hosting platform must have read access to the private submodule. The prepare step creates .generated-site by copying the original source while EXCLUDING .env and Git metadata, then replaces the homepage and nav and appends the design CSS. It does not mutate upstream source or the production deployment.

Never commit secrets. Provide environment variables to your host from the original source .env.example. Avoid automatic production deployment until booking, auth and backend environment settings are verified.

## SEO retention

The existing per-route server-rendered SEO metadata, canonical URLs, service and suburb landing pages, LocalBusiness schema, FAQ schema, reviews, internal links, sitemap, robots.txt and llms.txt are retained. The new homepage uses semantic heading hierarchy, descriptive links, visible service descriptions and image alt text. Run npm run check:seo before every release. Static checks do not guarantee Google rankings; crawl deployed HTML, inspect structured data and validate Core Web Vitals before repointing your live domain.

## Design

Inspired by dickwu/apple-design-skill: clear visual hierarchy, touch-friendly controls, reduced-motion support, minimal colour, and translucency reserved for navigation. Original ICC brand and photography remain. No endorsement by Apple.
