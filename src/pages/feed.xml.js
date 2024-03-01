import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function GET(context) {
  const blog = await getCollection('docs', ({ id }) => {
    return id.startsWith('blog/');
  });

  return rss({
    title: 'The TidalCycles Blog',
    description: 'Updates from the TidalCycles community.',
    site: context.site,
    stylesheet: '/feed-styles.xsl',
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || post.data.excerpt,
      customData: post.data.customData,
      link: `${post.slug}/`,
      content: sanitizeHtml(parser.render(post.body)),
      ...post.data,
    })),
  });
}
