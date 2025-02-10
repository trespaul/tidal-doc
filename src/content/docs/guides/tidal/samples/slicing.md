---
title: Slice your samples and rearrange their contents
---

In this page you'll find guides on how to slice your samples in bits and rearrange these bits, allowing you to explore the techniques known as _granular synthesis_ (for very small bits) and _concatenative synthesis_ (for bigger bits).

:::caution

Note that these functions use the `begin` and `end` [trimming-related controls](/guides/tidal/samples/trimming) internally. This means that you probably shouldn't specify `begin` or `end` with one of them.

:::

## The basics: `chop`

`chop` cuts each sample into a number of bits, then plays them in order. For example, if we had samples *A* and *B*, `chop 2 $ sound "A B"` would make `"A1 A2 B1 B2"`.

```haskell
d1 $ chop 16 $ sound "arpy ~ feel*2 newnotes"
```

In the example above, each sample is chopped into 16 bits, resulting in 64 (16*4) events. You can pattern that first parameter:

```haskell
d1 $ chop "<16 128 32>" $ sound "arpy ~ feel*2 newnotes"
```

You'll already be able to hear this more clearly if you for example reverse the pattern, as you'll reverse the order of the sample parts:

```haskell
d1 $ slow 2 $ rev $ chop 16 $ sound "breaks125"
```
Lets try that reverse in just one speaker:

```haskell
d1 $ slow 2 $ jux rev $ chop 16 $ sound "breaks125"
```

Different values of `chop` can yield very different results, depending on the samples used:

```haskell
d1 $ chop 16 $ sound (samples "arpy*8" (run 16))
d1 $ chop 32 $ sound (samples "arpy*8" (run 16))
d1 $ chop 256 $ sound "bd*4 [sn cp] [hh future]*2 [cp feel]"
```

## Adjust silences and overlaps

You'll notice that lots of times your chopped up samples have some silences, or that the chunks overlap:

```haskell
d1 $ chop 8 $ sound "alphabet" --cool stuttering!
d2 $ chop 32 $ sound "bev" --interesting overlap!
```

That happens because `chop` takes each sample, divides it in the given bits, and then assigns those bits into evenly spaced events in the pattern. So, for example, if we have a sample *C* that lasts half a cycle, `chop 2 $ sound "C"` will cut *C* in two equal bits; let's call them *C1* and *C2*. *C1* will be [trimmed](/guides/tidal/samples/trimming) so that it `begin`s at the start of the sample and `end`s at its half, and *C2*, so that it `begin`s at the half of the sample and `end`s at its end. As each bit will last a quarter of a cycle, we'll hear a silence between when *C1* ends and *C2* is triggered at the middle of the cycle.

### Slice seamlessly by adding `loopAt`

To get rid of those silences (or overlaps, if the sample were to last longer than a cycle), you can use `loopAt`, which makes samples fit a given number of cycles:

```haskell
d1 $ loopAt 0.27 $ chop 8 $ sound "alphabet"
d2 $ loopAt 8 $ chop 32 $ sound "bev" --if we'd used `# cut 1`, granules wouldn't line up
```
Now, the bits line up perfectly, so you can't really hear that the samples have been cut into bits!

The slicing becomes apparent again when you do further manipulations of the pattern, for example `rev` to reverse the order of the bits:

```haskell
d1 $ loopAt 0.27 $ chop 8 $ sound "alphabet"
d2 $ loopAt 8 $ rev $ chop 32 $ sound "bev"
```

Note that changes in playback speed entail changes in pitch.

### Manual slice lengths with `chopBy`

If you want to control the length of each part, you can use `chopBy`. This variant of `chop` accepts an extra parameter, which specifies the length of each part relative to its sample.

::: info
`chopBy` is not yet implemented. For patterns with a single event, like in the examples below, the function `striateBy` is equivalent, so replace the former by the last.
:::

You can use it for creating a continuous pad, like so:

```haskell
d1 $ chopBy 16 1 $ sound "sax"
```

If each bit is longer than what it would be with regular `striate`, and we slow the pattern down, we can get a windowing effect:

```haskell
d1 $ slow 32 $ chopBy 32 (1/4) $ sound "bev"
```

## Rearrange the bits

### The swiss knife of slicing: `slice`

If you want to have flexibility with the order in which the chopped up bits of each sample play, you can use `slice`.

Notice how these are equivalent:

```haskell
d1 $ slice 8 "0 1 2 3 4 5 6 7" $ sound "breaks165" # cut 1

d1 $ chop 8 $ sound "breaks165" # cut 1
```

Keep in mind that `chop` creates a new pattern where each sample is substituted by its subdivisions. That's why to reproduce that behavior with `slice` in patterns with more than one sample, we need to run through all subdivisions in every sample. Notice how these are equivalent:

```haskell
d1 $ chop 4 $ s "breaks125 rave:6"

d1 $ slice 4 "[0 1 2 3]*2" $ s "breaks125 rave:6"
```

Here's an example of what we can achieve using `slice`:

```haskell
d1 $ slice 8 "[<0*8 0*2> 3*4 2 4] [4 .. 7]" $ sound "breaks165" # cut 1
```

### Throw the dice with `randslice`

If you want to play back a random bit each cycle, you can use the following:

```haskell
d1 $ slice 32 (0 |+ irand 32) $ sound "bev"
```

There's a more concise way of achieving the same using `randslice`. Notice how the following snippet is equivalent to the previous one:

```haskell
d1 $ randslice 32 $ sound "bev"
```

Use `fast` to get more than one bit per cycle:
```haskell
d1 $ fast 4 $ randslice 32 $ sound "bev"
```

### Auto-fit with `splice`

If you want slices to be automatically sped up or down to fit their 'slot', so that you don't have the silences or overlaps that were explained in the **Adjust silences and overlaps** section, you can use `splice`. As with `loopAt`, take into account that a change in speed means a change in pitch:

```haskell
d1 $ splice 8 "[<0*8 0*2> 3*4 2 4] [4 .. 7]" $ sound "breaks165"
```

### Make snappy grooves with `bite`

`bite` is quite different from the rest of functions presented here. It does not split or trim the samples; instead, it takes the structure from the **whole pattern** and [combines](/guides/tidal/patterns/combination) it with a structure that has the same number of subdivisions as its first argument. Note how the lines below are equivalent:

```haskell
d1 $ "t*3" |>| sound "sax sax:1" # cut 1

d1 $ bite 3 "0 1 2" $ sound "sax sax:1" # cut 1
```

Compare the difference between `bite` and `slice`:

```haskell
d1 $ bite 4 "0 1 2 3" $ s "sax sax:1!2" # cut 1

d1 $ slice 4 "0 1 2 3" $ s "sax sax:1!2" # cut 1
```

As `bite` "retriggers" each sample, it is very useful for spicing up drum grooves:

```haskell
d1 $ bite 4 "0 1*2 2*2 [~ 3]" $ n (run 8) # sound "drum"
```

The function that automatically speeds slices up or down for them to fit their 'slot', like `splice` does for `slice`, is `chew`.

## Interlace samples with `striate`

`striate` is like `chop` in that it cuts each sample in the given number of parts, but then it plays all the parts interlaced. For example, if we had samples *A* and *B*, `striate 2 $ sound "A B"` would make `"A1 B1 A2 B2"`.

In the following case, `striate` will go through the pattern three times, the first time playing the first third of each sample, then the second time playing the second third of each sample, and then finally the last third of each sample. Compare it with `chop` and then with the original:

```haskell
d1 $ slow 4 $ striate 3 $ n "5 6 7 8" # s "alphabet"

d1 $ slow 4 $ chop 3 $ n "5 6 7 8" # s "alphabet"

d1 $ slow 4 $ n "5 6 7 8" # s "alphabet"
```

Note that `striate` makes easy to conceptualize something that would be more complicated with `segment`. These lines below are equivalent:

```haskell
d1 $ segment 4 $ slice 2 "0 1" $ s "[alphabet:1 ho:1]*2"

d1 $ striate 2 $ s "alphabet:1 ho:1" -- much easier!
```

When the grains are of the right size and the samples sufficiently similar, `striate` creates a [tremolo](https://en.wikipedia.org/wiki/Tremolo)-like effect:

```haskell
d1 $ striate 5 $ sound "sax sax:1"
```

We can make that tremolo sound more mechanic and less ethereal by cutting off the tails:

```haskell
d1 $ striate 5 $ sound "sax sax:1" # cut 1
```

Notice that when there is only one event in the pattern, `chop` and `striate` are equivalent:

```haskell
d1 $ chop 16 $ sound "breaks165" # legato 1

d1 $ striate 16 $ sound "breaks165" # legato 1
```

`striateBy` is the mirror of `striate` to `chopBy` of `chop`.

## Go fully granular with miClouds

You can also use miClouds for granulating your samples! It's a software replica of the Eurorack module *Clouds* by Mutable Instruments. For more information, check out the [mi-UGens reference](/reference/superdirt/mi-ugens/installation) page.
