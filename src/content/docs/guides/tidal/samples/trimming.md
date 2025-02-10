---
title: Trim samples and deal with overlaps
---

By default, samples play from start to end when triggered. In this guide, you'll find some options to trim them and deal with sample overlaps.

## Event-relative trimming: deal with overlaps

There are two main functions that allow us to deal with sample overlaps: `cut` and `legato`.

### Play only one sound at a time with `cut`

In the style of classic drum-machines, `cut` will stop a playing sample as soon as another sample with in same cutgroup is to be played. This ensures that only one sample is playing in the same group, making it. For example,

```haskell
d1 $ fast 2 $ sound "ho:4 hc ho:4 hc" # cut 1
```

makes the pattern sound more realistic, by "choking" the open hi-hat when the closed one plays. 

### Force sounds to fit their slot with `legato`

`legato` modifies the note length relative to the event length. When its value is 1, is equivalent to stopping the sample when the next event (whether it is a sample or a silence), is triggered. Notice the difference between

```haskell
d1 $ sound "sax ~ ~ sax ~ ~ sax ~" # legato 1
```

and

```haskell
d1 $ sound "sax ~ ~ sax ~ ~ sax ~" # cut 1
```

Also, notice how these two lines are equivalent:

```haskell
d1 $ sound "sax ~" # legato 1
d1 $ sound "sax" # legato 0.5
```

:::caution
Not to be confused with `sustain`, which gives playback of a sample a duration in seconds.
:::

:::tip
If you come from a classical music background, these two terms will probably sound conterintuitive, as there *legato* indicates that notes are to be played smoothly and connected, without silences, and that's what `cut` does in Tidal. You could think about the number after `legato` as the quantity of *tenuto* or each sample has. However, if it **really** bothers you, you can change your [Boot File](/reference/tidal/configuration/) by appending the lines `tenuto = pF "legato"` and `legato = pI "cut"` in one of the `:{:}` blocks.
:::

## Sample-relative trimming

Another way to trim samples is to do so in relation to their own length, by specifying on which part Tidal begins and/or ends playing them. For this purposes, the number `0` represents the start of the whole sample, and `1`, the end.

### `begin`

To specify on which part Tidal will start playing a sample, we can use the function `begin`.  For example, `begin 0` will play the sample from the start, `begin 1` will skip the whole sample, and `begin 0.25` will cut off the first quarter of each sample.

In the next example, the first `3` `ade` samples are played on every cycle, but the start point from which they are played changes on each cycle:

```haskell
d1 $ n "0 1 2" # s "ade" # begin "<0 0.25 0.5 0.75>" # legato 1
```

### `end`

To specify on which part Tidal will stop playing a sample, we can use the function `end`. For example, `end 0.75` will cut off the last quarter of each sample.

In the next example, the sample will be played two times every cycle, the second being shorter and in the second time, the segment will be shorter than in the first, creating a kind of accumulating canon effect:

```haskell
d1 $ s "bev" >| end "[0.15 0.07]"
```

:::tip
If you want a shorthand function for these two functions, use `grain`! It takes two arguments; the first is the `begin` position; the second, the length (how much of the sample is going to be played). So `# grain 0.2 0.1` is equivalent to `# begin 0.2 # end 0.3`.
:::

## Absolute trimming with `sustain`

`sustain` indicates the total duration of sample playback in seconds.

:::caution
This `sustain` refers to the whole playback duration, and is not to be confused with the sustain level of a typical ADSR envelope.
It's also not to be confused with `legato`, which modifies the playback duration relative to the event duration.
:::

```haskell
d1 $ fast 2 $ s "breaks125:1" # cps (120/60/4) # sustain 1
```

At 120 BPM, a cycle lasts for two seconds. In the above example, we cut the sample so it plays just for one second, and repeat this part two times, so we fill the whole cycle. Note that sample pitch isn't modified.

```haskell
d1 $ s "breaks125:2!3" # cps (120/60/4) # sustain "0.4 0.2 0.4" # begin "0 0 0.4"
```

Here, we take advantage that `sustain` receives a pattern to build a different break from the original sample.
