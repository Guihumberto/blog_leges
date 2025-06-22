export default defineNuxtPlugin(() => {
  // Schema.org markup para melhor SEO
  const addJsonLd = (data: any) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(data)
    document.head.appendChild(script)
  }

  // Schema para a homepage
  if (process.client && window.location.pathname === '/') {
    addJsonLd({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Legislação Educacional",
      "description": "Textos explicativos sobre legislação educacional para concursos públicos",
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/?search={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    })
  }

  return {
    provide: {
      addJsonLd
    }
  }
})