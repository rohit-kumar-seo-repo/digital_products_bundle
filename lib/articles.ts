export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type StoreArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  category: string;
  readTime: string;
  published: string;
  intro: string;
  sections: ArticleSection[];
  takeaway: string;
  related: { label: string; href: string; description: string };
  sources: { label: string; href: string }[];
};

export const articles: StoreArticle[] = [
  {
    slug: "local-seo-audit-checklist",
    title: "A practical local SEO audit checklist for Google Business Profiles",
    metaTitle: "Local SEO Audit Checklist for Google Business Profiles",
    description: "A step-by-step local SEO audit checklist for business details, categories, reviews, landing pages, tracking and useful next actions.",
    excerpt: "Audit profile accuracy, service relevance, reviews, landing pages and lead tracking before changing anything.",
    category: "Local SEO",
    readTime: "8 min read",
    published: "2026-10-26",
    intro: "A useful local SEO audit should explain what is accurate, what is incomplete, what could confuse a customer and which change should happen first. It is not a promise of rankings. Google's local results are influenced by relevance, distance and prominence, and no checklist can control every factor.",
    sections: [
      {
        heading: "1. Confirm that the profile represents the real business",
        paragraphs: [
          "Start with the business identity and eligibility, not keywords. Check the public business name against the name used in the real world, then confirm the address or service area, phone number, website URL, opening hours and any special hours. Check that a customer can actually reach the business using the information shown.",
          "Choose the primary category that most specifically represents the core business. Add only additional categories that accurately describe services the business genuinely provides. Do not add keywords, locations or sales phrases to the business name to try to influence rankings."
        ],
        bullets: [
          "Record each field as correct, needs confirmation or needs a change.",
          "Verify phone links and website links on a mobile device.",
          "Ask the business owner to approve changes to identity, address, categories and hours."
        ]
      },
      {
        heading: "2. Check service relevance and profile completeness",
        paragraphs: [
          "Review the primary category, additional categories, services, description and attributes where those features are available. The information should explain what the business actually does and help a potential customer decide whether it is a fit. A profile that is complete and accurate is more useful than one packed with unrelated phrases.",
          "Separate policy or accuracy problems from optimization ideas. Incorrect names, misleading addresses and unrelated categories deserve attention before publishing more posts. For profile quality guidance, read Google's official business representation rules."
        ],
        bullets: [
          "List the core services the business can currently deliver.",
          "Compare those services with the categories and service details shown on the profile.",
          "Avoid unsupported claims, keyword-stuffed names and claims of guaranteed positions."
        ]
      },
      {
        heading: "3. Review customer trust signals",
        paragraphs: [
          "Look at the latest reviews, response quality, photos and other customer-facing information. Review replies should address the customer's actual feedback rather than repeat a template word for word. Do not invent reviews, create fake customer accounts or offer prohibited incentives for positive feedback.",
          "A review count is not a complete measure of business quality. Record recurring themes, unresolved complaints and customer questions. When a business has limited photos or outdated images, prepare a specific request for current, authentic images rather than filling the profile with generic stock imagery."
        ],
        bullets: [
          "Note review themes and unanswered questions.",
          "Check whether replies are accurate, respectful and specific to the review.",
          "Confirm photos show the real location, team, work or products."
        ]
      },
      {
        heading: "4. Check the website page behind the profile",
        paragraphs: [
          "Open the website link from the profile and check that the destination loads quickly, works on mobile and clearly identifies the business. A visitor should be able to understand the relevant service, service area or location, proof of experience, next step and how to contact the business.",
          "Map important services to the most relevant existing pages. Create a new location or service page only when it can offer genuinely useful, distinct information. Swapping city names across near-identical pages without adding local value can produce weak content instead of a better landing experience."
        ],
        bullets: [
          "Test the page at a narrow mobile width and try the main call or enquiry action.",
          "Check business name, phone, address or service area for consistency.",
          "Confirm the target page covers the service promised by the profile link."
        ]
      },
      {
        heading: "5. Record a baseline before making changes",
        paragraphs: [
          "Capture the audit date, current issues, evidence and priority. Where available, use Business Profile performance to record searches, views and interactions such as website clicks, calls or direction requests. Not every profile has every metric, and interaction counts are not the same as confirmed customers or revenue.",
          "Use website analytics, tagged links, call records or the client's own lead log to connect activity with enquiries. Mark what can be measured reliably, what is estimated and what is not available. Keep a note of the date range so the next report compares like with like."
        ],
        bullets: [
          "Record the reporting period and source for each number.",
          "Separate profile activity, website visits, qualified leads and sales.",
          "Note recent changes so a later report has context."
        ]
      },
      {
        heading: "6. Turn findings into a prioritized action list",
        paragraphs: [
          "A good audit ends with decisions, owners and due dates. Fix factual errors and broken customer journeys first. Then prioritize improvements that match the business's real services, answer customer questions and make enquiry paths easier to use. Record dependencies, such as needing the owner to approve a category or supply new photos.",
          "Review outcomes after a sensible period and compare the same metrics. Local search results vary by location, query, competition and other factors, so do not promise that a particular edit will create a specific ranking or number of leads."
        ],
        bullets: [
          "High priority: incorrect information, broken links, eligibility or policy risks.",
          "Medium priority: missing useful service information, outdated photos or poor landing-page paths.",
          "Ongoing: review responses, content updates, measurement and a monthly review."
        ]
      }
    ],
    takeaway: "Audit facts first, make changes with the owner's approval, and measure customer actions rather than treating rankings as the only outcome.",
    related: {
      label: "Local SEO & Google Business Profile Agency Toolkit",
      href: "/products/local-seo-agency-toolkit",
      description: "Use editable checklists and reporting sheets to record findings, owners and follow-up actions."
    },
    sources: [
      { label: "Google: Tips to improve your local ranking", href: "https://support.google.com/business/answer/7091?hl=en" },
      { label: "Google: Guidelines for representing your business", href: "https://support.google.com/business/answer/3038177?hl=en" }
    ]
  },
  {
    slug: "local-seo-monthly-reporting-guide",
    title: "How to build a useful monthly local SEO report",
    metaTitle: "Monthly Local SEO Reporting: Metrics, Leads and Next Steps",
    description: "Learn how to report local SEO performance without confusing profile views with leads, customers or revenue.",
    excerpt: "Build a monthly report around visibility, profile interactions, website behaviour, qualified enquiries and next actions.",
    category: "Reporting",
    readTime: "7 min read",
    published: "2026-10-26",
    intro: "A monthly local SEO report is useful when it helps a client decide what to keep doing, what to change and what to test next. A long list of impressions is not enough. Separate visibility from customer actions, and distinguish measured outcomes from estimates.",
    sections: [
      {
        heading: "1. Start with the decision the report should support",
        paragraphs: [
          "Before collecting metrics, write down the business goal for the reporting period: more qualified calls, more booking enquiries, more visits to a service page, or improved visibility for a defined set of services. The goal should be specific enough to influence next month's work.",
          "Keep the summary brief. State the period covered, major work completed, the strongest signal, the main issue and the recommended next step. If tracking was incomplete, say so at the start instead of presenting uncertain numbers as confirmed outcomes."
        ],
        bullets: [
          "Reporting period and comparison period.",
          "Work completed and any meaningful changes to the profile or website.",
          "One or two decisions that need the client's input."
        ]
      },
      {
        heading: "2. Report visibility and discovery separately",
        paragraphs: [
          "Where available, Business Profile performance can show how people discover a profile and interact with it on Google Search and Maps. Available metrics can vary by profile. Use the same date range for comparisons and note that data may be updated with a delay.",
          "Search Console can complement profile data by showing organic website impressions, clicks, click-through rate and average position for the website's pages and queries. These are different measurement surfaces: a profile interaction is not the same as an organic website click, and neither alone proves that a lead became a customer."
        ],
        bullets: [
          "Business Profile: relevant views, search terms and actions where available.",
          "Search Console: search clicks, impressions, CTR and average position for relevant pages.",
          "Annotate unusual changes, tracking gaps or site updates that could affect comparisons."
        ]
      },
      {
        heading: "3. Separate interactions from qualified leads",
        paragraphs: [
          "Profile actions such as calls, website clicks or direction requests indicate an interaction, not necessarily a qualified lead. A click may not result in a conversation, a caller may be looking for a different service and a lead may be recorded in the client's system without an exact source.",
          "Use measurement that the business can maintain. Options include tagged website links, form submissions, booking records, a call log or a simple lead sheet. Define what counts as a qualified enquiry and avoid double-counting the same person across different channels."
        ],
        bullets: [
          "Website: sessions and important events for the landing pages being reported.",
          "Enquiries: calls answered, forms received, bookings or messages, if reliably tracked.",
          "Business outcome: qualified lead, estimate, appointment or sale where the client can confirm it."
        ]
      },
      {
        heading: "4. Explain the work behind the numbers",
        paragraphs: [
          "A report should connect the changes made to the reason they were made. For example: corrected hours, improved a service description, fixed a broken website link or added useful content based on a recurring customer question. Record the date and the reason for significant changes.",
          "Avoid saying that an edit caused a ranking movement based only on before-and-after timing. Rankings and traffic can change for many reasons, including demand, seasonality, competitors, location and measurement updates. Use cautious language such as 'coincided with' unless stronger evidence is available."
        ],
        bullets: [
          "Changes shipped and why they mattered to customers.",
          "Items blocked by missing access, assets or client approval.",
          "Experiments to continue, stop or measure more carefully."
        ]
      },
      {
        heading: "5. Use a repeatable report structure",
        paragraphs: [
          "A useful monthly report can fit into six clear sections. Include a link to the evidence or source for key numbers. If a metric is unavailable, mark it as unavailable rather than filling the gap with an estimate. A compact report that is updated consistently usually creates better decisions than a large export nobody reviews."
        ],
        bullets: [
          "Executive summary: outcomes, risks and decisions.",
          "Visibility: profile and organic search signals with date ranges.",
          "Website behaviour: relevant pages, actions and source tracking.",
          "Lead outcomes: qualified enquiries or bookings if verified by the business.",
          "Work completed: changes, fixes and content published.",
          "Next month: priority actions, owner, due date and success measure."
        ]
      },
      {
        heading: "6. Keep the reporting honest",
        paragraphs: [
          "Do not label profile views as leads, clicks as revenue or average position as a guaranteed ranking. Do not combine organic and paid results without explaining what is included. When a tracking setup changes, annotate the change and avoid comparing incompatible periods as if they were identical.",
          "Share only the customer data needed for the report. Use aggregate or redacted data where possible and follow the client's agreed access and privacy arrangements."
        ],
        bullets: [
          "Source each number and identify its date range.",
          "Explain missing data, tracking changes and limitations.",
          "Keep customer names, contact details and private message content out of general performance decks unless there is a clear authorized need."
        ]
      }
    ],
    takeaway: "A report should connect discovery to interaction, interaction to verified leads and verified leads to next actions—with clear notes about what the data cannot prove.",
    related: {
      label: "Local SEO & Google Business Profile Agency Toolkit",
      href: "/products/local-seo-agency-toolkit",
      description: "Includes an editable monthly reporting worksheet, keyword map and client workflow templates."
    },
    sources: [
      { label: "Google: Understand Business Profile performance", href: "https://support.google.com/business/answer/9918094" },
      { label: "Google Search Central: Search appearance and structured data guidance", href: "https://developers.google.com/search/docs/appearance" }
    ]
  },
  {
    slug: "website-template-buying-checklist",
    title: "A buyer's checklist for choosing website templates and digital bundles",
    metaTitle: "Website Template Buying Checklist: Licensing, Compatibility and Setup",
    description: "Check platform compatibility, licensing, updates, responsiveness, performance and delivery before buying website templates or digital bundles.",
    excerpt: "Before buying a template bundle, verify what is included, which platform it supports, the license and how the assets are delivered.",
    category: "Website Resources",
    readTime: "8 min read",
    published: "2026-10-26",
    intro: "A large template count is not the same as a useful bundle. The right resource should fit your platform, current project, license needs and ability to install and maintain it. Use this checklist before paying for any website template or digital asset collection.",
    sections: [
      {
        heading: "1. Match the resource to your platform and project",
        paragraphs: [
          "Start by identifying the system you actually use: WordPress, Shopify, a static site generator or another platform. A design file, page-builder template, theme, plugin and full website export are different deliverables. Ask which file type is supplied and what software or subscription is required to use it.",
          "Define the project before comparing bundle sizes. A small set of compatible, well-documented layouts may be more useful than hundreds of files that do not match your stack or business."
        ],
        bullets: [
          "Platform and required versions.",
          "Theme, page builder, plugins, apps or paid subscriptions needed.",
          "Whether the item is an editable source file, an importable template, a theme or just a visual reference."
        ]
      },
      {
        heading: "2. Confirm the license and redistribution rights",
        paragraphs: [
          "Read the actual license before buying. Check whether it permits use on one site or multiple sites, client work, commercial projects, modification, redistribution, resale, sublicensing and inclusion in your own products. Those permissions are not interchangeable.",
          "A seller describing an asset as premium, lifetime or unlimited does not by itself prove that it can be redistributed or will receive updates indefinitely. If the license or source is unclear, ask for clarification before purchase and keep a copy of the applicable terms and receipt."
        ],
        bullets: [
          "Who owns the asset and who is allowed to distribute it?",
          "Can you use it for a client and transfer the finished website?",
          "Are resale, sharing, white-labelling or sublicensing allowed?",
          "What exactly does lifetime access mean, and what happens if a third-party source changes?"
        ]
      },
      {
        heading: "3. Inspect a real preview and the included inventory",
        paragraphs: [
          "Look for actual screenshots, sample files, a directory listing, documentation and a clear inventory. A mockup is useful for presentation, but it is not proof that an editable file exists or can be imported successfully. Check whether demo images, fonts, icons and other assets are included or must be licensed separately.",
          "Confirm the quantity and formats promised on the product page. If a bundle says it includes tutorials, plugins, templates or community access, find out how each item is supplied and whether it depends on another account or external service."
        ],
        bullets: [
          "A sample file or demo you can inspect before buying.",
          "A complete inventory with file formats and approximate counts.",
          "Clear notice of placeholder assets, external dependencies and exclusions."
        ]
      },
      {
        heading: "4. Check mobile, accessibility and performance",
        paragraphs: [
          "A polished desktop preview can hide layout problems on a phone. Check navigation, headings, cards, images, forms and calls to action at a narrow viewport. Long text should wrap rather than overflow, and buttons should remain easy to tap.",
          "If you can test the template, inspect image sizes, script dependencies, keyboard access, colour contrast and heading structure. A template does not automatically make the finished website fast, accessible or search-ready; the content, configuration and additional plugins still matter."
        ],
        bullets: [
          "Responsive layouts at phone, tablet and desktop widths.",
          "Reasonable image sizes, limited unnecessary scripts and working links.",
          "Keyboard focus, readable contrast, descriptive headings and meaningful image alt text."
        ]
      },
      {
        heading: "5. Understand installation, updates and support",
        paragraphs: [
          "Check whether the seller provides installation instructions, a quick-start guide, troubleshooting steps and a support contact. If setup requires manually configuring a server, importing data or connecting external services, those prerequisites should be clear before checkout.",
          "Distinguish access to a file from maintenance of that file. Updates, compatibility fixes and support can depend on the original author or third-party platform. Confirm what the seller commits to provide rather than assuming a bundle will remain compatible forever."
        ],
        bullets: [
          "Installation steps and prerequisites.",
          "Update cadence, if any, and whether updates are included in the price.",
          "Support scope, contact route and what happens when a third-party asset changes."
        ]
      },
      {
        heading: "6. Make the decision using a written checklist",
        paragraphs: [
          "Before checkout, write down what you need, what is included, what remains extra and which license applies. Compare the bundle against your real project rather than selecting it by the largest advertised count. If an important claim cannot be verified, treat it as an open question rather than an assumed benefit."
        ],
        bullets: [
          "Platform and compatibility confirmed.",
          "Inventory and preview reviewed.",
          "Commercial and client-use license understood.",
          "Extra costs, access method and support disclosed.",
          "Refund terms read and order confirmation retained."
        ]
      }
    ],
    takeaway: "Buy for compatibility and documented rights, not just quantity. A clear inventory and license are as important as the design files.",
    related: {
      label: "Digital Website Bundle",
      href: "/products/digital-website-bundle",
      description: "Review the current bundle listing and confirm the specific assets, license and delivery requirements that fit your project before purchasing."
    },
    sources: [
      { label: "Google Search Central: Search appearance documentation", href: "https://developers.google.com/search/docs/appearance" },
      { label: "Google Search Central: General structured data guidelines", href: "https://developers.google.com/search/docs/appearance/structured-data/sd-policies" }
    ]
  }
];
