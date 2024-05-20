---
title: Reduce sample load memory and startup time
---

If you are working with large sample libraries or if you use an old computer, you can turn on *lazy loading* in SuperDirt as mentionned [here](https://club.tidalcycles.org/t/superdirt-lazy-samples-loading/3148).

Instead of loading all your audio samples in the RAM as usual, SuperDirt will load audio samples *on request*. This is better for people working with a limited amount of memory.

To enable it, update SuperDirt to the last commit (go into the downloaded-quarks/SuperDirt folder then `git pull`) then, in the SuperDirt startup code, before any `~dirt.loadSoundFiles` call, put a `~dirt.doNotReadYet = true;`.