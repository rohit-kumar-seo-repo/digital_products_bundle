import Link from "next/link";
import type { Metadata } from "next";
import { articles } from "@/lib/articles";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Guides and Resources",
  description: "Practical local SEO, Google Business Profile reporting and website-template buying guides from Digital Products Bundle.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return (
    <main className="resourceV3">
      <div className="container">
        <Reveal>
          <span className="eyebrow">RESOURCES / FIELD NOTES</span>
          <h1>Useful guides for<br /><em>better digital work.</em></h1>
          <p className="infoLead">Specific checklists and practical explanations to help you make better decisions about local SEO, reporting and digital resources.</p>
        </Reveal>
        <div className="resourceGridV3 resourceGridArticlesV1">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 70}>
              <article>
                <span>{article.category.toUpperCase()} / {String(index + 1).padStart(2, "0")}</span>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                <div className="resourceCardMetaV1"><span>{article.readTime}</span><span>{new Date(article.published + "T12:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</span></div>
                <Link href={"/blog/" + article.slug}>Read guide <span aria-hidden="true">↗</span></Link>
              </article>
            </Reveal>
          ))}
        </div>
        <section className="resourceBottomV3">
          <span className="eyebrow">NEED A WORKING TEMPLATE?</span>
          <h2>Turn repeatable tasks<br /><em>into a clear workflow.</em></h2>
          <p>The Local SEO &amp; Google Business Profile Agency Toolkit includes editable audit, mapping, onboarding and reporting templates. Review the included files and license before buying.</p>
          <Link className="button buttonDark" href="/products/local-seo-agency-toolkit">View the Local SEO Toolkit ↗</Link>
        </section>
        <section className="resourceExploreV1">
          <div><span className="eyebrow">EXPLORE THE STORE</span><h2>Continue with the product details.</h2></div>
          <div><Link href="/products">All products →</Link><Link href="/faq">Buying and delivery FAQs →</Link><Link href="/contact">Contact support →</Link></div>
        </section>
      </div>
    </main>
  );
}
