---
title: Hackage
---

Sometimes, the documentation will not be enough for your needs. You might want to explore Tidal in more depth and take a look at each and every function currently in store.

Hackage is the central Haskell package repository, maintained by the community. Hackage is used to publish libraries.
The website will auto-generate an exhaustive documentation (but nothing is perfect!) for each and every package.
You can take a look at the [Tidal Hackage page](https://hackage.haskell.org/package/tidal) to explore all the different modules and functions.

You can generate a complete list of all the functions by using a quick hack: the GHCI `:browse` command can be used to generate the list, and the following Perl script will clean the output for you and output a more human-readable document: 

```perl
perl -pe 's!(.*?)\s*::\s*(.*)!|-\n|[[$1]]\n|<code>$2</code>!'
``````
