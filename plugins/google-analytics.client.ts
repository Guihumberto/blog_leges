export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  if (config.public.googleAnalytics.id) {
    // Google Analytics 4 (gtag)
    useHead({
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${config.public.googleAnalytics.id}`,
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.public.googleAnalytics.id}');
          `
        }
      ]
    })
  }
})
