import fs from 'node:fs';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import turndownPluginGfm from 'turndown-plugin-gfm';

function transformHtml(html) {
  const $ = cheerio.load(html);

  // select only div#interface
  const $interface = $('#interface');

  // remove page element links
  $interface.find('a.link, a.selflink').remove();

  // demote headings
  for (let i = 3; i >= 1; i--) {
    const oldHeading = `h${i}`;
    const newHeading = `h${i + 1}`;
    $interface.find(oldHeading).each((_, elem) => {
      const $elem = $(elem);
      const newElem = $(`<${newHeading}>`).html($elem.html());
      $elem.replaceWith(newElem);
    });
  }

  // remove links around h2 and h3
  $interface.find('a > h2, a > h3').unwrap();

  // convert p.src to h4, wrap in code
  $interface.find('p.src').each((_, elem) => {
    const $elem = $(elem);
    const newElem = $('<h4>').html(`<code>${$elem.html().trim()}</code>`);
    $elem.replaceWith(newElem);
  });

  // remove div.top and div.doc
  $interface.find('div.top, div.doc').each((_, elem) => {
    const $elem = $(elem);
    const newElem = $elem.html().trim();
    $elem.replaceWith(newElem);
  })

  // convert pre to code
  $interface.find('pre').each((_, elem) => {
    const $elem = $(elem);
    const newElem = $('<code>').html($elem.html().trim());
    $elem.replaceWith(newElem);
  });

  // remove links in code, keep text content
  $interface.find('code a').each((_, elem) => {
    const $elem = $(elem);
    const newElem = $elem.html().trim();
    $elem.replaceWith(newElem);
  })

  return $interface.html();
};

function toMarkdown(html) {
  const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
  });

  return turndownService.use([turndownPluginGfm.tables]).turndown(html);
}

const urlComponents = {
  baseUrl: 'https://hackage.haskell.org/package/tidal-1.9.5/docs',
  modulePrefix: 'Sound-Tidal',
  pages: [
    'Chords',
    'Control',
    'Core',
    'Params',
    'Scales',
    'Show',
    'Simple',
    'Time',
    'Transition',
    'UI',
    'Utils',
  ],
}

const urls = urlComponents.pages.map(page => { return {
  name: page,
  url: `${urlComponents.baseUrl}/${urlComponents.modulePrefix}-${page}.html`
}});

const pages = await Promise.all(urls.map(async ({name, url}) => {
  const res = await fetch(url);
  return {
    name,
    html: await res.text(),
  };
}));

pages.forEach( ({ name, html }) => {
  const parsed = transformHtml(html);
  const md = toMarkdown(parsed);

  const file = `---
title: ${name}
---

${md}
`;

  fs.writeFileSync(
    `src/content/docs/reference/tidal/functions/${name.toLowerCase()}.md`,
    file,
    'utf8'
  );
});
