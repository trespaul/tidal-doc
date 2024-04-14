import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';
import tailwind from "@astrojs/tailwind";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeAccessibleEmojis } from 'rehype-accessible-emojis';
import rehypeSlug from 'rehype-slug';

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
            { label: 'Usage',
              collapsed: true,
              autogenerate: { directory: '/guides/usage' },
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
              // autogenerate: { directory: 'reference/functions' },
              collapsed: true,
              badge: 'WIP',
              items: [
                { label: 'Bjorklund', link: '/reference/functions/bjorklund' },
                { label: 'Chords', link: '/reference/functions/chords' },
                { label: 'Config', link: '/reference/functions/config' },
                { label: 'Context', link: '/reference/functions/context' },
                { label: 'Control', link: '/reference/functions/control' },
                { label: 'Core', link: '/reference/functions/core' },
                { label: 'ID', link: '/reference/functions/id' },
                { label: 'Params', link: '/reference/functions/params' },
                { label: 'ParseBP', link: '/reference/functions/parsebp' },
                { label: 'Pattern', link: '/reference/functions/pattern' },
                { label: 'Safe.Boot', link: '/reference/functions/safe-boot' },
                { label: 'Safe.Context', link: '/reference/functions/safe-context' },
                { label: 'Scales', link: '/reference/functions/scales' },
                { label: 'Show', link: '/reference/functions/show' },
                { label: 'Simple', link: '/reference/functions/simple' },
                { label: 'Stream', link: '/reference/functions/stream' },
                { label: 'StreamTypes', link: '/reference/functions/streamtypes' },
                { label: 'Tempo', link: '/reference/functions/tempo' },
                { label: 'Time', link: '/reference/functions/time' },
                { label: 'Transition', link: '/reference/functions/transition' },
                { label: 'UI', link: '/reference/functions/ui' },
                { label: 'Utils', link: '/reference/functions/utils' },
                { label: 'Version', link: '/reference/functions/version' },
              ],
            },
            { label: 'SuperDirt',
              autogenerate: { directory: 'reference/superdirt' },
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
