import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
import { Reveal } from "@/components/motion";

const SITE = "https://digitalproductsbundle.in";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  const url = SITE + "/blog/" + article.slug;
  return {
    title: article.metaTitle,
    description: article.description,
    alternates: { canonical: "/blog/" + article.slug },
    openGraph: {
      title: article.metaTitle,
      description: article.description,
      type: "article",
      url,
      publishedTime: article.published,
      modifiedTime: article.published,
      siteName: "Digital Products Bundle",
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const url = SITE + "/blog/" + article.slug;
  const publishedLabel = new Date(article.published + "T12:00:00Z").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    dateModified: article.published,
    author: { "@type": "Organization", name: "Digital Products Bundle" },
    publisher: { "@type": "Organization", name: "Digital Products Bundle", url: SITE },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Resources", item: SITE + "/blog" },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  return (
    <main className="articlePageV1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container">
        <nav className="articleBreadcrumbV1" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Resources</Link><span aria-hidden="true">/</span><span>{article.category}</span>
        </nav>
        <Reveal className="articleHeroV1">
          <span className="eyebrow">{article.category.toUpperCase()} / PRACTICAL GUIDE</span>
          <h1>{article.title}</h1>
          <p className="articleDekV1">{article.intro}</p>
          <div className="articleMetaV1">
            <span>Digital Products Bundle Editorial</span><span aria-hidden="true">·</span><time dateTime={article.published}>{publishedLabel}</time><span aria-hidden="true">·</span><span>{article.readTime}</span>
          </div>
        </Reveal>
        <div className="articleLayoutV1">
          <article className="articleBodyV1">
            {article.sections.map((section, index) => (
              <section key={section.heading} className="articleSectionV1">
                <span className="articleSectionNumberV1">{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && (
                  <ul>
                    {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
              </section>
            ))}
            <div className="articleTakeawayV1">
              <span className="eyebrow">KEY TAKEAWAY</span>
              <p>{article.takeaway}</p>
            </div>
            <section className="articleSourcesV1">
              <h2>Sources and further reading</h2>
              <p>Use the current official documentation for platform-specific rules and definitions. Interfaces and available metrics may change.</p>
              <ul>
                {article.sources.map((source) => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label} <span aria-hidden="true">↗</span></a></li>)}
              </ul>
            </section>
            <div className="articleEndLinksV1">
              <Link href="/blog">← All resources</Link>
              <Link href="/contact">Ask a product question →</Link>
            </div>
          </article>
          <aside className="articleSidebarV1">
            <span className="eyebrow">RELATED RESOURCE</span>
            <h2>{article.related.label}</h2>
            <p>{article.related.description}</p>
            <Link className="button buttonDark" href={article.related.href}>View related product <span aria-hidden="true">↗</span></Link>
            <div className="articleSidebarNoteV1">
              <strong>Practical note</strong>
              <p>Use this guide as a workflow aid. Confirm details for the specific business, product, platform and license before acting.</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
