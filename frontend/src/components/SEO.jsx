import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO() {
  const title = "Luexe Digital — Performance Marketing & Web Development Agency | Kuwait & GCC";
  const description = "Luexe Digital builds high-converting websites and runs ROAS-focused ad campaigns for ambitious brands across Kuwait and the GCC.";
  const url = "https://luexedigital.com";

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Luexe Digital",
    "image": `${url}/logo.png`,
    "description": description,
    "url": url,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kuwait City",
      "addressCountry": "KW"
    },
    "sameAs": [
      "https://instagram.com/luexedigital",
      "https://linkedin.com/company/luexedigital"
    ]
  };

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}/og-image.jpg`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}/og-image.jpg`} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
