import { createFileRoute } from "@tanstack/react-router";
import { seoHead } from "@/lib/seo";
import Book from "@/pages/Book";

export const Route = createFileRoute("/book")({
  head: () =>
    seoHead({
      title: "Book a Clean | Illawarra Cleaning Crew",
      description: "Choose your clean, see your price as you go and pick a day. House, deep, end of lease, carpet and office cleaning across Wollongong and the Illawarra.",
      path: "/book",
      breadcrumbs: [{ name: "Book a clean" }],
    }),
  component: Book,
});
