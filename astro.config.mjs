import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import tailwind from "@astrojs/tailwind";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  // site: 'https://tidalcycles.org',
  site: 'https://tidal-doc.pages.dev',
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
        './src/assets/fonts/inter/inter.css',
        './src/assets/fonts/iosevka/iosevka.css',
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
      sidebar: [
        { label: 'Introduction',
          // translations: { 'fr': 'Introduction', },
          items: [
            { label: 'What is Tidal?', link: '/introduction/what-is-tidal', },
            { label: 'Showcase', link: '/introduction/showcase', },
            { label: 'Community', link: '/introduction/community', },
            { label: 'Related projects', link: '/introduction/related', },
          ],
        },
        { label: 'Getting started',
          // translations: { 'fr': 'Commencer', },
          items: [
            { label: 'Installation', link: '/getting-started/installation' },
            { label: 'Launching Tidal', link: '/getting-started/launching', },
            { label: 'The basic concepts', link: '/getting-started/concepts', },
            { label: 'Making music', link: '/getting-started/music', },
          ]
        },
        { label: 'Guides',
          // translations: { 'fr': 'Guides', },
          items: [
            { label: 'Coding with Tidal',
              items: [
                { label: 'Create patterns', autogenerate: { directory: '/guides/tidal/create' }, collapsed: true,},
                { label: 'Modify patterns', autogenerate: { directory: '/guides/tidal/patterns' }, collapsed: true, },
                { label: 'Modify samples', autogenerate: { directory: '/guides/tidal/samples' }, collapsed: true, },
                { label: 'Continuous modulators', autogenerate: { directory: '/guides/tidal/continuous' }, collapsed: true, },
                { label: 'Shift time', autogenerate: { directory: '/guides/tidal/time' }, collapsed: true, },
                { label: 'Combine functions', autogenerate: { directory: '/guides/tidal/combine-functions' }, collapsed: true, },
                { label: 'Manage state', autogenerate: { directory: '/guides/tidal/state' }, collapsed: true, },

              ],
              collapsed: true,
            },
            { label: 'Audio',
              collapsed: true,
              autogenerate: { directory: '/guides/audio' },
            },
            { label: 'Connections',
              collapsed: true,
              autogenerate: { directory: '/guides/connections' },
            },
          ],
        },
        { label: 'Explanation',
          // translations: { 'fr': 'Explication', },
          items: [
            { label: 'The Haskell language', link: '/explanation/haskell' },
            { label: 'The Pattern data type', link: '/explanation/pattern' },
            // { label: 'Types and typeclasses', link: '/explanation/types' },
            // { label: 'FRP and pattern semantics', link: '/explanation/frp' },
            // { label: 'The SuperDirt OSC interface', link: '/explanation/osc' },
          ],
        },
        { label: 'Reference',
          // translations: { 'fr': 'Référence', },
          items: [
            { label: 'Tidal functions',
              autogenerate: { directory: 'reference/tidal' },
              collapsed: true,
              badge: 'WIP',
            },
            { label: 'SuperDirt',
              autogenerate: { directory: 'reference/superdirt' },
              collapsed: true,
            },
            { label: 'Configuration',
              items: [
                { label: 'Tidal', link: '/reference/config/tidal' },
                { label: 'SuperDirt', link: '/reference/config/superdirt' },
              ]
            },
            { label: 'Mini-notation',
              autogenerate: { directory: '/reference/mini-notation' },
            },
          ],

        },
      ],
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
