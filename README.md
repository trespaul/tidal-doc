# TidalCycles

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

## Usage and development

```bash
npm run dev    # local server for development
npm run build  # build production site into dist/ folder
```

Use `npm run checklinks` to run the self-links validator.
It doesn't run on each build currently since it has false positives, but it's useful for catching incorrect links.
When the false positives issue is sorted, we can add it to the normal build step.

## Structure

### Project layout

```
public/...                  --- files copied directly to build
src/
├── assets/...              --- general assets, like the site logo
├── components/...          --- custom component overrides
├── content/docs/           --- all the site content
│   ├── blog/...            --- blog entries and assets
│   ├── explanation/...     --- and the rest ...
│   ├── getting-started/...
│   ├── guides/
│   │   ├── audio/...
│   │   ├── connections/...
│   │   └── tidal/...
│   ├── introduction/...
│   ├── reference/
│   │   ├── superdirt/...
│   │   └── tidal/...
│   └── index.mdx           --- the homepage
├── pages/                  --- manually structured pages (not used)
│   └── og/[...slug].ts     --- opengraph images (social preview) endpoint
├── styles/custom.css       --- all custom css
├── content.config.ts       --- the content configuration: schema, etc.
└── ...
astro.config.mjs            --- all site config, sidebars, etc.
package.json                --- npm configuration, dependencies
README.md                   --- this file
tsconfig.json               --- typescript config
...
```

### Purpose of different docs sections

1. **Introduction:** what is Tidal, what is it used for, what has it been used for, who are the community, etc.
2. **Getting started:** how to get up and running from scratch, to making a first sound.
3. **Guides:** all guides to do a specific thing that isn't necessary to know at first.
4. **Explanation:** in-depth theoretical explanation of internal workings.
5. **Reference:** lists of, e.g., functions or options and their descriptions, perhaps with an example; could perhaps be autogenerated.

The specific pages are:

- **Introduction**
  - What is Tidal? [what it is; what it is used for; the components of the stack; the concept: cycles and patterns]
  - Showcase [select performances / releases; list of artists; academic publications; ...]
  - Community [links to platforms, forum]
  - Related projects [livecoding projects, inspired / inspired by; e.g., tidal-vis ...]
- **Getting started**
  - Installation
  - (Tutorial) [getting from installed to first sounds, then to sounding like something (introduce to basic usage of stuff, incl. mini-notation)]
    - Launching Tidal
    - The basic concepts
    - Making music
- **Guides** [how to do specific things that aren't necessary to know at first; address common questions like "how do I get Tidal to do X?"; page titles should follow from "How to ..." / start with a verb; can perhaps be organised into subsections, or we can rely on search; the below are examples]
  - Coding with Tidal
    - Create patterns
      - Write arpeggios
      - Write chords
      - Write rhythms
      - Use generative algorithms
    - Modify patterns
      - Combine patterns
      - Restructure your patterns using functions
      - Transition between patterns
    - Combine samples
      - Assign the actual notes to the samples
      - Slice your samples and rearrange their contents
      - Trim samples and deal with overlaps
    - Continuous modulators
      - Modify ongoing sounds with control busses
      - Modulate parameters with signals
    - Shift time
      - Set tempos and global time signatures
      - Trigger a pattern from the start
    - Combine functions
      - Chain functions with `$`
      - Compose functions with `.`
    - Manage state
      - Traverse through lists with state values
  - Audio
    - Add effects to SuperDirt
    - Add samples to Tidal
    - Add synthesisers to SuperDirt
    - Add audio channels
    - Control latency
    - Reduce sample load memory and startup time
    - Run SuperDirt in another host
    - Protect everyone's ears with a limiter
  - Connections
    - Send control voltage out
    - Connect to a DAW
    - Send and receive MIDI
    - Use Tidal with multiple users
    - Send OSC elsewhere
    - Visualise Tidal events
- **Explanation** [more in-depth theoretical explanation of internals; Haskell stuff; these suggestions by ninioArtillero on Discord]
  - The Haskell language [left and right associativity, layout rules]
  - The Pattern data type
  - Types and typeclasses [crash course]
  - FRP and pattern semantics
  - The SuperDirt OSC interface
- **Reference**
  - Tidal
    - Configuration
    - Functions [technical documentation, lists of functions; autogenerate]
    - Mini-notation
      - Mini-notation overview
      - Time shorthand
  - SuperDirt
    - Configuration
    - Default library
      - Samples
      - Audio effects
      - Synthesisers
    - mi-UGens
