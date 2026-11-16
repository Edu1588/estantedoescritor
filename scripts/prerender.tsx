// Gera HTML estático por página após o `vite build`:
// - injeta título, description, canonical, Open Graph, Twitter e JSON-LD em cada página;
// - pré-renderiza a landing (conteúdo real no HTML, visível para buscadores e prévias de redes sociais);
// - gera robots.txt e sitemap.xml com o SITE_URL.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { LandingPage } from '../src/components/LandingPage';
import {
  PAGES,
  SITE_URL,
  SITE_URL_IS_PLACEHOLDER,
  headTags,
  robotsTxt,
  sitemapXml,
} from './seo';

const DIST = resolve('dist');
const template = readFileSync(resolve(DIST, 'index.html'), 'utf8');

if (!template.includes('<div id="root"></div>')) {
  throw new Error('index.html gerado pelo Vite não tem <div id="root"></div>.');
}

function buildPage(page: (typeof PAGES)[number]): string {
  let html = template.replace(/<title>[\s\S]*?<\/title>/, '');
  html = html.replace('</head>', `${headTags(page)}\n  </head>`);
  if (page.prerender) {
    const body = renderToString(createElement(LandingPage));
    html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  }
  return html;
}

for (const page of PAGES) {
  const html = buildPage(page);
  if (page.path === '/') {
    writeFileSync(resolve(DIST, 'index.html'), html, 'utf8');
    console.log('[prerender] / -> dist/index.html');
    continue;
  }
  // Duas formas de arquivo para a mesma página: pasta/index.html (URL com barra final)
  // e <rota>.html (URL sem barra, em hospedagens com URLs limpas).
  const slug = page.path.slice(1);
  const folderFile = resolve(DIST, slug, 'index.html');
  const cleanFile = resolve(DIST, `${slug}.html`);
  mkdirSync(dirname(folderFile), { recursive: true });
  writeFileSync(folderFile, html, 'utf8');
  writeFileSync(cleanFile, html, 'utf8');
  console.log(`[prerender] ${page.path} -> dist/${slug}/index.html e dist/${slug}.html`);
}

writeFileSync(resolve(DIST, 'robots.txt'), robotsTxt(), 'utf8');
writeFileSync(resolve(DIST, 'sitemap.xml'), sitemapXml(), 'utf8');

if (SITE_URL_IS_PLACEHOLDER) {
  console.warn(
    `[prerender] AVISO: SITE_URL não definido. Usando ${SITE_URL}. Defina SITE_URL antes de publicar (canonical, sitemap e robots.txt dependem dele).`,
  );
}
