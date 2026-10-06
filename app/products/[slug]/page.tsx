import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { getCatalogProduct } from "@/lib/catalog-server";
import { AddToCart, BuyNow } from "@/components/store";
import { Reveal } from "@/components/motion";

const plans = [
  { label: "Monthly", price: "₹149", note: "Recurring" },
  { label: "6 Months", price: "₹499", note: "One-time" },
  { label: "Yearly", price: "₹899", note: "Best value" },
];

const features = [
  ["01", "Bulk WhatsApp Messaging", "Send campaigns to contact lists from a Windows desktop workflow instead of repeating manual messages."],
  ["02", "Excel & CSV Import", "Import recipient lists from Excel or CSV and prepare campaigns faster."],
  ["03", "Personalized Messages", "Use recipient names, custom fields and dynamic content to make campaigns more relevant."],
  ["04", "Media Attachments", "Send images, videos, documents and audio alongside your WhatsApp messages."],
  ["05", "Smart Delays & Batching", "Control pacing with time gaps and batches for more responsible campaign management."],
  ["06", "Detailed Analytics", "Monitor sending activity, delivery/read information and campaign performance."],
  ["07", "Auto-Reply Bot", "Set automated replies for common customer questions and routine conversations."],
  ["08", "WhatsApp Web-Style Inbox", "Manage conversations in a familiar inbox-style workspace."],
  ["09", "White-Label Options", "Eligible reseller and distributor plans can use custom branding, colours and logos."],
  ["10", "Online License Panel", "Eligible reseller plans can generate, activate, deactivate and track client licenses online."],
];

const useCases = [
  ["Marketing teams", "Run product announcements, offers, reminders and follow-up campaigns from a structured desktop workflow."],
  ["Agencies", "Manage campaigns for clients and use reseller-focused licensing options where applicable."],
  ["Local businesses", "Follow up with customers, send offers, appointment reminders and business updates."],
  ["E-commerce sellers", "Share product information, promotions, order-related communication and customer follow-ups."],
  ["Sales teams", "Organize prospect lists, personalize outreach and reduce repetitive copy-paste work."],
  ["Service businesses", "Handle routine updates, reminders, enquiries and customer communication more efficiently."],
];

const faqs = [
  ["What is WA Sender?", "WA Sender is Windows desktop software for WhatsApp bulk messaging, personalization, media campaigns, automation and related business communication workflows."],
  ["Can I import contacts from Excel or CSV?", "Yes. The product supports importing contact lists from CSV and Excel files so you can prepare larger campaigns without manually entering every recipient."],
  ["Can I personalize WhatsApp messages?", "Yes. WA Sender supports recipient names, custom fields and dynamic content so messages can be personalized for each contact."],
  ["Can I send images, videos, documents and audio?", "Yes. Media attachments are supported for images, videos, documents and audio files."],
  ["Does WA Sender include smart delays?", "Yes. Smart delays and batch controls help you manage sending pace. They are not a guarantee against restrictions or bans."],
  ["Will WhatsApp ban my number?", "No software can guarantee that a WhatsApp account will never be restricted. Use WA Sender responsibly, message people who have consented to receive your communication, avoid spam and follow WhatsApp's applicable policies."],
  ["Does WA Sender work on Windows?", "Yes. WA Sender is a Windows desktop application. Current product documentation lists Windows 10/11 64-bit as the supported operating environment."],
  ["How do I receive the software after payment?", "After successful payment, activation/download instructions are provided according to the purchased plan. If you need help, contact support before or after purchase."],
  ["Is this a WhatsApp API product?", "WA Sender is a Windows desktop sending application. It should not be presented as an official WhatsApp Business Platform/API provider unless the specific plan or integration explicitly says so."],
  ["Is WhatsApp owned by WA Sender?", "No. WhatsApp is a trademark of Meta Platforms, Inc. WA Sender is an independent software product and is not affiliated with or endorsed by WhatsApp Inc. or Meta."],
];

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};

  if (slug === "wa-sender") {
    return {
      title: "WA Sender — WhatsApp Bulk Sender Software for Windows",
      description:
        "Buy WA Sender for Windows. Send WhatsApp messages in bulk, import Excel or CSV contacts, personalize messages, send media, use smart delays, analytics and automation.",
      keywords: [
        "WA Sender",
        "WhatsApp bulk sender",
        "WhatsApp bulk messaging software",
        "bulk WhatsApp sender",
        "WhatsApp sender software",
        "WhatsApp marketing software",
        "WhatsApp bulk message sender",
        "WhatsApp auto sender",
        "WhatsApp marketing tool",
        "WhatsApp automation software",
      ],
      alternates: { canonical: "/products/wa-sender" },
      openGraph: {
        title: "WA Sender — WhatsApp Bulk Sender Software for Windows",
        description:
          "Windows software for WhatsApp bulk messaging, personalization, media, smart delays, analytics and automation.",
        type: "website",
        images: [{ url: "https://wasender.me/hero-mockup.jpg" }],
      },
    };
  }

  if (slug === "digital-website-bundle") {
    return {
      title: "Digital Website Bundle — Premium Website Templates & Resources",
      description: "Get a digital website bundle with WordPress templates, Shopify resources, plugins, video training and digital-product landing pages.",
      keywords: ["website templates bundle","WordPress templates","premium WordPress templates","Shopify templates","website template bundle","landing page templates","digital website bundle"],
      alternates: { canonical: "/products/digital-website-bundle" },
      openGraph: {
        title: "Digital Website Bundle — Premium Website Templates & Resources",
        description: "Website templates, plugins, training and landing-page resources to help you launch faster.",
        type: "website",
        url: "https://digitalproductsbundle.in/products/digital-website-bundle",
        images: [{ url: "https://digitalproductsbundle.in/website-bundle-thumbnail.svg" }],
      },
    };
  }

  return {
    title: p.name,
    description: p.shortDescription,
    alternates: { canonical: "/products/" + p.slug },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getCatalogProduct(slug);
  if (!p) notFound();

  if (slug !== "wa-sender") {
    const hasPricing = Boolean(p.pricing?.length);
    const plan = p.pricing?.[0]?.label || "Standard";
    const bundle = slug === "digital-website-bundle";
    const bundleBenefits = [
      ["01","Premium WordPress templates","A large library of customizable layouts for business, service, landing and niche websites."],
      ["02","Premium plugins","Useful plugin resources to help extend WordPress websites without rebuilding everything from scratch."],
      ["03","Video training","Step-by-step training to help you install, customize and use the supplied website resources."],
      ["04","Shopify templates","A separate collection of Shopify design resources for stores and ecommerce projects."],
      ["05","Digital product landing pages","Ready-made sales-page resources for creators and digital-product sellers."],
      ["06","Community access","WhatsApp Pro community access for product-related discussion and support."],
    ];
    const audience = ["Small business owners","Freelancers","WordPress developers","Web design agencies","Ecommerce sellers","Anyone launching a website faster"];
    return (
      <main className={bundle ? "bundlePage" : "productV3"}>
        <div className="container">
          <div className="productCrumb"><Link href="/products">Shop</Link><span>/</span><b>{p.name}</b></div>
          {bundle ? <>
            <section className="bundleHero">
              <Reveal className="bundleHeroCopy"><span className="eyebrow">DIGITAL WEBSITE BUNDLE / LIFETIME ACCESS</span><h1>Launch your next <em>website faster.</em></h1><p>A practical website bundle for people who want ready-made templates, plugins, training and landing-page resources instead of starting every project from zero.</p><div className="bundleHeroActions"><BuyNow slug={p.slug} plan={plan}/><Link className="button buttonLight" href="#whats-included">See what is included ↓</Link></div><div className="bundleTrust"><span>600+ WordPress templates</span><span>500+ Shopify templates</span><span>Lifetime access</span><span>Video training</span></div></Reveal>
              <Reveal className="bundleHeroVisual" delay={100}><div className="bundleVisualTop"><span>WEBSITE KIT / 01</span><b>LAUNCH OFFER</b></div><Image src={p.image || "/website-bundle-thumbnail.svg"} alt="Digital Website Bundle website template collection" width={1200} height={900} priority /><div className="bundleVisualBottom"><span>Digital Products Bundle</span><strong>Templates / Plugins / Training</strong></div></Reveal>
            </section>
            <section className="bundleOfferBar"><div><span>LAUNCH OFFER</span><strong>₹249</strong><small>Lifetime digital access</small></div><div><span>WHAT'S INSIDE</span><strong>2000+</strong><small>Website and template resources across the supplied collection</small></div><div><span>DELIVERY</span><strong>Digital</strong><small>Access supplied after successful payment</small></div></section>
            <section className="bundleStory"><div><span className="eyebrow">THE PROBLEM</span><h2>Stop building every website <em>from a blank screen.</em></h2></div><div><p>Starting a website from scratch can mean hours of layout work before you get to the part that makes the business unique. This bundle is positioned as a starting library: choose a suitable template, install it, customize the content and move forward.</p><p>You still control the final website, branding, content and hosting. The bundle gives you more starting points and supporting resources.</p></div></section>
            <section className="bundleIncluded" id="whats-included"><div className="bundleSectionHead"><span className="eyebrow">WHAT YOU GET</span><h2>A library built around <em>speed and choice.</em></h2></div><div className="bundleBenefitsGrid">{bundleBenefits.map(([num,title,desc])=><Reveal key={num}><article><span>{num}</span><h3>{title}</h3><p>{desc}</p></article></Reveal>)}</div></section>
            <section className="bundleNumbers"><div><strong>600+</strong><span>Customizable WordPress templates</span></div><div><strong>500+</strong><span>Shopify template resources</span></div><div><strong>400+</strong><span>Digital-product landing pages</span></div><div><strong>Lifetime</strong><span>Access with updates as supplied</span></div></section>
            <section className="bundleAudience"><div className="bundleDarkIntro"><span className="eyebrow">WHO IT'S FOR</span><h2>Useful if you need to <em>launch, customize or sell.</em></h2><p>Choose the bundle when a strong starting template can save you repetitive design and setup work.</p></div><div className="bundleAudienceGrid">{audience.map((x,i)=><div key={x}><b>0{i+1}</b><strong>{x}</strong></div>)}</div></section>
            <section className="bundleHow"><div className="bundleSectionHead"><span className="eyebrow">HOW TO USE IT</span><h2>Pick. Install. <em>Customize.</em></h2></div><div className="bundleSteps"><article><b>01</b><h3>Choose a starting point</h3><p>Browse the supplied website and template resources and select a layout close to your project.</p></article><article><b>02</b><h3>Install and edit</h3><p>Use the supplied resources and training to install, replace content and customize the design.</p></article><article><b>03</b><h3>Launch the website</h3><p>Connect your own domain and hosting, finish your content and publish when the site is ready.</p></article></div></section>
            <section className="bundleOffer"><div><span className="eyebrow">CURRENT STORE OFFER</span><h2>Get the bundle for <em>₹249.</em></h2><p>One-time digital purchase. Access is delivered after successful payment through the Digital Products Bundle order flow.</p></div><div className="bundlePriceBox"><span>LAUNCH OFFER</span><strong>₹249</strong><small>Lifetime access</small><BuyNow slug={p.slug} plan={plan}/></div></section>
            <section className="bundleFaq"><div className="bundleSectionHead"><span className="eyebrow">FAQ</span><h2>Before you <em>buy.</em></h2></div><div>{[["Are the templates editable?","Yes. The bundle is intended for customization. The exact editing workflow depends on the individual template and the platform it was designed for."],["Can I use these resources on my existing website?","Where the supplied template or plugin supports your platform and setup, you can use the resources with an existing website. Check the specific resource requirements before installation."],["Are Shopify templates included?","Yes. The bundle listing includes a collection of Shopify template resources in addition to WordPress resources."],["Is training included?","Yes. Video training is included as part of the bundle resources."],["Is this suitable for someone who is not technical?","The bundle is designed to reduce the amount of starting work, but website setup still involves hosting, installation and customization. The included training is intended to make that process easier."],["How do I receive the bundle?","After successful payment, digital access instructions are delivered through the store's order flow. Support is available if you have an access or delivery issue."]].map(([q,a],i)=><details key={q}><summary><span>0{i+1}</span><strong>{q}</strong><b>+</b></summary><p>{a}</p></details>)}</div></section>
            <section className="bundleFinal"><span className="eyebrow">DIGITAL PRODUCTS BUNDLE</span><h2>Build less from scratch. <em>Launch more.</em></h2><p>Get the website bundle and start with a library instead of an empty canvas.</p><div><BuyNow slug={p.slug} plan={plan}/><Link className="button buttonLight" href="/contact">Need help? Contact us ↗</Link></div><small>Product resources are supplied digitally. Availability and included items may change as the bundle is updated.</small></section>
          </> : <>
            <section className="productHeroV3"><Reveal className="productVisualV3"><div className="productVisualTop"><span>{p.type}</span><b>{p.badge || "DIGITAL"}</b></div><div className="productDisplay"><Image src={p.image || "/website-bundle-thumbnail.svg"} alt={p.name} width={1200} height={900}/></div><div className="productVisualBottom"><span>Digital delivery</span><span>01 / 01</span></div></Reveal><Reveal className="productPurchaseV3" delay={120}><span className="eyebrow">{p.category}</span><h1>{p.name}</h1><p>{p.shortDescription}</p><div className="priceLabel"><span>{hasPricing ? "STARTING FROM" : "PRICING"}</span><strong>{hasPricing ? p.pricing?.[0]?.price : "Coming soon"}</strong></div>{hasPricing && <div className="plansV3">{p.pricing?.map((x)=><div className={"planV3 "+(x.label===plan?"selected":"")} key={x.label}><span><b>{x.label}</b><small>{x.note}</small></span><strong>{x.price}</strong></div>)}</div>}<div className="productActionsV3">{hasPricing ? <><BuyNow slug={p.slug} plan={plan}/><AddToCart slug={p.slug} plan={plan}/></> : <Link className="button buttonDark" href="/contact">Ask about this product <span>↗</span></Link>}</div><div className="trustLineV3"><span>SECURE PAYMENT</span><span>DIGITAL DELIVERY</span><span>SUPPORT AVAILABLE</span></div></Reveal></section>
            <section className="productInfoV3"><Reveal className="productInfoMain"><span className="eyebrow">WHAT YOU GET</span><h2>Clear details.<br/><em>No guesswork.</em></h2><div className="featureGridV3">{p.features.map((feature,i)=><article key={feature}><span>0{String(i+1).padStart(2,"0")}</span><strong>{feature}</strong><p>Included with this product as described on the product listing.</p></article>)}</div></Reveal><Reveal className="productAsideV3" delay={100}><div><span>DELIVERY</span><strong>{p.delivery}</strong></div><div><span>SUPPORT</span><strong>{p.support || "Store support is available for product and order questions."}</strong></div><div><span>FORMAT</span><strong>{p.type === "Software" ? "Windows desktop software" : "Digital bundle / online access"}</strong></div></Reveal></section>
            <section className="processV3"><div className="sectionEyebrowV3">HOW IT WORKS</div><div className="processTrack"><div><b>01</b><strong>Review</strong><p>Check product details, requirements, delivery method and pricing.</p></div><div><b>02</b><strong>Purchase</strong><p>Choose your plan and continue through the configured checkout.</p></div><div><b>03</b><strong>Access</strong><p>Receive the digital delivery or activation instructions associated with the product.</p></div></div></section>
            <section className="productFinalV3"><div><span className="eyebrow">KEEP EXPLORING</span><h2>One product today.<br/><em>More useful drops ahead.</em></h2><Link className="button buttonDark" href="/products">Back to the shop ↗</Link></div></section>
          </>}
        </div>
      </main>
    );
  }

  return (
    <main className="waSenderPage">
      <div className="container">
        <div className="productCrumb"><Link href="/products">Shop</Link><span>/</span><Link href="/products?category=whatsapp-marketing">WhatsApp Marketing</Link><span>/</span><b>WA Sender</b></div>

        <section className="waHero">
          <Reveal className="waHeroCopy">
            <span className="eyebrow">WHATSAPP MARKETING SOFTWARE / WINDOWS</span>
            <h1>Send WhatsApp messages <em>at scale.</em></h1>
            <p className="waLead">WA Sender is a Windows desktop bulk WhatsApp sender for campaigns, personalized outreach, media messaging, smart sending controls, automation and everyday customer communication.</p>
            <div className="waHeroActions">
              <BuyNow slug="wa-sender" plan="Yearly" />
              <Link className="button buttonLight" href="#features">Explore features ↓</Link>
            </div>
            <div className="waHeroMeta"><span>Windows 10/11</span><span>Excel / CSV</span><span>Media support</span><span>Activation support</span></div>
          </Reveal>
          <Reveal className="waHeroVisual" delay={100}>
            <div className="waVisualBadge">WA SENDER / DESKTOP</div>
            <Image src="https://wasender.me/hero-mockup.jpg" alt="WA Sender WhatsApp bulk messaging software dashboard" width={1200} height={760} priority />
            <div className="waVisualCaption"><span>WhatsApp Web-style workflow</span><b>Windows software</b></div>
          </Reveal>
        </section>

        <section className="waStats">
          <div><strong>01</strong><span>Import contacts</span><p>Excel and CSV workflows for faster campaign setup.</p></div>
          <div><strong>02</strong><span>Personalize</span><p>Use names, fields and dynamic message content.</p></div>
          <div><strong>03</strong><span>Send</span><p>Use media, pacing controls and batch-based sending.</p></div>
          <div><strong>04</strong><span>Track</span><p>Review sending activity and campaign performance.</p></div>
        </section>

        <section className="waDemoSection" id="video-demo">
          <div className="waDemoHead">
            <div>
              <span className="eyebrow">PRODUCT DEMO / WA SENDER</span>
              <h2>See WA Sender <em>in action.</em></h2>
            </div>
            <p>Watch the real product workflow before you choose a plan. Play, pause, seek and control the audio directly in the embedded player.</p>
          </div>
          <div className="waDemoPlayer">
            <div className="waDemoLabel">PRODUCT DEMO / 02:45</div>
            <video
              src="https://d2ol7oe51mr4n9.cloudfront.net/user_3J2LfjzyqF75p1hw7z8VTckaj1A/ec5c6627-b8e6-4195-a08e-e2f22ae8fb7f.mp4"
              title="WA Sender product demo"
              controls
              playsInline
              preload="metadata"
            />
            <div className="waDemoFooter">
              <span>Native product demonstration</span>
              <b>Play, pause, seek and audio controls available</b>
            </div>
          </div>
        </section>

        <section className="waIntro">
          <Reveal><span className="eyebrow">WHY WA SENDER</span><h2>A practical <em>bulk WhatsApp sender</em> for teams that are tired of repetitive messaging.</h2></Reveal>
          <Reveal delay={100}><p>Instead of copying the same message contact by contact, WA Sender gives you a structured desktop workflow for importing contacts, preparing personalized campaigns, attaching media, controlling sending pace and monitoring results.</p><p>It is designed for marketers, agencies, sales teams, local businesses and e-commerce operators that already use WhatsApp as part of their customer communication.</p></Reveal>
        </section>

        <section className="waScreenshotGrid" id="features">
          <Reveal className="waScreenshotLarge">
            <div className="waScreenshotLabel">01 / INBOX</div>
            <Image src="https://wasender.me/wa-sender-inbox-dashboard.png?v=2" alt="WA Sender WhatsApp Web-style inbox dashboard" width={1400} height={900} />
            <div><strong>WhatsApp Web-style inbox</strong><span>Manage chats and campaign conversations in a familiar workspace.</span></div>
          </Reveal>
          <Reveal className="waScreenshotSmall" delay={80}>
            <div className="waScreenshotLabel">02 / CAMPAIGNS</div>
            <Image src="https://wasender.me/wa-sender-dashboard.png?v=3" alt="WA Sender bulk messaging campaign dashboard" width={1200} height={800} />
            <div><strong>Bulk campaigns & automation</strong><span>Build campaigns with personalization, media and sending controls.</span></div>
          </Reveal>
          <Reveal className="waScreenshotSmall" delay={140}>
            <div className="waScreenshotLabel">03 / LICENSES</div>
            <Image src="https://wasender.me/wa-sender-licenses-dashboard.png?v=2" alt="WA Sender online license management dashboard" width={1200} height={800} />
            <div><strong>License management</strong><span>Reseller-focused license controls are available on eligible plans.</span></div>
          </Reveal>
        </section>

        <section className="waFeatureSection">
          <div className="waSectionHead"><span className="eyebrow">FULL FEATURE SET</span><h2>Everything you need to run a <em>better WhatsApp workflow.</em></h2></div>
          <div className="waFeatureGrid">{features.map(([num, title, desc]) => <Reveal key={num}><article><span>{num}</span><h3>{title}</h3><p>{desc}</p></article></Reveal>)}</div>
        </section>

        <section className="waUseCases">
          <div className="waDarkIntro"><span className="eyebrow">WHO IT'S FOR</span><h2>Built for real <em>business communication.</em></h2><p>Use it where manual WhatsApp messaging starts consuming too much time.</p></div>
          <div className="waUseGrid">{useCases.map(([title, desc], i) => <Reveal key={title} delay={i * 50}><article><span>0{i + 1}</span><h3>{title}</h3><p>{desc}</p></article></Reveal>)}</div>
        </section>

        <section className="waWhiteLabel">
          <Reveal className="waWhiteLabelCopy"><span className="eyebrow">FOR AGENCIES & RESELLERS</span><h2>Go beyond sending. <em>Manage licenses.</em></h2><p>Eligible reseller and distributor plans add licensing capabilities for businesses that want to manage client activations, create licenses and operate a branded software offering.</p><ul><li>Custom software name and branding</li><li>Custom colour schemes and logo</li><li>Online license generation</li><li>Remote activation and deactivation</li><li>Activation tracking and reports</li><li>Client and reseller management options</li></ul></Reveal>
          <Reveal className="waLicenseImage" delay={100}><Image src="https://wasender.me/wa-sender-licenses-dashboard.png?v=2" alt="WA Sender online license panel for reseller management" width={1200} height={800}/></Reveal>
        </section>

        <section className="waHow">
          <div className="waSectionHead"><span className="eyebrow">HOW IT WORKS</span><h2>From contact list to <em>campaign.</em></h2></div>
          <div className="waHowGrid">
            <article><b>01</b><h3>Import contacts</h3><p>Upload an Excel or CSV list or prepare your recipients inside the application.</p></article>
            <article><b>02</b><h3>Create your message</h3><p>Write your campaign, personalize fields and attach relevant media.</p></article>
            <article><b>03</b><h3>Set sending controls</h3><p>Choose appropriate pacing, delays and batches for your communication.</p></article>
            <article><b>04</b><h3>Send & monitor</h3><p>Run the campaign and review available sending and delivery information.</p></article>
          </div>
        </section>

        <section className="waPricing">
          <div className="waPricingIntro"><span className="eyebrow">SIMPLE PRICING</span><h2>Choose the license <em>that fits your workflow.</em></h2><p>All plans are delivered through our store checkout. Activation support is included after successful payment.</p></div>
          <div className="waPricingGrid">{plans.map((plan, i) => <Reveal key={plan.label} className={"waPriceCard " + (i === 2 ? "featured" : "")}><span>{i === 2 ? "BEST VALUE" : "PLAN 0" + (i + 1)}</span><h3>{plan.label}</h3><strong>{plan.price}</strong><small>{plan.note}</small><ul><li>WA Sender Windows software</li><li>Bulk messaging workflows</li><li>Personalization support</li><li>Media attachments</li><li>Activation support</li></ul><BuyNow slug="wa-sender" plan={plan.label}/></Reveal>)}</div>
        </section>

        <section className="waRequirements">
          <div><span className="eyebrow">SYSTEM REQUIREMENTS</span><h2>Ready for Windows.</h2><p>Current product documentation lists the following baseline requirements for WA Sender.</p></div>
          <div className="waReqGrid"><span><b>OS</b>Windows 10/11 · 64-bit</span><span><b>RAM</b>4 GB minimum · 8 GB recommended</span><span><b>STORAGE</b>500 MB available</span><span><b>INTERNET</b>Stable internet connection</span><span><b>.NET</b>.NET Framework 4.7.2+</span><span><b>FILE SIZE</b>Approx. 119 MB for v6.1.35</span></div>
        </section>

        <section className="waSafety">
          <div><span className="eyebrow">IMPORTANT BEFORE YOU BUY</span><h2>Use WhatsApp <em>responsibly.</em></h2></div>
          <div><p>Bulk messaging tools do not guarantee that an account can never be restricted. WhatsApp and Meta actively enforce anti-spam policies. Use WA Sender for legitimate business communication, message people who have given appropriate consent, avoid unsolicited spam and follow applicable WhatsApp policies and local laws.</p><p>Smart delays and batching are sending controls, not a promise that a number cannot be banned. You remain responsible for how you use the software and the messages you send.</p></div>
        </section>

        <section className="waFaq">
          <div className="waSectionHead"><span className="eyebrow">FAQ</span><h2>Questions before you <em>buy?</em></h2></div>
          <div>{faqs.map(([q, a], i) => <details key={q}><summary><span>0{i + 1}</span><strong>{q}</strong><b>+</b></summary><p>{a}</p></details>)}</div>
        </section>

        <section className="waFinalCta">
          <span className="eyebrow">WA SENDER / WINDOWS</span>
          <h2>Stop copying. Start <em>sending smarter.</em></h2>
          <p>Choose your plan and get started with WA Sender through Digital Products Bundle.</p>
          <div><BuyNow slug="wa-sender" plan="Yearly"/><Link className="button buttonLight" href="/contact">Need help? Contact us ↗</Link></div>
          <small>Digital Products Bundle is an independent seller. WhatsApp is a trademark of Meta Platforms, Inc.</small>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: "WA Sender",
          description: "Windows software for WhatsApp bulk messaging, personalization, media attachments, smart delays, analytics and automation.",
          category: "WhatsApp Marketing Software",
          brand: { "@type": "Brand", name: "WA Sender" },
          offers: plans.map((x) => ({
            "@type": "Offer",
            name: x.label,
            price: x.price.replace("₹", ""),
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: "https://digitalproductsbundle.in/products/wa-sender",
          })),
        }) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(([q, a]) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        }) }} />
      </div>
    </main>
  );
}
