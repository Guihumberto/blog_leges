import MarkdownIt from 'markdown-it'

const md = new MarkdownIt()

export function parseMixedMarkdown(content: string): string {
  // Substitui o conteúdo Markdown dentro de tags HTML (como <p>) sem afetar o HTML
  return content.replace(/>([^<]+)</g, (_, innerText) => {
    const rendered = md.renderInline(innerText.trim())
    return `>${rendered}<`
  })
}