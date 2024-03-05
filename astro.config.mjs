import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import tailwind from "@astrojs/tailwind";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeSlug from 'rehype-slug';

import sidebarConfig from './config/sidebar';

export default defineConfig({
  site: 'https://tidalcycles.org',
  markdown: {
    rehypePlugins: [
      rehypeAccessibleEmojis,
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append', }],
    ],
  },
  prefetch: true,
  integrations: [
    starlight({
      title: 'TidalCycles',
      customCss: [
        './src/styles/custom.css',
        '@fontsource-variable/inter',
        '@fontsource-variable/fira-code',
      ],
      logo: {
        src: './src/assets/logo.svg'
      },
      social: {
        github: 'https://github.com/tidalcycles/',
        discord: 'https://discord.gg/ugFq7KfGnB',
        twitter: 'https://twitter.com/tidalcycles',
        youtube: 'https://youtube.com/tidalcycles',
        mastodon: 'https://post.lurk.org/@tidalcycles',
        openCollective: 'https://opencollective.com/tidalcycles'
      },
      sidebar: sidebarConfig,
      locales: {
        root: {
          label: 'English',
          lang: 'en'
        }
        // fr: { label: 'French', lang: 'fr', },
      },
      editLink: {
        baseUrl: 'https://github.com/tidalcycles/tidal-doc/edit/main/'
      },
      // component overrides
      components: {
        Head: './src/components/Head.astro',
        Hero: './src/components/Hero.astro',
      },
      plugins: [starlightBlog({
        recentPostCount: 10
      })]
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
