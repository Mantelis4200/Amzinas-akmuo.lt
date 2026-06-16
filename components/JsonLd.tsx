const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Amžinas Akmuo",
  description:
    "Modernaus dizaino antkapiai ir kapaviečių įrengimas visoje Lietuvoje. Gaminame tiesiai iš savo gamyklos — be perpardavėjų antkainio.",
  url: "https://amzinasakmuo.lt",
  telephone: "+370 616 56686",
  email: "info@amzinasakmuo.lt",
  areaServed: "Lietuva",
  address: {
    "@type": "PostalAddress",
    addressCountry: "LT",
    addressRegion: "Trakai",
    addressLocality: "Trakai",
  },
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
