import { createFileRoute, notFound } from "@tanstack/react-router";
import { seoHead, SITE_URL } from "@/lib/seo";
import { JournalArticle, articles } from "@/pages/Journal";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    const a = loaderData;
    const base = seoHead({
      title: `${a.title} | Illawarra Crew`,
      description: a.dek,
      path: `/journal/${a.slug}`,
      ogType: "article",
      breadcrumbs: [{ name: "Journal", path: "/journal" }, { name: a.title }],
    });
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.dek,
      author: { "@type": "Organization", name: "Illawarra Cleaning Crew" },
      publisher: { "@type": "Organization", name: "Illawarra Cleaning Crew" },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/journal/${a.slug}` },
      citation: a.sources.map((s) => s.url),
    };
    return { ...base, scripts: [...(base.scripts ?? []), { type: "application/ld+json", children: JSON.stringify(articleLd) }] };
  },
  component: function JournalArticleRoute() {
    return <JournalArticle article={Route.useLoaderData()} />;
  },
});
