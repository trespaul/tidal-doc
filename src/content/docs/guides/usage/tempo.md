---
title: Set tempos and global time signatures
---

## Set tempos with `setcps`

Tempos are specified using the `setcps` function, e.g., `setcps 0.5625` (this is the default value, which corresponds to a bar at 130 BPM in 4/4 time).

To convert from BPM to CPS, you can do the maths right in the function. For example, to set the tempo at 130 BPM, use `setcps 130/60/4`.
We divide by 60 because we are converting from beats per *minute* to cycles per *second*, and we divide by 4 because we want 4 beats per cycle, i.e., we want one cycle to equal one traditional bar in 4/4 time.

These two values are equivalent:

- `setcps 0.5625`: Cycles per second, as a decimal.
- `setcps (135/60/4)`: Cycles per second, as a fraction.

:::tip
You can create a helpful function for setting the bpm, assuming a 4/4 time:

```haskell
setbpm bpm = setcps (bpm/60/4)
```
:::

## Create global time signatures by patterning `cps`

You can also use `cps`, without `set`, as an effect. It's global, so setting it on one pattern will change it everywhere.

Via patterning it, you can create quite mind-bending music where the rhythmic perception shifts for all musical layers.

A mild example would be to create a waltz-like feel by making a pattern of two numbers where the second is the double of the first:

```haskell
d1 $ n "2 0 [3 5] [4 1]" # sound "808"

d2 $ s "808bd(3,8) 808bd:2*8"
  # squiz 5
  # cps "0.5 1"
```

But you can really mess with time in this way!

```haskell
d2 $ n "0 [~ 1] 2*2 3 4*3 5 ~ 7" # sound "drumtraks"
    # cut 1
    # cps "<0.5 2> [1 0.75] <2 1>"
```