---
title: Protect everyone's ears with a limiter
---

Loud music and noise are one of the biggest causes of permanent hearing loss and tinnitus (noise in your ears or head).

As in live-coding we deal with the unexpected, not-controlled feedback or mistyped gain values can create a very loud output, which can damage your ears and those of your audience.

It's for that that a _limiter_ is a must-have. In this guide, you will learn to limit the output of SuperCollider using the Quark **StageMaster**.

## What is StageMaster?

[StageMaster](https://github.com/calumgunn/StageMaster) is a light mastering chain for use during live coding performance in SuperCollider. It's made my Calum Gunn and it's based on [StageLimiter](https://github.com/supercollider-quarks/BatLib/blob/master/StageLimiter.sc) by Batuhan Ozkurt.


## How to start using StageMaster

First, install StageMaster by evaluating the following code in SuperCollider:

```c
Quarks.install("https://github.com/calumgunn/StageMaster.git");
```

Then, include the following line in your [SuperDirt startup file](/reference/config/superdirt), inside the `s.waitForBoot` block:

```c
StageMaster.activate(numChannels: 2);
```

:::note
If you are outputting more than two channels, you have to put the corresponding number as after the parameter `numChannels`. Otherwise, those will be missing from the output.
:::

And that's it! You can now rest assured that your maximum output will never go above 100%.

## Customizing the output chain

StageMaster removes the DC offset, then makes the mix more consistent by compressing it a little, then adds some brightness with a high-shelf EQ, and lastly and most importantly, limits the sound signal.

If you know what you're doing, you can tweak the default parameters of StageMaster. Apart from `numChannels`, there are also `compThreshold`, `limiterLevel`, and `highEndDb`.

Specifically, if you want to remove the compressor, you should set `compThreshold` to `1`, and if you want to remove the EQ, you should set `highEndDb` to `0`. That would look like the following:

```c
StageMaster.activate(numChannels: 2, compThreshold: 1, highEndDb: 0);
```