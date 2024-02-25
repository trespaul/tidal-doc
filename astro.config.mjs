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
          // translations: {
          //   'fr': 'Introduction',
          // },
          items: [
            { label: 'What is Tidal?',
              link: '/introduction/what-is-tidal',
            },
            { label: 'Community',
              link: '/introduction/community',
            },
            { label: 'Showcase',
              link: '/introduction/showcase',
            },
          ],
        },
        { label: 'Getting started',
          // translations: {
          //   'fr': 'Commencer',
          // },
          items: [
            { label: 'Installation',
              link: '/getting-started/installation'
            },
            { label: 'Usage: Launching Tidal',
              link: '/getting-started/usage'
            },
            { label: 'Tutorial: Making sound [REMOVE?]',
              link: '/getting-started/tutorial'
            },
          ]
        },
        { label: 'Basics',
          autogenerate: {
            directory: 'basics'
          },
        },
        { label: 'Guides',
          // translations: {
          //   'fr': 'Guides',
          // },
          autogenerate: {
            directory: 'guides'
          },
        },
        { label: 'Reference',
          // translations: {
          //   'fr': 'Référence',
          // },
          autogenerate: {
            directory: 'reference'
          },
        },
      ],
      locales: {
        root: {
          label: 'English',
          lang: 'en'
        }
        // fr: {
        //   label: 'French',
        //   lang: 'fr',
        // },
      },
      editLink: {
        baseUrl: 'https://github.com/tidalcycles/tidal-doc/edit/main/'
      },
      // components: {
      //   Hero: './src/components/Hero.astro'
      // },
      plugins: [starlightBlog({
        recentPostCount: 20
      })]
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
