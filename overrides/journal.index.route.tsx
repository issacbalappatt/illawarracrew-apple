import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/seo";
import Journal from "@/pages/Journal";

export const Route = createFileRoute("/journal/")({
  head: () =>
    seoHead({
      title: "The Journal | Research on a Clean Home | Illawarra Crew",
      description: "What the research says about a clean home: calm, focus, sleep, allergies and time. Short, sourced articles from Illawarra Cleaning Crew.",
      path: "/journal",
      breadcrumbs: [{ name: "Journal" }],
    }),
  component: Journal,
});
