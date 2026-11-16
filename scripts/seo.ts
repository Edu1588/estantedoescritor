// Metadados por página, usados pelo script de pré-renderização.
// Defina SITE_URL no ambiente de build (ex.: SITE_URL=https://seudominio.com.br npm run build).
// Enquanto não for definido, usa um placeholder e o build avisa.

const RAW_SITE_URL = process.env.SITE_URL?.trim();
export const SITE_URL_IS_PLACEHOLDER = !RAW_SITE_URL;
export const SITE_URL = (RAW_SITE_URL || 'https://SEU-DOMINIO.com.br').replace(/\/$/, '');

export const SITE_NAME = 'Estante do ESCritor';

export const LANDING_PATH = '/lp-estantedoescritor';

const LANDING_DESCRIPTION =
  'Planeje, escreva e organize seu livro em um só lugar: projetos, capítulos, sinopse, personagens e metas diárias de escrita.';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  /** Quando true, o HTML da página é gerado com o conteúdo real (visível para robôs). */
  prerender: boolean;
  /** Dados estruturados extras (JSON-LD). */
  jsonLd?: Record<string, unknown>;
}

export const PAGES: PageMeta[] = [
  {
    path: '/',
    title: 'Estante do ESCritor | Plataforma para organizar seu livro',
    description:
      'Acesse a Estante do ESCritor para organizar projetos, personagens e capítulos e manter sua rotina de escrita.',
    prerender: false,
  },
  {
    path: LANDING_PATH,
    title: 'Estante do ESCritor | Escreva seu livro sem perder o controle da história',
    description: LANDING_DESCRIPTION,
    prerender: true,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: SITE_NAME,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: LANDING_DESCRIPTION,
      inLanguage: 'pt-BR',
      url: `${SITE_URL}${LANDING_PATH}`,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'BRL',
        description: 'Plano Iniciante gratuito',
      },
    },
  },
];

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function headTags(page: PageMeta): string {
  const url = absoluteUrl(page.path);
  const lines = [
    `<title>${esc(page.title)}</title>`,
    `<meta name="description" content="${esc(page.description)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${esc(page.title)}" />`,
    `<meta property="og:description" content="${esc(page.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${esc(page.title)}" />`,
    `<meta name="twitter:description" content="${esc(page.description)}" />`,
  ];
  if (page.jsonLd) {
    lines.push(
      `<script type="application/ld+json">${JSON.stringify(page.jsonLd).replace(/</g, '\\u003c')}</script>`,
    );
  }
  return lines.map((l) => `    ${l}`).join('\n');
}

export function robotsTxt(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

export function sitemapXml(): string {
  const urls = PAGES.map((p) => `  <url><loc>${esc(absoluteUrl(p.path))}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
