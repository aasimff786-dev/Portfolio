import { BASE_URL, OG_IMAGE } from "@/lib/constants";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohd Aasim",
    url: BASE_URL,
    image: OG_IMAGE,
    description:
      "Video Editor, Motion Designer and Graphic Designer from Modinagar, crafting brand films, social reels, and cinematic edits.",
    jobTitle: "Video Editor & Motion Designer",
    sameAs: [
      // Add your social media profiles
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourusername",
      "https://twitter.com/yourhandle",
    ],
    knowsAbout: [
      "Video Editing",
      "Motion Graphics",
      "Motion Design",
      "Graphic Design",
      "Color Grading",
      "Visual Storytelling",
      "Brand Films",
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Mohd Aasim Portfolio",
    url: BASE_URL,
    description:
      "Portfolio showcasing video editing, motion design, and graphic design work.",
    author: {
      "@type": "Person",
      name: "Mohd Aasim",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Mohd Aasim",
    image: `${BASE_URL}/md-red-logo.svg`,
    "@id": BASE_URL,
    url: BASE_URL,
    telephone: "",
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "",
      postalCode: "",
      addressCountry: "",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
    </>
  );
}
